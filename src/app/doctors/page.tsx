import type { Metadata } from 'next';

import { DoctorsExplorer } from '@/components/doctors/DoctorsExplorer';
import { CtaBand } from '@/components/shared/CtaBand';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { formatDate } from '@/lib/utils';
import { getDoctors } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description:
    'Meet the qualified Ayurvedic consultants of JSS Ayurveda Hospital, Mysuru — BAMS, MD and MS specialists across 12 departments including Kayachikitsa, Panchakarma, Shalyatantra and Kaumarabhritya.',
};

export default async function DoctorsPage() {
  const { doctors, departments, updatedAt } = await getDoctors();
  const updated = formatDate(updatedAt);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Meet the doctors who will care for you"
        crumbs={[{ label: 'Our Doctors' }]}
        imageSlot="speciality-clinic"
        intro={
          <>
            {doctors.length} experienced consultants across {departments.length} departments. Every
            therapy at JSS Ayurveda Hospital is prescribed and supervised by them personally — select
            any profile to see qualifications, designation and experience.
          </>
        }
      />

      <Section tone="cream">
        <div className="container-page">
          <DoctorsExplorer doctors={doctors} departments={departments} />

          {updated ? (
            <p className="mt-10 text-center text-[0.8125rem] text-sand-600">
              Doctor records maintained in the hospital CMS · last updated {updated}
            </p>
          ) : null}
        </div>
      </Section>

      <CtaBand
        title="Not sure which consultant you need?"
        intro="Call the hospital and our team will guide you to the right department based on your condition — or book a general OPD consultation and we will take it from there."
        primary={{ label: 'Book a Consultation', href: '/contact' }}
        secondary={{ label: 'Browse departments', href: '/opd' }}
      />
    </>
  );
}
