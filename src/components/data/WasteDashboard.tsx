'use client';

import { useMemo, useState } from 'react';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { cn, formatNumber } from '@/lib/utils';
import type { WasteData } from '@/lib/wp/queries';

/**
 * Bio-medical waste dashboard.
 *
 * Data is grouped by calendar year upstream, and the year is the top-level
 * control here — a new reporting year added in WordPress appears as its own tab
 * with its own chart, totals and table rather than being averaged into the
 * current year.
 *
 * Form: monthly totals with category composition → stacked horizontal bars
 * (magnitude + part-to-whole), months on the y-axis so labels never rotate.
 *
 * Colour: categorical, by identity — the four statutory bio-medical waste bin
 * colours. The exact hexes were chosen by running the palette validator against
 * the card surface: all four sit inside the lightness band, clear the chroma
 * floor, hold ΔE ≥ 10 under deuteranopia and tritanopia for every adjacent
 * pair, and exceed 3:1 contrast. The "Black" stream is rendered as a deep plum
 * rather than a literal near-black, which would read as grey and be
 * indistinguishable from the axis furniture.
 *
 * Identity is never colour-alone: a legend is always present, every segment
 * carries an accessible label, and the underlying table is rendered below.
 */

const CATEGORY_COLORS: Record<string, string> = {
  Yellow: '#AE7B0C',
  Red: '#B0392F',
  Blue: '#2A62A6',
  Black: '#7A3F6B',
};

const FALLBACK_COLORS = ['#AE7B0C', '#B0392F', '#2A62A6', '#7A3F6B'];

const CATEGORY_MEANING: Record<string, string> = {
  Yellow: 'Human/animal anatomical waste, soiled waste, expired medicines — incineration or deep burial.',
  Red: 'Contaminated recyclable plastics — tubing, bottles, catheters, syringes without needles.',
  Blue: 'Glassware and metallic body implants — disinfection then recycling.',
  Black: 'Discarded medicines and cytotoxic drugs — routed to secured landfill or incineration.',
};

export function WasteDashboard({ data }: { data: WasteData }) {
  const [yearIndex, setYearIndex] = useState(0);
  const [hovered, setHovered] = useState<{ month: string; category: string } | null>(null);

  // Defensive against cache-shape skew across a deploy — see getWasteData.
  const categories = data.categories ?? [];
  const allYears = data.years ?? [];
  const year = allYears[yearIndex];

  const rows = useMemo(() => {
    if (!year) return [];
    return year.rows.map((row) => {
      const segments = categories.map((category) => ({
        category,
        value: row.values[category] ?? 0,
      }));
      return {
        month: row.month,
        segments,
        total: segments.reduce((sum, segment) => sum + segment.value, 0),
      };
    });
  }, [year, categories]);

  if (!year || rows.length === 0) return <EmptyState />;

  const maxTotal = Math.max(1, ...rows.map((row) => row.total));

  // Prefer the total the hospital published; fall back to the computed sum.
  const yearTotal = categories.reduce(
    (sum, category) => sum + (year.totals?.values[category] ?? year.computedTotals[category] ?? 0),
    0,
  );

  const latest = rows[0];
  const colorFor = (category: string, index: number) =>
    CATEGORY_COLORS[category] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];

  return (
    <div className="space-y-10">
      {/* Reporting year — only shown once more than one year exists */}
      {allYears.length > 1 ? (
        <Reveal>
          <nav aria-label="Select a reporting year">
            <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
              Reporting year
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {allYears.map((entry, index) => (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setYearIndex(index)}
                    aria-pressed={index === yearIndex}
                    className={cn(
                      'rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-all duration-300',
                      index === yearIndex
                        ? 'border-jade-800 bg-jade-800 text-sand-50'
                        : 'border-sand-200 bg-white text-ink-500 hover:border-jade-200 hover:text-jade-800',
                    )}
                  >
                    {entry.label}
                    <span className="ml-1.5 opacity-60">
                      {entry.rows.length} {entry.rows.length === 1 ? 'mo' : 'mos'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      ) : null}

      {/* Headline figures */}
      <Reveal>
        <dl className="grid gap-4 sm:grid-cols-3">
          <StatTile
            label="Latest month reported"
            value={latest.month}
            detail={`${formatNumber(latest.total)} ${data.unit} disposed`}
            icon="clock"
          />
          <StatTile
            label={`Total for ${year.label}`}
            value={`${formatNumber(yearTotal)} ${data.unit}`}
            detail={`Across ${rows.length} reported ${rows.length === 1 ? 'month' : 'months'}${
              year.totals ? '' : ' (computed)'
            }`}
            icon="scale"
          />
          <StatTile
            label="Waste streams segregated"
            value={String(categories.length)}
            detail="Statutory colour-coded categories"
            icon="recycle"
          />
        </dl>
      </Reveal>

      {/* Chart */}
      <Reveal delay={80}>
        <figure className="rounded-card border border-sand-200 bg-white p-5 md:p-8">
          <figcaption className="mb-6">
            <h3 className="text-lg">Monthly disposal by waste stream — {year.label}</h3>
            <p className="mt-1 text-[0.875rem] text-ink-500">
              Weight in kilograms, segregated at source into statutory colour-coded categories.
            </p>
          </figcaption>

          {/* Legend — always present */}
          <ul className="mb-7 flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((category, index) => (
              <li key={category} className="flex items-center gap-2 text-[0.8125rem] text-ink-700">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: colorFor(category, index) }}
                />
                {category}
              </li>
            ))}
          </ul>

          <div className="space-y-5">
            {rows.map((row) => (
              <div key={row.month}>
                <div className="mb-1.5 flex items-baseline justify-between gap-4">
                  <span className="text-[0.8125rem] font-medium text-jade-900">{row.month}</span>
                  {/* Selective direct label: the total only, never every segment */}
                  <span className="font-mono text-[0.8125rem] text-ink-500 tabular-nums">
                    {formatNumber(row.total)} {data.unit}
                  </span>
                </div>

                <div className="relative">
                  <div
                    className="flex h-7 gap-[2px] overflow-hidden rounded-[4px] bg-sand-100"
                    style={{ width: `${Math.max((row.total / maxTotal) * 100, 2)}%` }}
                  >
                    {row.segments
                      .filter((segment) => segment.value > 0)
                      .map((segment) => {
                        const share = (segment.value / row.total) * 100;
                        const isHovered =
                          hovered?.month === row.month && hovered?.category === segment.category;

                        return (
                          <div
                            key={segment.category}
                            role="img"
                            aria-label={`${row.month}, ${segment.category}: ${formatNumber(segment.value)} ${data.unit}, ${share.toFixed(0)} percent of the month`}
                            title={`${segment.category}: ${formatNumber(segment.value)} ${data.unit} (${share.toFixed(0)}%)`}
                            onMouseEnter={() => setHovered({ month: row.month, category: segment.category })}
                            onMouseLeave={() => setHovered(null)}
                            className={cn(
                              'relative h-full transition-opacity duration-200',
                              hovered && !isHovered && 'opacity-45',
                            )}
                            style={{
                              width: `${share}%`,
                              backgroundColor: colorFor(
                                segment.category,
                                categories.indexOf(segment.category),
                              ),
                            }}
                          >
                            {isHovered ? (
                              <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-jade-950 px-2.5 py-1.5 text-[0.75rem] font-medium text-sand-50 shadow-lift">
                                {segment.category} · {formatNumber(segment.value)} {data.unit}
                              </span>
                            ) : null}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </figure>
      </Reveal>

      {/* Category reference */}
      <Reveal delay={140}>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((category, index) => (
            <div key={category} className="flex gap-4 rounded-card border border-sand-200 bg-white p-5">
              <span
                aria-hidden
                className="mt-1 h-9 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: colorFor(category, index) }}
              />
              <div>
                <h4 className="text-[0.9375rem]">{category} category</h4>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">
                  {CATEGORY_MEANING[category] ??
                    'Segregated and disposed under Bio-Medical Waste Management Rules.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Table view — the numbers, exactly as published */}
      <Reveal delay={180}>
        <div className="overflow-hidden rounded-card border border-sand-200 bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-sand-200 px-5 py-4 md:px-7">
            <h3 className="text-lg">Reported figures — {year.label}</h3>
            <p className="text-[0.8125rem] text-ink-500">All weights in {data.unit}</p>
          </div>

          <div className="scroll-slim overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">
                Bio-medical waste disposed each month of {year.label} by colour-coded category, in
                kilograms
              </caption>
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50">
                  <th
                    scope="col"
                    className="px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700 md:px-7"
                  >
                    Month
                  </th>
                  {categories.map((category) => (
                    <th
                      key={category}
                      scope="col"
                      className="px-5 py-3 text-right text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700"
                    >
                      {category}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-5 py-3 text-right text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {year.rows.map((row, index) => (
                  <tr
                    key={row.month}
                    className="border-b border-sand-100 transition-colors last:border-0 hover:bg-sand-50"
                  >
                    <th scope="row" className="px-5 py-3 text-[0.875rem] font-medium text-jade-900 md:px-7">
                      {row.month}
                    </th>
                    {categories.map((category) => (
                      <td
                        key={category}
                        className="px-5 py-3 text-right font-mono text-[0.8125rem] text-ink-700 tabular-nums"
                      >
                        {row.raw[category] || '—'}
                      </td>
                    ))}
                    <td className="px-5 py-3 text-right font-mono text-[0.8125rem] font-semibold text-jade-900 tabular-nums">
                      {formatNumber(rows[index]?.total ?? 0)} {data.unit}
                    </td>
                  </tr>
                ))}

                <tr className="bg-jade-50">
                  <th scope="row" className="px-5 py-3.5 text-[0.875rem] font-semibold text-jade-900 md:px-7">
                    {year.totals?.month ?? `Total ${year.label}`}
                  </th>
                  {categories.map((category) => (
                    <td
                      key={category}
                      className="px-5 py-3.5 text-right font-mono text-[0.8125rem] font-semibold text-jade-900 tabular-nums"
                    >
                      {year.totals?.raw[category] ||
                        `${formatNumber(year.computedTotals[category] ?? 0)} ${data.unit}`}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right font-mono text-[0.8125rem] font-semibold text-jade-900 tabular-nums">
                    {formatNumber(yearTotal)} {data.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function StatTile({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: 'clock' | 'recycle' | 'scale';
}) {
  const Glyph = Icon[icon];
  return (
    <div className="rounded-card border border-sand-200 bg-white p-6">
      <div className="flex items-center gap-2.5">
        <Glyph className="h-4.5 w-4.5 text-turmeric-600" aria-hidden />
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">{label}</p>
      </div>
      <p className="mt-3 font-display text-[1.75rem] leading-none text-jade-900">{value}</p>
      <p className="mt-2 text-[0.8125rem] text-ink-500">{detail}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
      <p className="font-display text-xl text-jade-900">Waste data is not available right now</p>
      <p className="mt-2 text-[0.9375rem] text-ink-500">
        We could not reach the hospital records service. Please try again shortly.
      </p>
    </div>
  );
}
