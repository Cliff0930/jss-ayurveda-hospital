import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { onlineConsultation } from '@/content/misc';
import { photo } from '@/lib/media';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Online Consultation',
  description:
    'Consult a JSS Ayurveda Hospital, Mysuru doctor from home by audio call. Fee ₹550, including OPD card, doctor allotment and your doctor’s contact details. Call +91 91487 59349 or 0821-2548231 to book.',
};

const bookingNumbers = [contact.mobiles[0], contact.phones[0]];

export default function OnlineConsultationPage() {
  const { fee, includes, mode, steps } = onlineConsultation;

  return (
    <>
      <PageHero
        eyebrow="Online Consultation"
        title="Consult our doctors from home"
        crumbs={[{ label: 'Online Consultation' }]}
        image={photo.consultation}
        intro="For patients who cannot visit the hospital in person, our doctors are available for online consultation by audio call."
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--header-sticky)+2rem)] lg:self-start">
              <Reveal>
                <div className="rounded-card bg-jade-900 p-7 text-sand-100 shadow-lift md:p-8">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-turmeric-300">
                    Consultation fee
                  </p>
                  <p className="mt-2 font-display text-5xl leading-none text-white">₹{fee}</p>
                  <p className="mt-5 text-[0.875rem] text-sand-200">This includes</p>
                  <ul className="mt-3 grid gap-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                        <Icon.check className="h-4 w-4 shrink-0 text-turmeric-300" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-5 text-[0.875rem] text-sand-200">
                    <Icon.phone className="h-4 w-4 shrink-0 text-turmeric-300" aria-hidden />
                    Consultation by {mode.toLowerCase()}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-5 rounded-card border border-sand-200 bg-white p-6">
                  <h2 className="text-[1.0625rem] leading-snug">Booking &amp; enquiries</h2>
                  <ul className="mt-4 grid gap-2">
                    {bookingNumbers.map((number) => (
                      <li key={number.href}>
                        <a
                          href={number.href}
                          className="font-display text-xl text-jade-900 transition hover:text-turmeric-700"
                        >
                          {number.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div>
              <SectionHeading eyebrow="How to book" title="Seven simple steps" />
              <ol className="mt-10 grid gap-4">
                {steps.map((step, index) => {
                  const Glyph = Icon[step.icon];
                  return (
                    <Reveal as="li" key={step.title} delay={(index % 4) * 70}>
                      <article className="flex gap-5 rounded-card border border-sand-200 bg-white p-6 md:p-7">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-jade-50 text-jade-700">
                          <Glyph className="h-6 w-6" aria-hidden />
                        </span>
                        <div>
                          <p className="font-mono text-[0.75rem] tracking-widest text-sand-600">
                            STEP {index + 1}
                          </p>
                          <h3 className="mt-1 text-[1.125rem] leading-snug">{step.title}</h3>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                            {step.body}
                            {index === 0 ? (
                              <>
                                {' '}
                                {bookingNumbers.map((number, i) => (
                                  <span key={number.href}>
                                    {i > 0 ? ' / ' : ''}
                                    <a
                                      href={number.href}
                                      className="font-semibold text-jade-800 underline-offset-4 hover:underline"
                                    >
                                      {number.display}
                                    </a>
                                  </span>
                                ))}
                              </>
                            ) : null}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Book your online consultation"
        intro={`Call ${bookingNumbers.map((n) => n.display).join(' or ')} — our team will take your details and fix a time with the right doctor.`}
        primary={{ label: `Call ${contact.mobiles[0].display}`, href: contact.mobiles[0].href }}
      />
    </>
  );
}
