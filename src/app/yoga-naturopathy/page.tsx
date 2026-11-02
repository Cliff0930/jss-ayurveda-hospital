import Image from 'next/image';
import type { Metadata } from 'next';

import { DoctorCard } from '@/components/doctors/DoctorCard';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { yogaNaturopathy } from '@/content/misc';
import { archive, photo } from '@/lib/media';
import { getDoctors } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'Yoga & Naturopathy',
  description:
    'Yoga and naturopathy at JSS Ayurveda Hospital, Mysuru — twice-daily guided yoga, pranayama, meditation, individual yoga therapy, mud therapy and acupuncture alongside Ayurvedic treatment.',
};

const YOGA_DEPARTMENT = 'yoga';

export default async function YogaNaturopathyPage() {
  const { doctors } = await getDoctors();
  const team = doctors.filter((doctor) => doctor.departmentSlug === YOGA_DEPARTMENT);

  return (
    <>
      <PageHero
        eyebrow="Yoga & Naturopathy"
        title="Breath, movement and nature — part of every cure"
        crumbs={[{ label: 'Yoga & Naturopathy' }]}
        image={photo.campusAerial}
        intro={yogaNaturopathy.intro}
      >
        <ButtonLink href="/contact" variant="secondary" arrow>
          Ask about yoga sessions
        </ButtonLink>
      </PageHero>

      {/* Daily rhythm */}
      <Section tone="cream">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Every day on campus"
                title="Yoga twice a day, in the hall and the garden"
                intro="Group sessions are held every day in our yoga hall and yoga garden, led by trained teachers. Individual sessions are planned around your therapy schedule."
              />

              <ol className="mt-10 overflow-hidden rounded-card border border-sand-200 bg-white">
                {yogaNaturopathy.schedule.map((slot, index) => (
                  <Reveal as="li" key={slot.time + slot.label} delay={index * 90}>
                    <div className="flex items-center gap-5 border-b border-sand-200 px-6 py-5 last:border-0">
                      <span className="w-28 shrink-0 font-display text-[1.375rem] leading-none text-jade-800">
                        {slot.time}
                      </span>
                      <span>
                        <span className="block text-[0.9375rem] font-semibold text-jade-900">{slot.label}</span>
                        <span className="block text-[0.8125rem] text-ink-500">{slot.note}</span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={140}>
              <figure className="relative">
                <div className="relative aspect-3/2 overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={archive.yogaDay}
                    alt="A mass yoga session on the JSS campus on International Day of Yoga 2025"
                    fill
                    sizes="(min-width: 1024px) 34rem, 90vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-jade-900 px-5 py-4 text-sand-50 shadow-lift">
                  <Icon.sun className="h-6 w-6 text-turmeric-400" aria-hidden />
                  <span className="text-[0.8125rem] leading-tight">
                    <span className="block font-display text-[1.0625rem]">International Day of Yoga</span>
                    <span className="text-sand-300">Yoga Sangam 2025 on our campus</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Offerings */}
      <Section tone="white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we offer"
            title="Yoga and natural therapies that support your treatment"
            align="center"
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-3">
            {yogaNaturopathy.offerings.map((offering, index) => {
              const Glyph = Icon[offering.icon];
              return (
                <Reveal key={offering.title} delay={(index % 3) * 80}>
                  <article className="group h-full bg-white p-7 transition-colors duration-400 hover:bg-sand-50 md:p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-50 text-jade-700 transition-colors duration-400 group-hover:bg-turmeric-100 group-hover:text-turmeric-800">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{offering.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{offering.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {team.length > 0 ? (
        <Section tone="cream" compact>
          <div className="container-page">
            <SectionHeading eyebrow="Our team" title="Yoga & naturopathy physicians" align="center" />
            <div className="mx-auto mt-12 grid max-w-4xl justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((doctor, index) => (
                <Reveal key={doctor.id} delay={index * 80}>
                  <DoctorCard doctor={doctor} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Add yoga and naturopathy to your healing plan"
        intro="Tell us about your condition and our doctors will build daily yoga, breathwork and natural therapies into your program."
        primary={{ label: 'Book a consultation', href: '/contact' }}
        secondary={{ label: 'See packages', href: '/wellness-packages' }}
      />
    </>
  );
}
