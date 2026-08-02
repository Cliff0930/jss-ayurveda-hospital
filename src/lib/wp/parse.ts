/**
 * HTML → typed data adapters for the headless WordPress source.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The hospital's WordPress install stores its structured data in two places:
 *
 *   1. Custom post types + taxonomies (`doctor`, `doctor_department`) — clean
 *      REST endpoints, but the ACF fields attached to them (qualification,
 *      designation, experience) are not currently exposed with
 *      "Show in REST API", so `/wp/v2/doctor` returns `acf: []`.
 *
 *   2. Custom plugin shortcodes rendered into page content:
 *        [jssdoc]      → doctor cards, each carrying a `data-doc` JSON blob
 *                        with the full ACF payload
 *        [jssatt]      → one `<table class="jssatt-table">` per month
 *        staff / waste → plain `<table>` markup inside the page content
 *
 * So the reliable, zero-touch-on-WordPress way to read every field is to fetch
 * `content.rendered` for the relevant page and parse the structured payload out
 * of it. That keeps the site genuinely headless: an editor updates a doctor's
 * ACF fields or pastes a new month of attendance in WordPress, and the parsed
 * output changes on the next revalidation — no frontend deploy required.
 *
 * MIGRATION PATH
 * --------------
 * If ACF fields are later exposed to REST (Field Group → Settings → "Show in
 * REST API"), only `lib/wp/queries.ts` needs to change: swap the parser call
 * for a direct `wpFetch('/doctor?_embed')`. Nothing else in the app touches
 * WordPress markup.
 */

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  hellip: '…',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  middot: '·',
  deg: '°',
  times: '×',
  rupee: '₹',
};

/** Decodes the HTML entities WordPress emits (named + numeric, incl. hex). */
export function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z][a-z0-9]*);/gi, (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

/** Strips all tags and collapses whitespace — for reading text out of markup. */
export function stripTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

/* -------------------------------------------------------------------------- */
/* Tables                                                                     */
/* -------------------------------------------------------------------------- */

export type ParsedTable = {
  /** The first `<tr>`, treated as the header row. */
  header: string[];
  /** Every remaining `<tr>`, as plain-text cells. */
  rows: string[][];
  /** Text of the nearest preceding heading / label, when one exists. */
  label?: string;
};

const TABLE_RE = /<table\b[\s\S]*?<\/table>/gi;

function parseRows(tableHtml: string): string[][] {
  return [...tableHtml.matchAll(/<tr\b[\s\S]*?<\/tr>/gi)]
    .map((tr) => [...tr[0].matchAll(/<t[hd]\b[\s\S]*?<\/t[hd]>/gi)].map((cell) => stripTags(cell[0])))
    .filter((cells) => cells.length > 0);
}

/**
 * Pulls every `<table>` out of rendered page content.
 *
 * `label` is the last "Month YYYY" style caption appearing between the previous
 * table and this one — that is how the attendance plugin titles each month.
 */
export function parseTables(html: string, options: { labelPattern?: RegExp } = {}): ParsedTable[] {
  const labelPattern =
    options.labelPattern ??
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})/gi;

  const tables: ParsedTable[] = [];
  let cursor = 0;

  for (const match of html.matchAll(TABLE_RE)) {
    const start = match.index ?? 0;
    const preceding = html.slice(cursor, start);
    const labels = [...preceding.matchAll(new RegExp(labelPattern.source, labelPattern.flags))];
    const label = labels.length > 0 ? labels[labels.length - 1][0].replace(/\s+/g, ' ').trim() : undefined;

    const allRows = parseRows(match[0]);
    if (allRows.length > 0) {
      tables.push({ header: allRows[0], rows: allRows.slice(1), label });
    }

    cursor = start + match[0].length;
  }

  return tables;
}

/* -------------------------------------------------------------------------- */
/* Doctors — [jssdoc] shortcode                                               */
/* -------------------------------------------------------------------------- */

export type DoctorRecord = {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  experience: string;
  department: string;
  departmentSlug: string;
  specialities: string[];
  image: string;
};

type RawDoctorPayload = {
  name?: string;
  qual?: string;
  desig?: string;
  exp?: string;
  dept?: string;
  specs?: string[];
  img?: string;
};

/**
 * Normalises a doctor photo, discarding the CMS plugin's stand-in.
 *
 * When a doctor record has no featured image the [jssdoc] shortcode does not
 * leave the field empty — it substitutes its own generic silhouette as an
 * inline `data:image/svg+xml` URI. Passing that straight through would paint a
 * grey avatar that belongs to no design system; treating it as absent instead
 * lets <DoctorCard> fall back to the consultant's initials, which is what the
 * rest of the site does for a missing portrait.
 */
function usableImage(image: string): string {
  return image.startsWith('data:') ? '' : image;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&(amp;)?/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Reads the `data-doc` JSON payload the [jssdoc] shortcode writes onto every
 * doctor card. This is the full ACF record for each doctor.
 */
export function parseDoctors(html: string): DoctorRecord[] {
  const cards = [...html.matchAll(/<article\b[^>]*class="[^"]*jssdoc-card[^"]*"[\s\S]*?<\/article>/gi)];

  const doctors: DoctorRecord[] = [];

  for (const card of cards) {
    const markup = card[0];
    const payloadMatch = markup.match(/data-doc="([^"]*)"/i);
    const deptSlugMatch = markup.match(/data-dept="([^"]*)"/i);
    if (!payloadMatch) continue;

    let payload: RawDoctorPayload;
    try {
      payload = JSON.parse(decodeEntities(payloadMatch[1])) as RawDoctorPayload;
    } catch {
      continue;
    }

    const name = (payload.name ?? '').trim();
    if (!name) continue;

    const department = decodeEntities(payload.dept ?? '').trim();
    const id = slugify(name);

    doctors.push({
      id,
      name,
      qualification: (payload.qual ?? '').trim(),
      designation: decodeEntities(payload.desig ?? '').trim(),
      experience: (payload.exp ?? '').trim(),
      department,
      departmentSlug: deptSlugMatch?.[1]?.trim() || slugify(department),
      specialities: (payload.specs ?? []).map((s) => decodeEntities(String(s)).trim()).filter(Boolean),
      image: usableImage((payload.img ?? '').trim()),
    });
  }

  return doctors;
}

/** Department filter pills rendered by the shortcode, in editor-defined order. */
export function parseDoctorDepartments(html: string): { slug: string; name: string }[] {
  return [...html.matchAll(/<button\b[^>]*class="[^"]*jssdoc-pill[^"]*"[^>]*data-dept="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi)]
    .map((m) => ({ slug: m[1].trim(), name: stripTags(m[2]) }))
    .filter((d) => d.slug && d.slug !== 'all');
}

/* -------------------------------------------------------------------------- */
/* Images                                                                     */
/* -------------------------------------------------------------------------- */

export type ParsedImage = { src: string; alt: string; width?: number; height?: number };

/** Every `<img>` in a block of content, de-duplicated and full-size resolved. */
export function parseImages(html: string): ParsedImage[] {
  const seen = new Set<string>();
  const images: ParsedImage[] = [];

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/\ssrc="([^"]+)"/i)?.[1];
    if (!src || !/\/wp-content\/uploads\//.test(src)) continue;

    // WordPress emits resized derivatives (`-768x432.webp`). Resolve back to the
    // original so next/image can pick its own breakpoints.
    const fullSize = src.replace(/-\d{2,4}x\d{2,4}(?=\.[a-z]{3,4}(?:$|\?))/i, '');
    if (seen.has(fullSize)) continue;
    seen.add(fullSize);

    images.push({
      src: fullSize,
      alt: decodeEntities(tag.match(/\salt="([^"]*)"/i)?.[1] ?? ''),
      width: Number(tag.match(/\swidth="(\d+)"/i)?.[1]) || undefined,
      height: Number(tag.match(/\sheight="(\d+)"/i)?.[1]) || undefined,
    });
  }

  return images;
}

/**
 * Splits content into heading-delimited sections and collects the images under
 * each — how the WordPress Gallery page is authored. Matches h2–h4 because
 * Elementor emits the page title as an h2 and the album titles as h3.
 */
export function parseImageGroups(html: string): { title: string; images: ParsedImage[] }[] {
  const headings = [...html.matchAll(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  if (headings.length === 0) {
    const images = parseImages(html);
    return images.length > 0 ? [{ title: 'Gallery', images }] : [];
  }

  const groups: { title: string; images: ParsedImage[] }[] = [];

  headings.forEach((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length;
    const end = index + 1 < headings.length ? (headings[index + 1].index ?? html.length) : html.length;
    const images = parseImages(html.slice(start, end));
    const title = stripTags(heading[2]);
    if (title && images.length > 0) groups.push({ title, images });
  });

  return groups;
}
