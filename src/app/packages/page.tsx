import type { Metadata } from 'next';

import { PosterGrid } from '@/components/gallery/PosterGrid';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { departments } from '@/content/clinical';
import { getPackagePosters } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Department-wise Packages',
  description:
    'Specialised treatment packages designed by each department at JSS Ayurveda Hospital, Mysuru — Kayachikitsa, Panchakarma, Shalyatantra, Shalakyatantra, Prasoothi & Streeroga, Swasthavritta and more.',
};

export default async function PackagesPage() {
  const posters = await getPackagePosters();

  return (
    <>
      <PageHero
        eyebrow="Department Packages"
        title="Specialised packages, designed by each department"
        crumbs={[{ label: 'Department-wise Packages' }]}
        imageSlot="cta-band"
        intro="Each department at JSS Ayurveda Hospital offers focused treatment packages. Click any poster to view it in full size — or contact us to know current tariffs and availability."
      >
        <ButtonLink href="/contact" variant="secondary" arrow>
          Ask about tariffs
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <div className="container-page">
          <PosterGrid posters={posters} />
        </div>
      </Section>

      <Section tone="white" compact>
        <div className="container-page">
          <SectionHeading
            eyebrow="By department"
            title="Which department does your condition belong to?"
            intro="If you are not sure which package applies, start here — or call us and our team will direct you to the right consultant."
            align="center"
          />

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {departments.map((department, index) => (
              <Reveal key={department.slug} delay={index * 60}>
                <a
                  href={`/opd#${department.slug}`}
                  className="inline-flex flex-col rounded-card border border-sand-200 bg-sand-50 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-jade-200 hover:bg-white hover:shadow-soft"
                >
                  <span className="text-[0.9375rem] font-semibold text-jade-900">{department.name}</span>
                  <span className="mt-0.5 text-[0.75rem] text-ink-500">{department.english}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Contact us for current tariffs"
        intro="Package contents and rates are reviewed periodically. Call the hospital and we will confirm what applies to your condition and dates."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Wellness packages', href: '/wellness-packages' }}
      />
    </>
  );
}
