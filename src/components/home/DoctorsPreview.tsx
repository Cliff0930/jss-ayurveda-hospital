import Link from 'next/link';

import { DoctorCard } from '@/components/doctors/DoctorCard';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getDoctors } from '@/lib/wp/queries';

/**
 * Live preview of the consultant team, read from WordPress.
 *
 * Renders nothing if WordPress is unreachable — the rest of the homepage is
 * unaffected, which is the whole point of keeping this an isolated server
 * component.
 */
export async function DoctorsPreview() {
  const { doctors, departments } = await getDoctors();
  if (doctors.length === 0) return null;

  const featured = doctors.slice(0, 4);

  return (
    <Section tone="cream">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Doctors"
            title="Meet the consultants who will care for you"
            intro={`${doctors.length} qualified Ayurvedic consultants across ${departments.length} departments — every therapy at JSS is prescribed and supervised by them personally.`}
            className="max-w-2xl"
          />
          <Reveal delay={120}>
            <ButtonLink href="/doctors" variant="ghost" arrow className="shrink-0">
              View the full team
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((doctor, index) => (
            <Reveal key={doctor.id + doctor.name} delay={index * 80}>
              <Link href="/doctors" className="block h-full" aria-label={`See all doctors — ${doctor.name}`}>
                <DoctorCard doctor={doctor} className="h-full hover:-translate-y-1.5 hover:shadow-lift" />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Department rail */}
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {departments.map((dept) => (
              <Link
                key={dept.slug}
                href="/doctors"
                className="rounded-full border border-sand-200 bg-white px-4 py-2 text-[0.8125rem] text-ink-500 transition hover:border-jade-200 hover:text-jade-800"
              >
                {dept.name}
                <span className="ml-1.5 text-sand-500">{dept.count}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
