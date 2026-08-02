import type { Metadata } from 'next';

import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { Icon, type IconName } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { contact, social } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact JSS Ayurveda Hospital, Mysuru — No. 41/E, Lalithadripura Road, Alanahalli, Mysuru 570028. Phone 0821-2548231, email contact@jssamch.org. OPD 9:00 AM to 4:30 PM.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are here for you"
        crumbs={[{ label: 'Contact Us' }]}
        imageSlot="cta-band"
        intro="Reach out and take the first step towards your healing. Our team answers calls during OPD hours, and duty doctors are available round the clock."
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Details */}
            <div className="space-y-5">
              <Reveal>
                <ContactCard icon="pin" title="Office location">
                  <p className="font-semibold text-jade-900">JSS Ayurveda Medical College &amp; Hospital</p>
                  <address className="mt-1.5 not-italic leading-relaxed">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-jade-700 transition hover:text-turmeric-700"
                  >
                    Open in Google Maps
                    <Icon.arrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </ContactCard>
              </Reveal>

              <Reveal delay={80}>
                <ContactCard icon="phone" title="Phone numbers">
                  <ul className="space-y-1.5">
                    {[...contact.phones, ...contact.mobiles].map((phone) => (
                      <li key={phone.href + phone.display}>
                        <a href={phone.href} className="transition hover:text-jade-800">
                          <span className="font-medium text-jade-900">{phone.display}</span>
                          <span className="ml-2 text-[0.8125rem] text-sand-700">{phone.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </ContactCard>
              </Reveal>

              <Reveal delay={140}>
                <ContactCard icon="mail" title="Email">
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-jade-900 transition hover:text-turmeric-700"
                  >
                    {contact.email}
                  </a>
                  <div className="mt-4 flex items-center gap-2.5">
                    {social.map((item) => {
                      const Glyph = Icon[item.icon as IconName];
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="grid h-9 w-9 place-items-center rounded-full border border-sand-200 text-jade-700 transition hover:border-jade-300 hover:bg-jade-50"
                        >
                          <Glyph className="h-4 w-4" />
                        </a>
                      );
                    })}
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="grid h-9 w-9 place-items-center rounded-full border border-sand-200 text-jade-700 transition hover:border-jade-300 hover:bg-jade-50"
                    >
                      <Icon.whatsapp className="h-4 w-4" />
                    </a>
                  </div>
                </ContactCard>
              </Reveal>

              <Reveal delay={200}>
                <ContactCard icon="clock" title="Consultation hours">
                  <ul className="space-y-2.5">
                    {contact.hours.map((entry) => (
                      <li key={entry.days}>
                        <span className="block font-medium text-jade-900">{entry.days}</span>
                        <span className="block text-[0.8125rem] text-ink-500">
                          {entry.time} · {entry.note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ContactCard>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={100}>
              <div className="rounded-[2rem] border border-sand-200 bg-white p-7 shadow-soft md:p-10">
                <SectionHeading
                  eyebrow="Send a message"
                  title="We'll be in touch shortly"
                  intro="Have a question about a treatment, program or your stay? Fill in the form and our team will respond within one working day."
                  className="mb-8"
                />
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Map */}
      <section className="relative">
        <div className="h-[24rem] w-full bg-sand-200 md:h-[30rem]">
          <iframe
            src={contact.mapsEmbed}
            title="Map showing the location of JSS Ayurveda Hospital, Mysuru"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
}) {
  const Glyph = Icon[icon];
  return (
    <div className="rounded-card border border-sand-200 bg-white p-6 transition-all duration-300 hover:border-jade-200 hover:shadow-soft md:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-jade-50 text-jade-700">
          <Glyph className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="text-[1.0625rem]">{title}</h2>
      </div>
      <div className="mt-4 text-[0.9375rem] text-ink-500">{children}</div>
    </div>
  );
}
