import Image from 'next/image';
import type { Metadata } from 'next';

import { Testimonials } from '@/components/home/Testimonials';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { specialities } from '@/content/clinical';

export const metadata: Metadata = {
  title: 'Speciality Clinics',
  description:
    "Dedicated Ayurvedic clinics at JSS Ayurveda Hospital, Mysuru — Parkinson's, cancer support, migraine, liver, male and female infertility, piles & fistula, arthritis and Prakruthi wellness.",
};

/** Clinics that have long-form detail copy get their own deep-dive section. */
const detailed = specialities.filter((clinic) => 'detail' in clinic && clinic.detail);

export default function SpecialitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Speciality Clinics"
        title="Expert, focused care for complex conditions"
        crumbs={[{ label: 'Speciality Clinics' }]}
        imageSlot="speciality-clinic"
        intro="Our speciality clinics are led by senior Ayurvedic consultants with deep expertise in their fields — combining classical treatment with personalised care, for conditions that have often not responded well to conventional medicine."
      />

      {/* Clinic index */}
      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Specialities"
            title="Dedicated clinics for conditions that need expert focus"
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialities.map((clinic, index) => {
              const Glyph = Icon[clinic.icon];
              const hasDetail = 'detail' in clinic && clinic.detail;

              return (
                <Reveal key={clinic.slug} delay={(index % 3) * 80}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift">
                    <div className="relative aspect-16/9 overflow-hidden">
                      <Image
                        src={clinic.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-jade-950/70 to-transparent"
                      />
                      <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-sand-50/95 text-jade-800 backdrop-blur">
                        <Glyph className="h-5 w-5" aria-hidden />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[1.0625rem] leading-snug">{clinic.name}</h3>
                      <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-500">
                        {clinic.summary}
                      </p>

                      {/*
                        Every clinic with a confirmed figure carries it here —
                        including the four that have no deep-dive section, which
                        would otherwise have nowhere to show it.
                      */}
                      {clinic.treated ? (
                        <p className="mt-4 border-t border-sand-200 pt-3.5">
                          <span className="font-display text-[1.25rem] leading-none text-jade-800">
                            {clinic.treated.count}
                          </span>{' '}
                          <span className="text-[0.8125rem] text-ink-500">
                            {clinic.treated.label}
                          </span>
                          {clinic.treated.breakdown ? (
                            <span className="mt-1.5 block text-[0.75rem] leading-relaxed text-sand-600">
                              {clinic.treated.breakdown
                                .map((item) => `${item.label} ${item.value}`)
                                .join(' · ')}
                            </span>
                          ) : null}
                        </p>
                      ) : null}

                      {hasDetail ? (
                        <a
                          href={`#${clinic.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-jade-700 transition-colors hover:text-turmeric-700"
                        >
                          Read the full approach
                          <Icon.arrowRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Deep dives */}
      {detailed.map((clinic, index) => {
        const Glyph = Icon[clinic.icon];
        const flip = index % 2 === 1;

        return (
          <Section key={clinic.slug} id={clinic.slug} tone={flip ? 'cream' : 'white'}>
            <div className="container-page">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flip ? 'lg:order-2' : undefined}>
                  <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift">
                    <Image
                      src={clinic.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 34rem, 90vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-tr from-jade-950/40 to-transparent"
                    />
                    <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-sand-50/95 text-jade-800 backdrop-blur">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                  </div>
                </Reveal>

                <div className={flip ? 'lg:order-1' : undefined}>
                  <SectionHeading
                    eyebrow={clinic.name}
                    title={clinic.heading ?? clinic.name}
                    intro={clinic.detail?.map((paragraph) => (
                      <p key={paragraph} className="mt-4 first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  />

                  {clinic.treated ? (
                    <Reveal delay={160}>
                      <p className="mt-8 inline-flex items-baseline gap-2.5 rounded-full border border-jade-200 bg-jade-50 px-6 py-3">
                        <span className="font-display text-[1.75rem] leading-none text-jade-900">
                          {clinic.treated.count}
                        </span>
                        <span className="text-[0.9375rem] text-ink-500">
                          {clinic.treated.label}
                        </span>
                      </p>
                    </Reveal>
                  ) : null}

                  <Reveal delay={200}>
                    <ButtonLink href="/contact" className="mt-8" arrow>
                      Consult about this clinic
                    </ButtonLink>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Testimonials />
      <CtaBand />
    </>
  );
}
