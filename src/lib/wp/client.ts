/**
 * Thin, cached client for the WordPress REST API.
 *
 * Every read goes through `wpFetch`, which applies Next.js ISR caching with a
 * shared tag so a single on-demand revalidation call (POST /api/revalidate)
 * refreshes the whole site the moment an editor hits "Update" in WordPress.
 */

export const WP_URL = (
  process.env.NEXT_PUBLIC_WP_URL ?? 'https://wordpress-1420178-6266636.cloudwaysapps.com'
).replace(/\/$/, '');

export const WP_API = `${WP_URL}/wp-json/wp/v2`;

/** How long (seconds) before Next re-fetches WordPress in the background. */
export const REVALIDATE = Number(process.env.WP_REVALIDATE_SECONDS ?? 300);

/** Cache tag applied to every WordPress read. See app/api/revalidate/route.ts. */
export const WP_TAG = 'wordpress';

export class WpError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly url: string,
  ) {
    super(message);
    this.name = 'WpError';
  }
}

type WpFetchOptions = {
  /** Extra cache tags, on top of the global `wordpress` tag. */
  tags?: string[];
  /** Override the default revalidate window for this request. */
  revalidate?: number;
};

export async function wpFetch<T>(path: string, options: WpFetchOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${WP_API}${path}`;

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: {
      revalidate: options.revalidate ?? REVALIDATE,
      tags: [WP_TAG, ...(options.tags ?? [])],
    },
  });

  if (!res.ok) {
    throw new WpError(`WordPress responded ${res.status} for ${url}`, res.status, url);
  }

  return (await res.json()) as T;
}

/**
 * Same as `wpFetch` but never throws — returns `fallback` and logs instead.
 *
 * Used for non-critical sections so that a WordPress hiccup degrades one block
 * of a page rather than taking the whole page down.
 */
export async function wpFetchSafe<T>(
  path: string,
  fallback: T,
  options: WpFetchOptions = {},
): Promise<T> {
  try {
    return await wpFetch<T>(path, options);
  } catch (error) {
    console.error('[wp] fetch failed:', error instanceof Error ? error.message : error);
    return fallback;
  }
}

/* -------------------------------------------------------------------------- */
/* Raw REST shapes                                                            */
/* -------------------------------------------------------------------------- */

export type WpRendered = { rendered: string };

export type WpPage = {
  id: number;
  slug: string;
  link: string;
  title: WpRendered;
  content: WpRendered;
  excerpt?: WpRendered;
  featured_media?: number;
  modified?: string;
  /** Present once an ACF field group has "Show in REST API" enabled. */
  acf?: Record<string, unknown> | unknown[];
};

export type WpMedia = {
  id: number;
  slug: string;
  alt_text: string;
  source_url: string;
  media_details?: { width?: number; height?: number };
};

export type WpTerm = {
  id: number;
  slug: string;
  name: string;
  count: number;
};

export type WpDoctorPost = {
  id: number;
  slug: string;
  title: WpRendered;
  featured_media: number;
  menu_order: number;
  doctor_department: number[];
  acf?: Record<string, unknown> | unknown[];
};
