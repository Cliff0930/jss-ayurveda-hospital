import type { Metadata } from 'next';

import { WhyUs } from '@/components/home/WhyUs';
import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { pricingNote, pricingTiers } from '@/content/programs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description:
    'Transparent, all-inclusive Ayurvedic treatment pricing at JSS Ayurveda Hospital, Mysuru — Rejuvenate programs from ₹5,500 per day and Panchakarma programs from ₹21,000.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent, all-inclusive healing"
        crumbs={[{ label: 'Pricing Plans' }]}
        imageSlot="cta-band"
        intro="Complete care with no hidden costs. Every plan includes accommodation, all meals, daily doctor consultations, prescribed therapies and herbal medicines."
      />

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Choose the plan"
            title="Affordable, honest pricing"
            intro={pricingNote}
            align="center"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 100}>
                <article
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-400',
                    tier.featured
                      ? 'border-jade-800 bg-jade-900 text-sand-100 shadow-lift lg:-translate-y-4'
                      : 'border-sand-200 bg-white hover:-translate-y-1 hover:shadow-soft',
                  )}
                >
                  {tier.featured ? (
                    <>
                      <div aria-hidden className="grain absolute inset-0" />
                      <span className="absolute right-6 top-6 rounded-full bg-turmeric-400 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-jade-950">
                        Most chosen
                      </span>
                    </>
                  ) : null}

                  <div className="relative flex flex-1 flex-col">
                    <h3
                      className={cn(
                        'text-[1.25rem] leading-snug',
                        tier.featured && 'text-sand-50',
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={cn(
                        'mt-1.5 text-[0.8125rem]',
                        tier.featured ? 'text-sand-300/80' : 'text-ink-500',
                      )}
                    >
                      {tier.subtitle}
                    </p>

                    <div className={cn('mt-7 border-t pt-7', tier.featured ? 'border-sand-50/15' : 'border-sand-200')}>
                      <p
                        className={cn(
                          'font-display text-[2.5rem] leading-none',
                          tier.featured ? 'text-turmeric-300' : 'text-jade-900',
                        )}
                      >
                        {tier.price}
                      </p>
                      <p
                        className={cn(
                          'mt-2 text-[0.8125rem]',
                          tier.featured ? 'text-sand-300/70' : 'text-sand-700',
                        )}
                      >
                        {tier.unit}
                      </p>
                    </div>

                    <ul className="mt-7 flex-1 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <Icon.check
                            className={cn(
                              'mt-0.5 h-4.5 w-4.5 shrink-0',
                              tier.featured ? 'text-turmeric-400' : 'text-turmeric-600',
                            )}
                            aria-hidden
                          />
                          <span
                            className={cn(
                              'text-[0.875rem] leading-relaxed',
                              tier.featured ? 'text-sand-200/85' : 'text-ink-500',
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <ButtonLink
                      href="/contact"
                      variant={tier.featured ? 'secondary' : 'primary'}
                      className="mt-8 w-full"
                      arrow
                    >
                      Book now
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={340}>
            <div className="mt-12 grid gap-5 rounded-card border border-sand-200 bg-white p-7 sm:grid-cols-3">
              {[
                { icon: 'shield' as const, title: 'Insurance supported', body: 'Full documentation provided for Ayurvedic in-patient reimbursement claims.' },
                { icon: 'bed' as const, title: 'Four ward types', body: 'Standard, Special, Deluxe and Ultra Deluxe — you choose what suits you.' },
                { icon: 'leaf' as const, title: 'Nothing extra to buy', body: 'All medicines used in your treatment are prepared and included on campus.' },
              ].map((item) => {
                const Glyph = Icon[item.icon];
                return (
                  <div key={item.title} className="flex gap-4">
                    <Glyph className="mt-0.5 h-5.5 w-5.5 shrink-0 text-turmeric-600" aria-hidden />
                    <div>
                      <h3 className="text-[0.9375rem] leading-snug">{item.title}</h3>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-8 text-center text-[0.8125rem] text-sand-700">
              Looking for detailed, ward-wise rates per program?{' '}
              <a href="/wellness-packages" className="font-semibold text-jade-800 underline underline-offset-4">
                See the full tariff matrix
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <WhyUs />

      <CtaBand
        title="Get authentic Ayurvedic treatment today"
        intro="Our expert doctors are available all seven days of the week. Call us to confirm current tariffs and availability for your dates."
        primary={{ label: 'Book an appointment', href: '/contact' }}
      />
    </>
  );
}
