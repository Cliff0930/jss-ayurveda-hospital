'use client';

import { useMemo, useState } from 'react';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { cn, initials } from '@/lib/utils';
import type { StaffData } from '@/lib/wp/queries';

type View = 'cards' | 'table';

/**
 * Full hospital staff directory, read live from WordPress.
 *
 * 150+ rows, so the page ships both a scannable card view and a dense table
 * view, with search and a designation filter over both.
 */
export function StaffDirectory({ data }: { data: StaffData }) {
  const [query, setQuery] = useState('');
  const [designation, setDesignation] = useState('all');
  const [view, setView] = useState<View>('cards');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.members.filter((member) => {
      if (designation !== 'all' && member.designation !== designation) return false;
      if (!needle) return true;
      return (
        member.name.toLowerCase().includes(needle) ||
        member.qualification.toLowerCase().includes(needle) ||
        member.designation.toLowerCase().includes(needle)
      );
    });
  }, [data.members, designation, query]);

  if (data.members.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
        <p className="font-display text-xl text-jade-900">Staff records are not available right now</p>
        <p className="mt-2 text-[0.9375rem] text-ink-500">Please try again shortly.</p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="sticky top-[calc(var(--header-sticky)+0.5rem)] z-20 mb-10 rounded-2xl border border-sand-200 bg-sand-50/92 p-3 shadow-soft backdrop-blur-xl md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search staff by name, qualification or designation</span>
            <Icon.search
              className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-sand-500"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, qualification or designation…"
              className="h-12 w-full rounded-full border border-sand-200 bg-white pl-12 pr-4 text-[0.9375rem] text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-300"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Filter by designation</span>
            <select
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
              className="h-12 w-full cursor-pointer appearance-none rounded-full border border-sand-200 bg-white pl-5 pr-11 text-[0.9375rem] text-jade-900 outline-none transition focus:border-jade-300 lg:w-64"
            >
              <option value="all">All designations ({data.members.length})</option>
              {data.designations.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} ({item.count})
                </option>
              ))}
            </select>
            <Icon.chevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-500"
              aria-hidden
            />
          </label>

          <div className="flex items-center gap-1 rounded-full border border-sand-200 bg-white p-1" role="group" aria-label="View mode">
            <ViewButton active={view === 'cards'} onClick={() => setView('cards')}>
              Cards
            </ViewButton>
            <ViewButton active={view === 'table'} onClick={() => setView('table')}>
              Table
            </ViewButton>
          </div>
        </div>

        <p className="mt-3 px-2 text-[0.8125rem] text-ink-500">
          Showing <span className="font-semibold text-jade-900">{filtered.length}</span> of{' '}
          {data.members.length} staff members
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
          <p className="font-display text-xl text-jade-900">No staff match your search</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDesignation('all');
            }}
            className="mt-5 rounded-full border border-sand-300 px-5 py-2.5 text-[0.875rem] font-semibold text-jade-800 transition hover:bg-sand-100"
          >
            Reset filters
          </button>
        </div>
      ) : view === 'cards' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((member, index) => (
            <Reveal key={`${member.serial}-${member.name}`} delay={Math.min(index, 10) * 40}>
              <article className="group flex h-full gap-4 rounded-card border border-sand-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-jade-200 hover:shadow-soft">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade-50 font-display text-[0.9375rem] text-jade-700 transition-colors group-hover:bg-turmeric-100 group-hover:text-turmeric-800"
                >
                  {initials(member.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-[0.9375rem] leading-snug" title={member.name}>
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] font-medium text-turmeric-700">{member.designation}</p>
                  {member.qualification ? (
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-500">{member.qualification}</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-sand-200 bg-white">
          <div className="scroll-slim overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">Staff of JSS Ayurveda Hospital with qualification and designation</caption>
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50">
                  <th scope="col" className="w-16 px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700 md:px-7">
                    #
                  </th>
                  <th scope="col" className="px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                    Employee name
                  </th>
                  <th scope="col" className="px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                    Qualification
                  </th>
                  <th scope="col" className="px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr
                    key={`${member.serial}-${member.name}`}
                    className="border-b border-sand-100 transition-colors last:border-0 hover:bg-sand-50"
                  >
                    <td className="px-5 py-3 font-mono text-[0.8125rem] text-sand-600 tabular-nums md:px-7">
                      {member.serial}
                    </td>
                    <th scope="row" className="px-5 py-3 text-[0.875rem] font-medium text-jade-900">
                      {member.name}
                    </th>
                    <td className="px-5 py-3 text-[0.8125rem] text-ink-500">{member.qualification || '—'}</td>
                    <td className="px-5 py-3 text-[0.8125rem] text-ink-700">{member.designation || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-colors',
        active ? 'bg-jade-800 text-sand-50' : 'text-ink-500 hover:text-jade-800',
      )}
    >
      {children}
    </button>
  );
}
