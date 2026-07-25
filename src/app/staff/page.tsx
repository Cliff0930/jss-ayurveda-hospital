import type { Metadata } from 'next';

import { StaffDirectory } from '@/components/data/StaffDirectory';
import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { formatDate } from '@/lib/utils';
import { getStaff } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Our Staff',
  description:
    'The complete staff directory of JSS Ayurveda Hospital, Mysuru — doctors, therapists, nurses, pharmacists and support staff, with qualification and designation.',
};

export default async function StaffPage() {
  const data = await getStaff();
  const updated = formatDate(data.updatedAt);

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Our Staff"
        crumbs={[{ label: 'Our Staff' }]}
        imageSlot="transparency-band"
        intro="Every person who makes JSS Ayurveda Hospital work — from our Medical Superintendent to our therapists, nurses, pharmacists and support staff. Published in full, and kept current."
      />

      <Section tone="cream" compact>
        <div className="container-page">
          <Reveal>
            <div className="mb-10 grid gap-6 rounded-card border border-jade-100 bg-jade-50 p-6 md:grid-cols-3 md:p-8">
              <div>
                <p className="font-display text-3xl text-jade-900">{data.members.length}</p>
                <p className="mt-1 text-[0.875rem] text-ink-500">staff members on record</p>
              </div>
              <div>
                <p className="font-display text-3xl text-jade-900">{data.designations.length}</p>
                <p className="mt-1 text-[0.875rem] text-ink-500">distinct designations</p>
              </div>
              <div>
                <p className="text-[0.875rem] leading-relaxed text-ink-500">
                  This directory is read directly from the hospital&apos;s records system. When the
                  register is updated internally, this page reflects it automatically.
                  {updated ? <span className="mt-1 block text-sand-600">Last updated {updated}.</span> : null}
                </p>
              </div>
            </div>
          </Reveal>

          <StaffDirectory data={data} />
        </div>
      </Section>

      <CtaBand
        title="Looking for a consultant rather than the full register?"
        intro="Our doctors page lists every consultant with their qualification, designation and years of experience — filterable by department."
        primary={{ label: 'View our doctors', href: '/doctors' }}
        secondary={{ label: 'Contact the hospital', href: '/contact' }}
      />
    </>
  );
}
