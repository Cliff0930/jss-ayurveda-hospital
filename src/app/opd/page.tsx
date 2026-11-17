import Image from 'next/image';
import type { Metadata } from 'next';

import { OpdTimetable } from '@/components/opd/OpdTimetable';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { departments, opdInfo } from '@/content/clinical';
import { photo } from '@/lib/media';
import { contact } from '@/lib/site';
import { getDoctors } from '@/lib/wp/queries';

export const metadata: Metadata = {
  title: 'OPD & Departments',
  description:
    'Seven Ayurvedic departments at JSS Ayurveda Hospital, Mysuru — Kayachikitsa, Panchakarma, Shalakyatantra, Swasthavritta, Prasoothi & Streeroga, Shalyatantra and Kaumarabhritya. OPD 8:00 AM to 4:30 PM.',
};

export default async function OpdPage() {
  const { doctors } = await getDoctors();
  const doctorNames = new Map(doctors.map((doctor) => [doctor.id, doctor.name]));

  return (
    <>
      <PageHero
        eyebrow="OPD & Departments"
        title="Expert Ayurvedic care across every speciality"
        crumbs={[{ label: 'OPD & Departments' }]}
        image={photo.opdBanner}
        intro="Every OPD department is led by qualified specialists who combine the depth of classical Ayurveda with the precision of modern diagnostic methods."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary" arrow>
            Book a consultation
          </ButtonLink>
          <ButtonLink href="/doctors" variant="outline-light">
            Meet the consultants
          </ButtonLink>
        </div>
      </PageHero>

      {/* OPD days & timings */}
      <section className="border-b border-sand-200 bg-white py-12 md:py-14">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center lg:gap-14">
            <Reveal>
              <p className="eyebrow">OPD days &amp; timings</p>
              <h2 className="mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight">
                Open every day of the week
              </h2>
            </Reveal>

            <div>
              <dl className="grid gap-px overflow-hidden rounded-card border border-sand-200 bg-sand-200 sm:grid-cols-3">
                {contact.hours.map((entry, index) => (
                  <Reveal key={entry.days} delay={index * 80}>
                    <div className="h-full bg-sand-50 p-5 md:p-6">
                      <dt className="flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-sand-700">
                        <Icon.calendar className="h-4 w-4 text-turmeric-600" aria-hidden />
                        {entry.days}
                      </dt>
                      <dd className="mt-3">
                        <span className="block font-display text-[1.375rem] leading-tight text-jade-900">
                          {entry.time}
                        </span>
                        <span className="mt-1 block text-[0.8125rem] text-ink-500">{entry.note}</span>
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={260}>
                <p className="mt-5 flex items-start gap-3 rounded-xl border border-turmeric-200 bg-turmeric-50 px-5 py-4 text-[0.9375rem] leading-relaxed text-jade-900">
                  <Icon.clock className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-600" aria-hidden />
                  <span>
                    Beyond their OPD days, our consultants are also available on prior appointment —{' '}
                    <a href={contact.phones[0].href} className="font-semibold underline-offset-4 hover:underline">
                      call {contact.phones[0].display}
                    </a>{' '}
                    to book.
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant roster */}
      <Section tone="white" compact id="opd-roster">
        <div className="container-page">
          <SectionHeading
            eyebrow="Consultants & OPD days"
            title="Who is in the OPD, and when"
            intro="The room-wise consultant roster for Monday to Saturday. Each consultant's days are also shown on their profile on the Doctors page."
          />
          <Reveal delay={120}>
            <OpdTimetable names={doctorNames} className="mt-10" />
          </Reveal>
        </div>
      </Section>

      {/* Departments */}
      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="OPD Departments"
            title="Seven departments, one campus"
            intro={opdInfo.summary}
            align="center"
          />

          <div className="mt-14 space-y-5">
            {departments.map((department, index) => {
              const Glyph = Icon[department.icon];
              return (
                <Reveal key={department.slug} delay={(index % 3) * 70}>
                  <article
                    id={department.slug}
                    className="group grid gap-7 rounded-card border border-sand-200 bg-white p-7 transition-all duration-400 hover:border-jade-200 hover:shadow-soft md:grid-cols-[1fr_1.1fr] md:p-9"
                  >
                    <div>
                      <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-jade-50 text-jade-700 transition-colors duration-400 group-hover:bg-turmeric-100 group-hover:text-turmeric-800">
                          <Glyph className="h-6 w-6" aria-hidden />
                        </span>
                        <div>
                          <h3 className="text-[1.25rem] leading-tight">{department.name}</h3>
                          <p className="mt-0.5 text-[0.8125rem] font-medium tracking-wide text-turmeric-700">
                            {department.english}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">{department.body}</p>
                    </div>

                    <div className="rounded-2xl bg-sand-50 p-6">
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-700">
                        {department.listTitle}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {department.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turmeric-400"
                            />
                            <span className="text-[0.875rem] leading-relaxed text-ink-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Visitor guidance */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Planning your visit"
                title="What to expect at the OPD"
                intro="No appointment is needed for a general OPD visit. For a specialist consultation, call ahead to confirm your consultant's OPD day — or book a time on prior appointment."
              />

              <div className="mt-10 space-y-5">
                {opdInfo.visitors.map((group, index) => (
                  <Reveal key={group.title} delay={index * 100}>
                    <div className="rounded-card border border-sand-200 bg-sand-50 p-6 md:p-7">
                      <h3 className="text-[1.0625rem] leading-snug">{group.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{group.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" arrow>
                    Get directions &amp; contact
                  </ButtonLink>
                  <ButtonLink href={contact.phones[0].href} variant="ghost">
                    Call {contact.phones[0].display}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="relative aspect-3/4 overflow-hidden rounded-[2rem] border border-sand-200">
                <Image
                  src={photo.opdPortrait}
                  alt="A consultant examining a patient during an out-patient consultation"
                  fill
                  sizes="(min-width: 1024px) 30rem, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Get authentic Ayurvedic treatment today"
        intro="Our expert doctors are available all seven days of the week. Whether you are managing a chronic condition or simply seeking a healthier way of life — we are here to guide you."
        primary={{ label: 'Book an appointment', href: '/contact' }}
      />
    </>
  );
}
