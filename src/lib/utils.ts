/** Joins class names, dropping falsy values. Keeps JSX readable. */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(' ');
}

/** 1234 → "1,234" using Indian digit grouping. */
export function formatNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** ISO timestamp → "24 July 2026". Returns null for missing/invalid input. */
export function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Turns any string into a URL/DOM-safe id. */
export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "Dr. Veena G. Rao" → "VR" — for avatar fallbacks. */
export function initials(name: string): string {
  return name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms|Smt|Shri)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Whole years and months from a date (`YYYY-MM-DD` or `YYYYMMDD`) to today in
 * India, e.g. "12 Years 4 Months". Null when the date is missing, invalid or in
 * the future.
 */
export function timeSince(date: string, now: Date = new Date()): string | null {
  const match = date.match(/^(\d{4})-?(\d{2})-?(\d{2})$/);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now).split('-').map(Number);
  const months = (today[0] - year) * 12 + (today[1] - month) - (today[2] < day ? 1 : 0);
  if (!Number.isFinite(months) || months < 0) return null;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [
    years > 0 ? `${years} ${years === 1 ? 'Year' : 'Years'}` : '',
    rest > 0 ? `${rest} ${rest === 1 ? 'Month' : 'Months'}` : '',
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : 'Less than a month';
}
