import type { Metadata } from 'next';

import { WasteDashboard } from '@/components/data/WasteDashboard';
import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { formatDate } from '@/lib/utils';
import { getWasteData } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Bio-Medical Waste Data',
  description:
    'Monthly bio-medical waste disposal figures for JSS Ayurveda Hospital, Mysuru — segregated by statutory yellow, red, blue and black categories and published in full.',
};

export default async function WasteDataPage() {
  const data = await getWasteData();
  const updated = formatDate(data.updatedAt);

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Bio-Medical Waste Data"
        crumbs={[{ label: 'Bio-Medical Waste Data' }]}
        imageSlot="transparency-band"
        intro="Every kilogram of bio-medical waste generated at JSS Ayurveda Hospital is segregated at source, weighed and reported. These are our monthly figures, published as recorded."
      />

      <Section tone="cream">
        <div className="container-page">
          <WasteDashboard data={data} />

          {updated ? (
            <p className="mt-10 text-center text-[0.8125rem] text-sand-600">
              Figures maintained in the hospital records system · last updated {updated}
            </p>
          ) : null}
        </div>
      </Section>

      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-card border border-sand-200">
                <AiImage
                  slot="waste-management"
                  className="aspect-3/2 w-full"
                  sizes="(min-width: 1024px) 34rem, 90vw"
                  showPrompt={false}
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="How we handle it"
                title="Segregated at source. Weighed. Reported."
                intro="Bio-medical waste management at JSS Ayurveda Hospital follows the Bio-Medical Waste Management Rules — colour-coded segregation at the point of generation, secure intermediate storage, and handover to an authorised Common Bio-Medical Waste Treatment Facility."
              />

              <ul className="mt-8 space-y-4">
                {[
                  'Colour-coded bins at every point of generation, with trained staff and documented protocols.',
                  'Daily weighing and category-wise logging before transfer to the storage area.',
                  'Handover to an authorised treatment facility with full manifest documentation.',
                  'Monthly consolidation and public reporting — the figures above are those records.',
                ].map((item, index) => (
                  <Reveal as="li" key={item} delay={index * 80}>
                    <div className="flex gap-4">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade-800 text-[0.75rem] font-bold text-sand-50">
                        {index + 1}
                      </span>
                      <p className="text-[0.9375rem] leading-relaxed text-ink-500">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Accountability is part of patient safety"
        intro="Our NABH accreditation covers quality and safety standards across the hospital — including how we handle everything after treatment ends."
        primary={{ label: 'About the hospital', href: '/about' }}
        secondary={{ label: 'Staff attendance records', href: '/attendance-analysis' }}
      />
    </>
  );
}
