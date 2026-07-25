'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { cn, formatNumber } from '@/lib/utils';
import type { WellnessProgram } from '@/content/programs';

/**
 * A wellness program with its tariff matrix.
 *
 * The duration toggle re-reads the same tariff table rather than swapping data
 * sets, so ward-to-ward comparison stays stable as the duration changes.
 */
export function ProgramCard({ program, index }: { program: WellnessProgram; index: number }) {
  const [days, setDays] = useState(program.durationsInDays[0]);
  const flip = index % 2 === 1;

  return (
    <article
      id={program.slug}
      className="overflow-hidden rounded-[2rem] border border-sand-200 bg-white shadow-soft"
    >
      <div className={cn('grid lg:grid-cols-2', flip && 'lg:[direction:rtl]')}>
        <div className="relative min-h-[16rem] lg:min-h-full">
          <Image
            src={program.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-jade-950/70 via-jade-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-jade-950/20"
          />
          <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-turmeric-400/95 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-jade-950">
            <Icon.clock className="h-3 w-3" aria-hidden />
            {program.duration}
          </span>
        </div>

        <div className="p-7 [direction:ltr] md:p-10">
          <h3 className="text-[clamp(1.35rem,1.1rem+0.7vw,1.75rem)] leading-tight">{program.name}</h3>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">{program.description}</p>

          <div className="mt-7">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
              {program.idealFor ? 'Ideal for' : 'Daily program includes'}
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {(program.idealFor ?? program.includes).map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-turmeric-600" aria-hidden />
                  <span className="text-[0.875rem] leading-snug text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {program.tariffs ? (
            <div className="mt-8 rounded-2xl border border-sand-200 bg-sand-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
                  Tariff by ward
                </p>

                <div
                  className="flex items-center gap-1 rounded-full border border-sand-200 bg-white p-1"
                  role="group"
                  aria-label={`Duration for ${program.name}`}
                >
                  {program.durationsInDays.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDays(option)}
                      aria-pressed={days === option}
                      className={cn(
                        'rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold transition-colors',
                        days === option ? 'bg-jade-800 text-sand-50' : 'text-ink-500 hover:text-jade-800',
                      )}
                    >
                      {option} days
                    </button>
                  ))}
                </div>
              </div>

              <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-sand-200 bg-sand-200 sm:grid-cols-2">
                {program.tariffs.map((tariff) => (
                  <div key={tariff.ward} className="flex items-baseline justify-between gap-3 bg-white px-4 py-3">
                    <dt className="text-[0.8125rem] text-ink-500">{tariff.ward}</dt>
                    <dd className="font-display text-[1.0625rem] text-jade-900 tabular-nums">
                      ₹{formatNumber(tariff.prices[days] ?? 0)}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-[0.75rem] leading-relaxed text-sand-700">
                Inclusive of accommodation, all meals, therapies, medicines and daily doctor
                consultations. Tariffs are indicative — please confirm current rates when booking.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Enquire about this program
            </ButtonLink>
            <ButtonLink href="/treatments" variant="ghost">
              See the therapies
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
