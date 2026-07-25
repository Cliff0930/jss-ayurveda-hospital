import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { specialities } from '@/content/clinical';

export function SpecialityShowcase() {
  return (
    <Section tone="cream">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Speciality Clinics"
            title="Focused Care for Complex Conditions"
            intro="Dedicated clinics where experienced doctors focus on one condition — combining classical Ayurveda with careful, ongoing assessment."
            className="max-w-2xl"
          />
          <Reveal delay={120}>
            <ButtonLink href="/specialities" variant="ghost" arrow className="shrink-0">
              All speciality clinics
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialities.map((clinic, index) => {
            const Glyph = Icon[clinic.icon];
            return (
              <Reveal key={clinic.slug} delay={(index % 3) * 80}>
                <Link
                  href={`/specialities#${clinic.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={clinic.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-jade-950/75 via-jade-950/10 to-transparent"
                    />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-sand-50/95 text-jade-800 backdrop-blur">
                      <Glyph className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="absolute inset-x-4 bottom-3 text-[1.0625rem] leading-snug text-sand-50">
                      {clinic.name}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.875rem] leading-relaxed text-ink-500">{clinic.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-jade-700 transition-colors group-hover:text-turmeric-700">
                      Learn more
                      <Icon.arrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
