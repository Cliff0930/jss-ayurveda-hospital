'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { cn, formatNumber } from '@/lib/utils';
import type { AttendanceEntry } from '@/lib/wp/queries';

export type MonthSummary = {
  id: string;
  label: string;
  headcount: number;
  averagePresent: number;
  totalLeave: number;
};

const PAGE_SIZE = 40;

/**
 * Monthly staff attendance browser.
 *
 * Only the selected month's rows are sent to the browser — month switching is a
 * server navigation via `?month=`, so the 14-month × ~200-row archive never has
 * to cross the wire at once.
 */
export function AttendanceExplorer({
  months,
  selected,
  entries,
  designations,
}: {
  months: MonthSummary[];
  selected: MonthSummary;
  entries: AttendanceEntry[];
  designations: string[];
}) {
  const [query, setQuery] = useState('');
  const [designation, setDesignation] = useState('all');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (designation !== 'all' && entry.designation !== designation) return false;
      if (!needle) return true;
      return (
        entry.name.toLowerCase().includes(needle) || entry.designation.toLowerCase().includes(needle)
      );
    });
  }, [entries, designation, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const resetPage = () => setPage(0);

  return (
    <div className="space-y-10">
      {/* Headcount trend — single series, so no legend box is needed */}
      <Reveal>
        <HeadcountTrend months={months} activeId={selected.id} />
      </Reveal>

      {/* Month selector */}
      <Reveal delay={60}>
        <nav aria-label="Select a month">
          <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
            Reporting period
          </h3>
          <ul className="scroll-slim mt-3 flex gap-2 overflow-x-auto pb-2">
            {months.map((month) => (
              <li key={month.id}>
                <Link
                  href={`/attendance-analysis?month=${month.id}`}
                  scroll={false}
                  aria-current={month.id === selected.id ? 'page' : undefined}
                  className={cn(
                    'block shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300',
                    month.id === selected.id
                      ? 'border-jade-800 bg-jade-800 text-sand-50'
                      : 'border-sand-200 bg-white text-ink-500 hover:border-jade-200 hover:text-jade-800',
                  )}
                >
                  {month.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

      {/* Month summary */}
      <Reveal delay={100}>
        <dl className="grid gap-4 sm:grid-cols-3">
          <StatTile
            icon="users"
            label="Staff on record"
            value={formatNumber(selected.headcount)}
            detail={`${selected.label} attendance register`}
          />
          <StatTile
            icon="clock"
            label="Average days present"
            value={selected.averagePresent.toFixed(1)}
            detail="Mean across all staff that month"
          />
          <StatTile
            icon="calendar"
            label="Total leave days"
            value={formatNumber(selected.totalLeave)}
            detail="CL / EL / C.Off / HO / GH / ML / OOD"
          />
        </dl>
      </Reveal>

      {/* Toolbar */}
      <div className="sticky top-[calc(var(--header-height)+0.5rem)] z-20 rounded-2xl border border-sand-200 bg-sand-50/92 p-3 shadow-soft backdrop-blur-xl md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search staff by name or designation</span>
            <Icon.search
              className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-sand-500"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                resetPage();
              }}
              placeholder={`Search within ${selected.label}…`}
              className="h-12 w-full rounded-full border border-sand-200 bg-white pl-12 pr-4 text-[0.9375rem] text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-300"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Filter by designation</span>
            <select
              value={designation}
              onChange={(event) => {
                setDesignation(event.target.value);
                resetPage();
              }}
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-sand-200 bg-white pl-5 pr-11 text-[0.9375rem] text-jade-900 outline-none transition focus:border-jade-300 lg:w-72"
            >
              <option value="all">All designations</option>
              {designations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Icon.chevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500"
              aria-hidden
            />
          </label>
        </div>

        <p className="mt-3 px-2 text-[0.8125rem] text-ink-500">
          Showing <span className="font-semibold text-jade-900">{filtered.length}</span> of{' '}
          {entries.length} records for {selected.label}
        </p>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
          <p className="font-display text-xl text-jade-900">No employees match your search</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDesignation('all');
              resetPage();
            }}
            className="mt-5 rounded-full border border-sand-300 px-5 py-2.5 text-[0.875rem] font-semibold text-jade-800 transition hover:bg-sand-100"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-sand-200 bg-white">
          <div className="scroll-slim overflow-x-auto">
            <table className="w-full min-w-[54rem] border-collapse text-left">
              <caption className="sr-only">
                Attendance register for {selected.label}: days present, working days, weekly off, leave and loss of pay
              </caption>
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50">
                  <th scope="col" className="w-14 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-sand-700 md:px-7">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                    Designation
                  </th>
                  <NumericHeader>Days present</NumericHeader>
                  <NumericHeader>Working days</NumericHeader>
                  <NumericHeader>Weekly off</NumericHeader>
                  <NumericHeader title="Casual / Earned Leave, Compensatory Off, Holiday, Government Holiday, Medical Leave, Out On Duty">
                    Leave
                  </NumericHeader>
                  <NumericHeader title="Loss of pay">LOP</NumericHeader>
                </tr>
              </thead>
              <tbody>
                {visible.map((entry, index) => (
                  <tr
                    key={`${entry.serial}-${entry.name}-${index}`}
                    className="border-b border-sand-100 transition-colors last:border-0 hover:bg-sand-50"
                  >
                    <td className="px-5 py-3 font-mono text-[0.8125rem] text-sand-600 tabular-nums md:px-7">
                      {entry.serial}
                    </td>
                    <th scope="row" className="px-4 py-3 text-[0.875rem] font-medium text-jade-900">
                      {entry.name}
                    </th>
                    <td className="px-4 py-3 text-[0.8125rem] text-ink-500">{entry.designation || '—'}</td>
                    <NumericCell value={entry.present} emphasis />
                    <NumericCell value={entry.workingDays} />
                    <NumericCell value={entry.weeklyOff} />
                    <NumericCell value={entry.leave} />
                    <NumericCell value={entry.lop} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pageCount > 1 ? (
            <div className="flex items-center justify-between gap-4 border-t border-sand-200 px-5 py-4 md:px-7">
              <p className="text-[0.8125rem] text-ink-500">
                Page {safePage + 1} of {pageCount}
              </p>
              <div className="flex gap-2">
                <PagerButton disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>
                  <Icon.chevronRight className="h-4 w-4 rotate-180" aria-hidden />
                  <span className="sr-only sm:not-sr-only">Previous</span>
                </PagerButton>
                <PagerButton disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)}>
                  <span className="sr-only sm:not-sr-only">Next</span>
                  <Icon.chevronRight className="h-4 w-4" aria-hidden />
                </PagerButton>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

/**
 * Headcount across reporting months.
 *
 * One series → single hue from the brand's jade ramp, no legend (the caption
 * names the measure). Bars are 4px-rounded at the data end and separated by a
 * 2px surface gap.
 */
function HeadcountTrend({ months, activeId }: { months: MonthSummary[]; activeId: string }) {
  const ordered = [...months].reverse();
  const max = Math.max(1, ...ordered.map((month) => month.headcount));
  const min = Math.min(...ordered.map((month) => month.headcount));

  return (
    <figure className="rounded-card border border-sand-200 bg-white p-5 md:p-8">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h3 className="text-lg">Staff on the attendance register</h3>
          <p className="mt-1 text-[0.875rem] text-ink-500">
            Headcount recorded in each monthly report, oldest to most recent.
          </p>
        </div>
        <p className="font-mono text-[0.8125rem] text-ink-500 tabular-nums">
          {min}–{max} staff
        </p>
      </figcaption>

      <div className="flex h-40 items-end gap-[2px]">
        {ordered.map((month) => {
          // Scale from a floor below the minimum so month-to-month change is legible.
          const floor = Math.max(0, min - 12);
          const height = ((month.headcount - floor) / (max - floor || 1)) * 100;
          const isActive = month.id === activeId;

          return (
            <Link
              key={month.id}
              href={`/attendance-analysis?month=${month.id}`}
              scroll={false}
              title={`${month.label}: ${month.headcount} staff`}
              aria-label={`${month.label}: ${month.headcount} staff on record`}
              className="group relative flex flex-1 flex-col justify-end"
              style={{ height: '100%' }}
            >
              <span
                className={cn(
                  'w-full rounded-t-[4px] transition-all duration-300',
                  isActive ? 'bg-turmeric-500' : 'bg-jade-600 group-hover:bg-jade-700',
                )}
                style={{ height: `${Math.max(height, 6)}%` }}
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-jade-950 px-2.5 py-1.5 text-[0.7rem] font-medium text-sand-50 opacity-0 shadow-lift transition-opacity group-hover:opacity-100">
                {month.label} · {month.headcount}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between text-[0.7rem] text-sand-600">
        <span>{ordered[0]?.label}</span>
        <span>{ordered[ordered.length - 1]?.label}</span>
      </div>
    </figure>
  );
}

function NumericHeader({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <th
      scope="col"
      title={title}
      className="px-3 py-3 text-right text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-sand-700"
    >
      {children}
    </th>
  );
}

function NumericCell({ value, emphasis = false }: { value: number; emphasis?: boolean }) {
  return (
    <td
      className={cn(
        'px-3 py-3 text-right font-mono text-[0.8125rem] tabular-nums',
        emphasis ? 'font-semibold text-jade-900' : 'text-ink-500',
      )}
    >
      {value === 0 ? <span className="text-sand-400">0</span> : formatNumber(value, value % 1 === 0 ? 0 : 1)}
    </td>
  );
}

function PagerButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 px-4 py-2 text-[0.8125rem] font-semibold text-jade-800 transition hover:bg-sand-100 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function StatTile({
  icon,
  label,
  value,
  detail,
}: {
  icon: 'users' | 'clock' | 'calendar';
  label: string;
  value: string;
  detail: string;
}) {
  const Glyph = Icon[icon];
  return (
    <div className="rounded-card border border-sand-200 bg-white p-6">
      <div className="flex items-center gap-2.5">
        <Glyph className="h-4.5 w-4.5 text-turmeric-600" aria-hidden />
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">{label}</p>
      </div>
      <p className="mt-3 font-display text-[1.75rem] leading-none text-jade-900 tabular-nums">{value}</p>
      <p className="mt-2 text-[0.8125rem] text-ink-500">{detail}</p>
    </div>
  );
}
