import { unstable_cache } from 'next/cache';

import {
  WP_TAG,
  REVALIDATE,
  WP_API,
  wpFetchSafe,
  type WpPage,
} from './client';
import {
  parseDoctorDepartments,
  parseDoctors,
  parseImageGroups,
  parseImages,
  parseTables,
  slugify,
  stripTags,
  type DoctorRecord,
  type ParsedImage,
} from './parse';

/* -------------------------------------------------------------------------- */
/* Page fetching                                                              */
/* -------------------------------------------------------------------------- */

/** WordPress page slugs this frontend reads from. */
export const WP_SLUGS = {
  home: 'home',
  about: 'about',
  doctors: 'doctors',
  staff: 'staff',
  waste: 'waste-data',
  attendance: 'attendance-analysis',
  gallery: 'gallery',
  packages: 'packages',
  opd: 'opd',
  specialities: 'specialities',
  treatments: 'treatments',
  facilities: 'facilities-rooms',
  wellness: 'wellness-packages',
  pricing: 'pricing-plan',
  products: 'our-products',
  faqs: 'faqs',
  contact: 'contact',
  mahavidyapeetha: 'about-jss-mahavidyapeetha',
  privacy: 'privacy-policy-2',
  terms: 'terms-of-use',
} as const;

export type WpSlug = (typeof WP_SLUGS)[keyof typeof WP_SLUGS];

/**
 * Fetches one page's rendered content by slug.
 *
 * Large pages (the attendance archive is ~2.4 MB of markup) exceed the Next.js
 * data-cache entry limit, so the raw response is fetched uncached and the
 * *parsed* result is what gets cached by the callers below via
 * `unstable_cache`. That keeps memory small and revalidation instant.
 */
async function fetchPageBySlug(slug: string): Promise<WpPage | null> {
  const url = `${WP_API}/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,content,excerpt,modified,acf&per_page=1`;

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
    if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
    const pages = (await res.json()) as WpPage[];
    return pages[0] ?? null;
  } catch (error) {
    console.error(`[wp] could not load page "${slug}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/** Wraps a parser in the Next data cache, tagged so /api/revalidate clears it. */
function cachedPageQuery<T>(slug: string, key: string, transform: (page: WpPage | null) => T) {
  return unstable_cache(
    async () => transform(await fetchPageBySlug(slug)),
    ['wp-page', slug, key],
    { revalidate: REVALIDATE, tags: [WP_TAG, `wp:${slug}`] },
  );
}

/* -------------------------------------------------------------------------- */
/* Doctors                                                                    */
/* -------------------------------------------------------------------------- */

export type DoctorDepartment = { slug: string; name: string; count: number };

export type DoctorsData = {
  doctors: DoctorRecord[];
  departments: DoctorDepartment[];
  updatedAt: string | null;
};

export const getDoctors = cachedPageQuery(WP_SLUGS.doctors, 'doctors', (page): DoctorsData => {
  if (!page) return { doctors: [], departments: [], updatedAt: null };

  const doctors = parseDoctors(page.content.rendered);
  const declared = parseDoctorDepartments(page.content.rendered);

  // Prefer the editor-defined pill order; append any department that only shows
  // up on a card (defensive — keeps a new department visible immediately).
  const order = new Map(declared.map((d, index) => [d.slug, index]));
  const counts = new Map<string, number>();
  for (const doctor of doctors) {
    counts.set(doctor.departmentSlug, (counts.get(doctor.departmentSlug) ?? 0) + 1);
  }

  const names = new Map(declared.map((d) => [d.slug, d.name]));
  for (const doctor of doctors) {
    if (!names.has(doctor.departmentSlug)) names.set(doctor.departmentSlug, doctor.department);
  }

  const departments: DoctorDepartment[] = [...names.entries()]
    .map(([slug, name]) => ({ slug, name, count: counts.get(slug) ?? 0 }))
    .filter((d) => d.count > 0)
    .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));

  return { doctors, departments, updatedAt: page.modified ?? null };
});

/* -------------------------------------------------------------------------- */
/* Staff directory                                                            */
/* -------------------------------------------------------------------------- */

export type StaffMember = {
  serial: string;
  name: string;
  qualification: string;
  designation: string;
};

export type StaffData = {
  members: StaffMember[];
  designations: { name: string; count: number }[];
  updatedAt: string | null;
};

export const getStaff = cachedPageQuery(WP_SLUGS.staff, 'staff', (page): StaffData => {
  if (!page) return { members: [], designations: [], updatedAt: null };

  const [table] = parseTables(page.content.rendered);
  if (!table) return { members: [], designations: [], updatedAt: page.modified ?? null };

  const members: StaffMember[] = table.rows
    .map((cells) => ({
      serial: cells[0] ?? '',
      name: cells[1] ?? '',
      qualification: cells[2] ?? '',
      designation: cells[3] ?? '',
    }))
    .filter((member) => member.name.length > 0);

  const counts = new Map<string, number>();
  for (const member of members) {
    if (!member.designation) continue;
    counts.set(member.designation, (counts.get(member.designation) ?? 0) + 1);
  }

  const designations = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return { members, designations, updatedAt: page.modified ?? null };
});

/* -------------------------------------------------------------------------- */
/* Bio-medical waste                                                          */
/* -------------------------------------------------------------------------- */

export type WasteRow = {
  month: string;
  isTotal: boolean;
  values: Record<string, number>;
  raw: Record<string, string>;
};

export type WasteYear = {
  /** Calendar year, e.g. 2026. `0` when a row carries no parseable year. */
  year: number;
  label: string;
  /** Month rows for this year, most recent first. */
  rows: WasteRow[];
  /** The published "Total <year>" row, when the editor has added one. */
  totals: WasteRow | null;
  /** Sum of `rows`, used when no total row was published. */
  computedTotals: Record<string, number>;
};

export type WasteData = {
  categories: string[];
  /** Most recent year first. */
  years: WasteYear[];
  unit: string;
  updatedAt: string | null;
};

const toNumber = (value: string): number => Number(value.replace(/[^0-9.-]/g, '')) || 0;

const MONTH_ORDER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

/**
 * Bio-medical waste, grouped by calendar year.
 *
 * The page is authored as month rows plus a "Total <year>" row. Grouping by the
 * year in each label means the hospital can extend the data in whichever way is
 * natural to them and it keeps working:
 *
 *   - append 2027 months to the existing table, or
 *   - add a whole new table for 2027 (every table on the page is read), or
 *   - publish a year with no total row at all (the total is then computed).
 *
 * Each year is surfaced separately rather than flattened, so next year's figures
 * never get averaged into this year's chart or totals.
 */
// NOTE: the cache key carries a version suffix. `unstable_cache` persists the
// serialised return value in .next/cache, so changing the shape of WasteData
// without changing the key would hand a stale old-shape object to the new code.
// Bump the suffix whenever this function's return type changes.
export const getWasteData = cachedPageQuery(WP_SLUGS.waste, 'waste-v2', (page): WasteData => {
  if (!page) return { categories: [], years: [], unit: 'kg', updatedAt: null };

  const tables = parseTables(page.content.rendered);
  const { categories, years } = groupWasteByYear(tables);

  return { categories, years, unit: 'kg', updatedAt: page.modified ?? null };
});

/**
 * Pure year-grouping step, exported so it can be exercised directly against
 * hypothetical future data (e.g. a 2027 table) without a live WordPress fetch.
 */
export function groupWasteByYear(tables: ReturnType<typeof parseTables>): {
  categories: string[];
  years: WasteYear[];
} {
  if (tables.length === 0) return { categories: [], years: [] };

  // Every table on the page is expected to share the same category columns.
  const categories = tables[0].header.slice(1).filter((c) => !/^total$/i.test(c));
  const allColumns = tables[0].header.slice(1);

  const buckets = new Map<number, { rows: WasteRow[]; totals: WasteRow | null }>();
  const bucket = (year: number) => {
    if (!buckets.has(year)) buckets.set(year, { rows: [], totals: null });
    return buckets.get(year)!;
  };

  for (const table of tables) {
    // A total row may omit the year ("Total"); fall back to the years seen in
    // the month rows of the same table.
    let lastYearInTable = 0;

    for (const cells of table.rows) {
      if (cells.length < 2 || !cells[0]) continue;

      const label = cells[0];
      const values: Record<string, number> = {};
      const raw: Record<string, string> = {};
      allColumns.forEach((column, index) => {
        const cell = cells[index + 1] ?? '';
        values[column] = toNumber(cell);
        raw[column] = cell;
      });

      const year = Number(label.match(/\b(20\d{2})\b/)?.[1] ?? 0);
      const isTotal = /^total\b/i.test(label);
      const target = year || lastYearInTable;

      if (isTotal) {
        bucket(target).totals = { month: label, isTotal: true, values, raw };
      } else {
        if (year) lastYearInTable = year;
        bucket(target).rows.push({ month: label, isTotal: false, values, raw });
      }
    }
  }

  const years: WasteYear[] = [...buckets.entries()]
    .map(([year, { rows, totals }]) => {
      const sorted = [...rows].sort((a, b) => {
        const am = MONTH_ORDER[a.month.split(/\s+/)[0]?.toLowerCase() ?? ''] ?? 0;
        const bm = MONTH_ORDER[b.month.split(/\s+/)[0]?.toLowerCase() ?? ''] ?? 0;
        return bm - am;
      });

      const computedTotals: Record<string, number> = {};
      for (const column of allColumns) {
        computedTotals[column] = sorted.reduce((sum, row) => sum + (row.values[column] ?? 0), 0);
      }

      return {
        year,
        label: year ? String(year) : 'Undated',
        rows: sorted,
        totals,
        computedTotals,
      };
    })
    .filter((entry) => entry.rows.length > 0)
    .sort((a, b) => b.year - a.year);

  return { categories, years };
}

/* -------------------------------------------------------------------------- */
/* Attendance analysis                                                        */
/* -------------------------------------------------------------------------- */

export type AttendanceEntry = {
  serial: string;
  designation: string;
  name: string;
  present: number;
  workingDays: number;
  weeklyOff: number;
  leave: number;
  lop: number;
};

export type AttendanceMonth = {
  id: string;
  label: string;
  month: string;
  year: number;
  entries: AttendanceEntry[];
  headcount: number;
  /** Mean days present across everyone recorded that month. */
  averagePresent: number;
  /** Total leave days (CL/EL/C.Off/HO/GH/ML/OOD) recorded that month. */
  totalLeave: number;
  designations: string[];
};

export type AttendanceData = {
  months: AttendanceMonth[];
  columns: string[];
  updatedAt: string | null;
};

const MONTH_INDEX: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

export const getAttendance = cachedPageQuery(
  WP_SLUGS.attendance,
  'attendance',
  (page): AttendanceData => {
    if (!page) return { months: [], columns: [], updatedAt: null };

    const tables = parseTables(page.content.rendered);
    if (tables.length === 0) return { months: [], columns: [], updatedAt: page.modified ?? null };

    const months: AttendanceMonth[] = tables.map((table, index) => {
      const label = table.label ?? `Period ${index + 1}`;
      const [monthName = '', yearText = ''] = label.split(/\s+/);

      const entries: AttendanceEntry[] = table.rows
        .map((cells) => ({
          serial: cells[0] ?? '',
          designation: cells[1] ?? '',
          name: cells[2] ?? '',
          present: toNumber(cells[3] ?? ''),
          workingDays: toNumber(cells[4] ?? ''),
          weeklyOff: toNumber(cells[5] ?? ''),
          leave: toNumber(cells[6] ?? ''),
          lop: toNumber(cells[7] ?? ''),
        }))
        .filter((entry) => entry.name.length > 0);

      const totalPresent = entries.reduce((sum, entry) => sum + Math.max(entry.present, 0), 0);
      const totalLeave = entries.reduce((sum, entry) => sum + entry.leave, 0);

      return {
        id: slugify(label),
        label,
        month: monthName,
        year: Number(yearText) || 0,
        entries,
        headcount: entries.length,
        averagePresent: entries.length > 0 ? totalPresent / entries.length : 0,
        totalLeave,
        designations: [...new Set(entries.map((entry) => entry.designation).filter(Boolean))].sort(),
      };
    });

    months.sort((a, b) => {
      const monthDiff =
        (MONTH_INDEX[b.month.toLowerCase()] ?? 0) - (MONTH_INDEX[a.month.toLowerCase()] ?? 0);
      return b.year - a.year || monthDiff;
    });

    return { months, columns: tables[0].header, updatedAt: page.modified ?? null };
  },
);

/* -------------------------------------------------------------------------- */
/* Gallery & department packages                                              */
/* -------------------------------------------------------------------------- */

export type GalleryGroup = { title: string; slug: string; images: ParsedImage[] };

export const getGallery = cachedPageQuery(WP_SLUGS.gallery, 'gallery', (page): GalleryGroup[] => {
  if (!page) return [];
  return parseImageGroups(page.content.rendered).map((group) => ({
    ...group,
    slug: slugify(group.title),
  }));
});

export const getPackagePosters = cachedPageQuery(
  WP_SLUGS.packages,
  'packages',
  (page): ParsedImage[] => (page ? parseImages(page.content.rendered) : []),
);

/* -------------------------------------------------------------------------- */
/* Generic page body (privacy policy, terms — long-form legal copy)           */
/* -------------------------------------------------------------------------- */

export type LegalPage = { title: string; html: string; updatedAt: string | null };

/**
 * Extracts just the readable prose from an Elementor page: text-editor widgets
 * carry the body copy, everything else is layout scaffolding.
 */
function extractProse(html: string): string {
  const blocks = [...html.matchAll(/<div class="elementor-widget-container">([\s\S]*?)<\/div>\s*<\/div>/gi)]
    .map((m) => m[1])
    .filter((block) => /<(p|ul|ol|h[2-6])\b/i.test(block));

  const unique = [...new Set(blocks.map((block) => block.trim()))];
  return unique.join('\n');
}

export function getLegalPage(slug: string) {
  return cachedPageQuery(slug, `legal-${slug}`, (page): LegalPage | null => {
    if (!page) return null;
    return {
      title: stripTags(page.title.rendered),
      html: extractProse(page.content.rendered),
      updatedAt: page.modified ?? null,
    };
  })();
}

/* -------------------------------------------------------------------------- */
/* Optional: ACF-backed content blocks                                        */
/* -------------------------------------------------------------------------- */

/**
 * Reads an ACF field group off any page, once "Show in REST API" is enabled on
 * that field group in WordPress.
 *
 * Sections in this app that should become editable later can call this and fall
 * back to their bundled default, e.g.:
 *
 *   const hero = await getPageAcf<HeroFields>('home') ?? defaultHero;
 *
 * Nothing breaks while the field group is still hidden from REST — ACF returns
 * an empty array, which this normalises to `null`.
 */
export async function getPageAcf<T extends Record<string, unknown>>(slug: string): Promise<T | null> {
  const page = await wpFetchSafe<WpPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_fields=acf&per_page=1`,
    [],
    { tags: [`wp:${slug}`] },
  );

  const acf = page[0]?.acf;
  if (!acf || Array.isArray(acf) || Object.keys(acf).length === 0) return null;
  return acf as T;
}
