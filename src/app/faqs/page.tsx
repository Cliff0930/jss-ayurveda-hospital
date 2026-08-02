import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { faqs } from '@/content/misc';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Answers to common questions about Ayurveda, Panchakarma, treatment duration, insurance, food and international patients at JSS Ayurveda Hospital, Mysuru.',
};

/** FAQPage structured data so answers can surface directly in search results. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Simple, honest answers"
        crumbs={[{ label: 'FAQs' }]}
        imageSlot="consultation-room"
        intro="New to Ayurveda or planning your first visit? Here are the questions our patients ask us most. Still not sure — call us or send a message, we are always happy to help."
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--header-sticky)+2rem)] lg:self-start">
              <SectionHeading eyebrow="Help" title="What can we help you with?" />

              <Reveal delay={140}>
                <div className="mt-8 rounded-card border border-sand-200 bg-white p-6">
                  <Icon.phone className="h-6 w-6 text-turmeric-600" aria-hidden />
                  <h3 className="mt-4 text-[1.0625rem] leading-snug">Still have a question?</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">
                    Our team answers calls during OPD hours, and duty doctors are available round the
                    clock for urgent consultations.
                  </p>

                  <a
                    href={contact.phones[0].href}
                    className="mt-5 block font-display text-xl text-jade-900 transition hover:text-turmeric-700"
                  >
                    {contact.phones[0].display}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block text-[0.875rem] text-ink-500 transition hover:text-jade-800"
                  >
                    {contact.email}
                  </a>

                  <ButtonLink href="/contact" className="mt-6 w-full" arrow>
                    Send us a message
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={80}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Get authentic Ayurvedic treatment today"
        intro="Our expert doctors are available all seven days of the week. Whether you are managing a chronic condition or simply seeking a healthier way of life — we are here to guide you."
        primary={{ label: 'Book an appointment', href: '/contact' }}
      />

      <script
        type="application/ld+json"
        // Static content authored in src/content/misc.ts — no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
