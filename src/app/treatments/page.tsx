import Image from 'next/image';
import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { TreatmentsGrid } from '@/components/treatments/TreatmentsGrid';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { treatments } from '@/content/clinical';
import { media } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Over 30 classical Ayurvedic therapies at JSS Ayurveda Hospital, Mysuru — Abhyanga, Shirodhara, Panchakarma, Nasya, Netra Tarpana, Kizhi, Virechana, Vamana and more.',
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Time-tested therapies. Personally prescribed."
        crumbs={[{ label: 'Treatments' }]}
        imageSlot="panchakarma-therapy"
        intro={`${treatments.length} classical Ayurvedic procedures, each personally prescribed by our doctors based on your Prakruti and health condition — and performed by trained therapists under direct medical supervision.`}
      />

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Treatments"
            title="A holistic journey to healing"
            intro="Search by therapy name or by the condition you want help with. Not sure where to start? Our doctors will design the right combination for you after a Prakruti assessment."
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
                eyebrow="Our Medicines"
                title="Prepared on-site — from our garden to your treatment"
                intro={
                  <>
                    <p>
                      At JSS Ayurveda Hospital, we do not purchase medicines from outside suppliers.
                      Every Churna, Kashayam, Ghritam and Taila used in your treatment is prepared in
                      our own in-house Ayur-Drug Manufacturing Unit — using herbs grown in our 15-acre
                      on-campus herbal garden.
                    </p>
                    <p className="mt-4">
                      This means that when you receive any medicine or oil therapy at JSS, you can be
                      certain of exactly what you are taking — its source, its ingredients and its
                      purpose. No compromise. No shortcuts.
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

      {/* Therapy environment */}
      <Section tone="cream" compact>
        <div className="container-page">
          <SectionHeading
            eyebrow="Where it happens"
            title="26 therapy rooms, separate wings, trained hands"
            intro="Each therapy room is hygienically maintained and fitted with specially designed massage tables and steam chambers. Male and female patients have separate wings, and every procedure is performed under medical supervision."
            align="center"
          />

          <Reveal delay={120}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-sand-200">
              <AiImage
                slot="panchakarma-therapy"
                className="aspect-2/1 w-full"
                sizes="100vw"
                showPrompt={false}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Feel rejuvenated with authentic Ayurvedic treatment"
        intro="Our expert doctors are available all seven days of the week. Tell us what you are dealing with and we will recommend the right therapy plan."
        primary={{ label: 'Book an appointment', href: '/contact' }}
        secondary={{ label: 'See wellness programs', href: '/wellness-packages' }}
      />
    </>
  );
}
