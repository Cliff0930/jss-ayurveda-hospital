import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { physiotherapy } from '@/content/misc';
import { photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Physiotherapy',
  description:
    'Physiotherapy and rehabilitation at JSS Ayurveda Hospital, Mysuru — neuro-rehabilitation, orthopaedic recovery, post-operative care and geriatric mobility, alongside classical Ayurvedic treatment.',
};

export default function PhysiotherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Physiotherapy"
        title="Modern rehabilitation, classical healing"
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Physiotherapy' }]}
        image={photo.physiotherapyBanner}
        intro={physiotherapy.intro}
      >
        <ButtonLink href="/contact" variant="secondary" arrow>
          Ask about physiotherapy
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we offer"
            title="Rehabilitation that works with your Ayurvedic treatment"
            intro="Physiotherapy at JSS is not a separate service running in parallel — it is coordinated with your consultant, so therapy and rehabilitation reinforce each other."
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {physiotherapy.services.map((service, index) => {
              const Glyph = Icon[service.icon];
              return (
                <Reveal key={service.title} delay={(index % 2) * 90}>
                  <article className="group h-full rounded-card border border-sand-200 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:border-turmeric-300 hover:shadow-soft">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade-50 text-jade-700 transition-colors duration-400 group-hover:bg-turmeric-100 group-hover:text-turmeric-800">
                      <Glyph className="h-5.5 w-5.5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{service.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{service.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={260}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-sand-200">
              <AiImage
                slot="physiotherapy-suite"
                className="aspect-2/1 w-full"
                sizes="100vw"
                showPrompt={false}
              />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-ink-500">
              {physiotherapy.note}
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Recovering from something? Let's plan it properly."
        intro="Tell us what you are recovering from and our consultants will design a combined Ayurvedic and physiotherapy plan."
        primary={{ label: 'Book a consultation', href: '/contact' }}
        secondary={{ label: 'See our departments', href: '/opd' }}
      />
    </>
  );
}
