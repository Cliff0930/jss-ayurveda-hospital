import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { WP_TAG } from '@/lib/wp/client';

/**
 * On-demand revalidation webhook.
 *
 * Everything read from WordPress carries the `wordpress` cache tag, plus a
 * per-page `wp:<slug>` tag. Clearing a tag makes the next request re-fetch, so
 * an edit in WordPress can appear on the site immediately instead of waiting
 * out the ISR window.
 *
 * ---------------------------------------------------------------------------
 * Wire it up in WordPress — add to the theme's functions.php:
 *
 *   add_action('save_post', function ($post_id, $post) {
 *       if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) return;
 *       wp_remote_post('https://YOUR-SITE.com/api/revalidate', [
 *           'headers' => ['Content-Type' => 'application/json'],
 *           'body'    => wp_json_encode([
 *               'secret' => 'YOUR_REVALIDATE_SECRET',
 *               'slug'   => $post->post_name,
 *           ]),
 *           'blocking' => false,
 *       ]);
 *   }, 10, 2);
 * ---------------------------------------------------------------------------
 *
 * Manual test:
 *   curl -X POST https://YOUR-SITE.com/api/revalidate \
 *        -H "Content-Type: application/json" \
 *        -d '{"secret":"…","slug":"doctors"}'
 */

/** Constant-time-ish comparison so the secret can't be probed by timing. */
function secretsMatch(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || expected === 'change-me-to-a-long-random-string') {
    return NextResponse.json(
      { revalidated: false, error: 'REVALIDATE_SECRET is not configured on the server.' },
      { status: 500 },
    );
  }

  let body: { secret?: string; slug?: string };
  try {
    body = (await request.json()) as { secret?: string; slug?: string };
  } catch {
    body = {};
  }

  const provided =
    body.secret ?? request.headers.get('x-revalidate-secret') ?? new URL(request.url).searchParams.get('secret') ?? '';

  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret.' }, { status: 401 });
  }

  const tags = [WP_TAG];
  if (body.slug) tags.push(`wp:${body.slug}`);

  // Next 16 requires a cache-life profile: 'max' purges the entry outright, so
  // the very next request re-fetches from WordPress.
  for (const tag of tags) revalidateTag(tag, 'max');

  return NextResponse.json({
    revalidated: true,
    tags,
    now: new Date().toISOString(),
  });
}
