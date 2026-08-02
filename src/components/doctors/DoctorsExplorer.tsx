'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import type { DoctorDepartment } from '@/lib/wp/queries';
import type { DoctorRecord } from '@/lib/wp/parse';
import { cn, initials } from '@/lib/utils';

/**
 * Searchable, filterable directory of consultants.
 *
 * Data comes from WordPress (parsed from the [jssdoc] shortcode payload), so
 * adding a doctor in the CMS adds them here — including their department pill.
 */
export function DoctorsExplorer({
  doctors,
  departments,
}: {
  doctors: DoctorRecord[];
  departments: DoctorDepartment[];
}) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('all');
  const [selected, setSelected] = useState<DoctorRecord | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return doctors.filter((doctor) => {
      if (department !== 'all' && doctor.departmentSlug !== department) return false;
      if (!needle) return true;
      return (
        doctor.name.toLowerCase().includes(needle) ||
        doctor.qualification.toLowerCase().includes(needle) ||
        doctor.designation.toLowerCase().includes(needle) ||
        doctor.department.toLowerCase().includes(needle)
      );
    });
  }, [doctors, department, query]);

  return (
    <>
      {/* Toolbar */}
      <div className="sticky top-[calc(var(--header-sticky)+0.5rem)] z-20 -mx-2 mb-10 rounded-2xl border border-sand-200 bg-sand-50/92 p-3 shadow-soft backdrop-blur-xl md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search doctors by name, qualification or department</span>
            <Icon.search
              className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-sand-500"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, qualification or department…"
              className="h-12 w-full rounded-full border border-sand-200 bg-white pl-12 pr-4 text-[0.9375rem] text-jade-900 outline-none transition placeholder:text-sand-500 focus:border-jade-300"
            />
          </label>

          <p className="shrink-0 px-2 text-[0.8125rem] text-ink-500 lg:px-0">
            <span className="font-semibold text-jade-900">{filtered.length}</span>
            {filtered.length === 1 ? ' consultant' : ' consultants'}
          </p>
        </div>

        <div className="scroll-slim mt-3 flex gap-2 overflow-x-auto pb-1">
          <FilterPill active={department === 'all'} onClick={() => setDepartment('all')}>
            All
            <span className="ml-1.5 opacity-60">{doctors.length}</span>
          </FilterPill>

          {departments.map((dept) => (
            <FilterPill
              key={dept.slug}
              active={department === dept.slug}
              onClick={() => setDepartment(dept.slug)}
            >
              {dept.name}
              <span className="ml-1.5 opacity-60">{dept.count}</span>
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
          <p className="font-display text-xl text-jade-900">No consultants match your search</p>
          <p className="mt-2 text-[0.9375rem] text-ink-500">
            Try a different name or clear the department filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDepartment('all');
            }}
            className="mt-6 rounded-full border border-sand-300 px-5 py-2.5 text-[0.875rem] font-semibold text-jade-800 transition hover:bg-sand-100"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((doctor, index) => (
            <Reveal key={doctor.id + doctor.name} delay={Math.min(index, 8) * 50}>
              <DoctorTile doctor={doctor} onSelect={() => setSelected(doctor)} />
            </Reveal>
          ))}
        </div>
      )}

      <DoctorDialog doctor={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function FilterPill({
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

function DoctorTile({ doctor, onSelect }: { doctor: DoctorRecord; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View profile of ${doctor.name}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white text-left transition-all duration-400 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-jade-50">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(min-width: 1280px) 18rem, (min-width: 640px) 30vw, 90vw"
            /* Source portraits are already over-compressed — don't re-crush them. */
            quality={90}
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-display text-4xl text-jade-300">
            {initials(doctor.name)}
          </span>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-sand-50/92 px-2.5 py-1 text-[0.6875rem] font-semibold text-jade-800 backdrop-blur">
          {doctor.department}
        </span>
        {doctor.experience ? (
          <span className="absolute right-3 top-3 rounded-full bg-turmeric-400/95 px-2.5 py-1 text-[0.6875rem] font-bold text-jade-950">
            {doctor.experience}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.0625rem] leading-snug">{doctor.name}</h3>
        {doctor.qualification ? (
          <p className="mt-1 text-[0.8125rem] font-medium tracking-wide text-turmeric-700">
            {doctor.qualification}
          </p>
        ) : null}
        {doctor.designation ? (
          <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">{doctor.designation}</p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8125rem] font-semibold text-jade-700 transition-colors group-hover:text-turmeric-700">
          View profile
          <Icon.arrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </button>
  );
}

function DoctorDialog({ doctor, onClose }: { doctor: DoctorRecord | null; onClose: () => void }) {
  useEffect(() => {
    if (!doctor) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [doctor, onClose]);

  if (!doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-dialog-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-jade-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="animate-[jss-rise_0.4s_cubic-bezier(0.16,1,0.3,1)] relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] bg-sand-50 shadow-lift sm:rounded-[1.75rem]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-sand-50/90 text-jade-900 shadow-soft backdrop-blur transition hover:bg-white"
        >
          <Icon.close className="h-5 w-5" />
        </button>

        <div className="grid sm:grid-cols-[15rem_1fr]">
          <div className="relative aspect-4/5 bg-jade-100 sm:aspect-auto sm:min-h-[22rem]">
            {doctor.image ? (
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="15rem"
                quality={90}
                className="object-cover object-top"
              />
            ) : (
              <span className="grid h-full w-full place-items-center font-display text-5xl text-jade-400">
                {initials(doctor.name)}
              </span>
            )}
          </div>

          <div className="p-7 md:p-9">
            <p className="eyebrow">{doctor.department}</p>
            <h2 id="doctor-dialog-title" className="mt-3 text-[1.75rem] leading-tight">
              {doctor.name}
            </h2>

            <dl className="mt-6 space-y-4 border-t border-sand-200 pt-6">
              {doctor.qualification ? (
                <Detail icon="graduation" label="Qualification" value={doctor.qualification} />
              ) : null}
              {doctor.designation ? (
                <Detail icon="stethoscope" label="Designation" value={doctor.designation} />
              ) : null}
              {doctor.experience ? (
                <Detail icon="clock" label="Experience" value={doctor.experience} />
              ) : null}
              {doctor.specialities.length > 0 ? (
                <Detail icon="leaf" label="Areas of expertise" value={doctor.specialities.join(' · ')} />
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Book a consultation
              </ButtonLink>
              <ButtonLink href="/opd" variant="ghost">
                View department
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: 'graduation' | 'stethoscope' | 'clock' | 'leaf';
  label: string;
  value: string;
}) {
  const Glyph = Icon[icon];
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-jade-50 text-jade-700">
        <Glyph className="h-4.5 w-4.5" aria-hidden />
      </span>
      <div>
        <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-600">{label}</dt>
        <dd className="mt-0.5 text-[0.9375rem] leading-relaxed text-jade-900">{value}</dd>
      </div>
    </div>
  );
}
