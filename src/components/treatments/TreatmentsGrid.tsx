'use client';

import { useMemo, useState } from 'react';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { treatmentGroups, treatments } from '@/content/clinical';
import { cn } from '@/lib/utils';

export function TreatmentsGrid() {
  const [group, setGroup] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return treatments.filter((treatment) => {
      if (group !== 'all' && treatment.group !== group) return false;
      if (!needle) return true;
      return (
        treatment.name.toLowerCase().includes(needle) ||
        treatment.body.toLowerCase().includes(needle) ||
        (treatment.helps ?? '').toLowerCase().includes(needle)
      );
    });
  }, [group, query]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const treatment of treatments) {
      map.set(treatment.group, (map.get(treatment.group) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <>
      <div className="sticky top-[calc(var(--header-sticky)+0.5rem)] z-20 mb-10 rounded-2xl border border-sand-200 bg-sand-50/92 p-3 shadow-soft backdrop-blur-xl md:p-4">
        <label className="relative block">
          <span className="sr-only">Search treatments</span>
          <Icon.search
            className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-sand-500"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a therapy or a condition — e.g. “Shirodhara” or “insomnia”…"
            className="h-12 w-full rounded-full border border-sand-200 bg-white pl-12 pr-4 text-[0.9375rem] text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-300"
          />
        </label>

        <div className="scroll-slim mt-3 flex gap-2 overflow-x-auto pb-1">
          <Pill active={group === 'all'} onClick={() => setGroup('all')}>
            All therapies <span className="ml-1.5 opacity-60">{treatments.length}</span>
          </Pill>
          {treatmentGroups.map((item) => (
            <Pill key={item.slug} active={group === item.slug} onClick={() => setGroup(item.slug)}>
              {item.name}
              <span className="ml-1.5 opacity-60">{counts.get(item.slug) ?? 0}</span>
            </Pill>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
          <p className="font-display text-xl text-jade-900">No therapies match your search</p>
          <p className="mt-2 text-[0.9375rem] text-ink-500">
            Try a broader term, or call us — our doctors will recommend the right therapy for your
            condition.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((treatment, index) => (
            <Reveal key={treatment.name} delay={Math.min(index, 9) * 50}>
              <article className="group flex h-full flex-col rounded-card border border-sand-200 bg-white p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-turmeric-300 hover:shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.0625rem] leading-snug">{treatment.name}</h3>
                  <span
                    aria-hidden
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-turmeric-400 transition-transform duration-300 group-hover:scale-150"
                  />
                </div>

                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-500">
                  {treatment.body}
                </p>

                {treatment.helps ? (
                  <div className="mt-4 border-t border-sand-200 pt-4">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
                      Helps with
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-jade-800">
                      {treatment.helps}
                    </p>
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function Pill({
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
        'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300',
        active
          ? 'border-jade-800 bg-jade-800 text-sand-50'
          : 'border-sand-200 bg-white text-ink-500 hover:border-jade-200 hover:text-jade-800',
      )}
    >
      {children}
    </button>
  );
}
