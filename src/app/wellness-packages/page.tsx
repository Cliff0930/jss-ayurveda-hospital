import type { Metadata } from 'next';

import { Process } from '@/components/home/Process';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { additionalPrograms, wellnessPrograms } from '@/content/programs';

export const metadata: Metadata = {
  title: 'Wellness Packages',
  description:
    'Ayurvedic wellness programs at JSS Ayurveda Hospital, Mysuru — Panchakarma detoxification, Rasayana rejuvenation, stress management, Vasantha Vamana and migraine relief, with ward-wise tariffs.',
};

export default function WellnessPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness Packages"
        title="Your personalised healing program"
        crumbs={[{ label: 'Wellness Packages' }]}
        imageSlot="international-patient"
        intro="Each program at JSS Ayurveda Hospital is individually designed by our doctors based on your health condition, body constitution and goals. Every tariff includes accommodation, meals, therapies, medicines and daily doctor consultations."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary" arrow>
            Plan my program
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline-light">
            Compare pricing plans
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Programs"
            title="Get empowered with Ayurvedic programs"
            intro="Every tariff below is all-inclusive. Choose a duration to see the ward-wise rate — then talk to our doctors, who will confirm what is right for your condition."
            align="center"
            className="mb-14"
          />

          <div className="space-y-8">
            {wellnessPrograms.map((program, index) => (
              <Reveal key={program.slug} delay={(index % 2) * 60}>
                <ProgramCard program={program} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Additional programs */}
      <Section tone="white" compact>
        <div className="container-page">
          <SectionHeading
            eyebrow="Also available"
            title="Shorter programs and focused camps"
            align="center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalPrograms.map((program, index) => (
              <Reveal key={program.name} delay={index * 80}>
                <article className="group h-full rounded-card border border-sand-200 bg-sand-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-turmeric-300 hover:bg-white hover:shadow-soft">
                  <Icon.lotus className="h-6 w-6 text-turmeric-600" aria-hidden />
                  <h3 className="mt-4 text-[1rem] leading-snug">{program.name}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{program.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Process />

      <CtaBand
        title="Let our doctors design the right program for you"
        intro="No two programs at JSS are the same. Share your condition and your dates, and we will build the plan — therapies, diet, yoga and accommodation included."
        primary={{ label: 'Get an appointment', href: '/contact' }}
      />
    </>
  );
}
