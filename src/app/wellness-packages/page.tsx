import Image from 'next/image';
import type { Metadata } from 'next';

import { Process } from '@/components/home/Process';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { CtaBand } from '@/components/shared/CtaBand';
import { TreatmentsGrid } from '@/components/treatments/TreatmentsGrid';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { treatments } from '@/content/clinical';
import { additionalPrograms, wellnessPrograms } from '@/content/programs';
import { media, photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Packages & Treatments',
  description:
    'Ayurvedic wellness packages and over 30 classical treatments at JSS Ayurveda Hospital, Mysuru — Panchakarma, Rasayana, stress management, Shirodhara, Abhyanga, Nasya, Kizhi and more, with ward-wise tariffs.',
};

export default function WellnessPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages & Treatments"
        title="Your personalised healing program"
        crumbs={[{ label: 'Packages & Treatments' }]}
        image={photo.heroAbhyanga}
        intro="Each program at JSS Ayurveda Hospital is individually designed by our doctors based on your health condition, body constitution and goals. Every tariff includes accommodation, meals, therapies, medicines and daily doctor consultations."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary" arrow>
            Plan my program
          </ButtonLink>
          <ButtonLink href="#treatments" variant="outline-light">
            Browse treatments
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

      {/* Treatments — merged in from the former Treatments page */}
      <Section tone="cream" id="treatments">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Treatments"
            title={`${treatments.length} classical therapies, personally prescribed`}
            intro="Every package is built from these therapies. Search by therapy name or by the condition you want help with — our doctors will design the right combination for you after a Prakruti assessment."
            align="center"
            className="mb-14"
          />

          <TreatmentsGrid />
        </div>
      </Section>

      {/* Medicines */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-4/5 w-[78%] overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={media.fenugreek}
                    alt="Dried medicinal herbs used in JSS Ayurveda Hospital formulations"
                    fill
                    sizes="(min-width: 1024px) 26rem, 70vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-6 right-0 aspect-square w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-white shadow-lift">
                  <Image
                    src={media.turmericRoot}
                    alt="Turmeric root and powder, a staple of Ayurvedic formulation"
                    fill
                    sizes="(min-width: 1024px) 18rem, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="100% Authentic Ayurvedic Medicines"
                title="Prepared on-site — from our garden to your treatment"
                intro={
                  <>
                    <p>
                      We do not purchase medicines from outside suppliers. Every Churna, Kashayam,
                      Ghritam and Taila used in your treatment is prepared in our own in-house
                      Ayur-Drug Manufacturing Unit — using herbs grown in our 15-acre on-campus herbal
                      garden.
                    </p>
                    <p className="mt-4">
                      When you receive any medicine or oil therapy at JSS, you can be certain of
                      exactly what you are taking — its source, its ingredients and its purpose.
                    </p>
                  </>
                }
              />

              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/products" arrow>
                    Explore our products
                  </ButtonLink>
                  <ButtonLink href="/ayur-pharma" variant="ghost">
                    JSS Ayur Pharma
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
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
