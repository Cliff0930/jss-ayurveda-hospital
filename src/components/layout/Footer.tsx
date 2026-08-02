import Image from 'next/image';
import Link from 'next/link';

import { media } from '@/lib/media';
import { contact, footerNav, site, social } from '@/lib/site';

import { Icon, type IconName } from '../ui/Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-jade-950 text-sand-300">
      <div aria-hidden className="grain absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-jade-700/25 blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid gap-12 border-b border-sand-50/10 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-16 lg:py-20">
          {/* Identity */}
          <div>
            <Image
              src={media.logoWhite}
              alt={site.name}
              width={455}
              height={113}
              className="h-16 w-auto max-w-full md:h-20"
            />

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-sand-300/80">
              A NABH-accredited Ayurvedic hospital on a 15-acre campus at the foothills of the
              Chamundi Hills — healing with authentic classical Ayurveda since {site.established}.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <Image
                src={media.nabh}
                alt="NABH accredited hospital"
                width={400}
                height={396}
                className="h-14 w-14 rounded-lg bg-sand-50/95 object-contain p-1.5"
              />
              <div className="text-[0.8125rem] leading-snug">
                <p className="font-semibold text-sand-100">NABH Accredited</p>
                <p className="text-sand-400/80">Quality &amp; patient-safety certified</p>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {social.map((item) => {
                const Glyph = Icon[item.icon as IconName];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-sand-50/15 text-sand-300 transition hover:border-turmeric-400 hover:bg-turmeric-400 hover:text-jade-950"
                  >
                    <Glyph className="h-4.5 w-4.5" />
                  </a>
                );
              })}
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand-50/15 text-sand-300 transition hover:border-turmeric-400 hover:bg-turmeric-400 hover:text-jade-950"
              >
                <Icon.whatsapp className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Sitemap + contact */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="font-display text-[0.9375rem] tracking-wide text-turmeric-300">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.875rem] text-sand-300/80 transition hover:text-sand-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="grid gap-8 border-b border-sand-50/10 py-10 md:grid-cols-3">
          <div className="flex gap-4">
            <Icon.pin className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-400" aria-hidden />
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-sand-400/70">
                Visit us
              </p>
              <address className="mt-2 text-[0.9375rem] not-italic leading-relaxed text-sand-200">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>

          <div className="flex gap-4">
            <Icon.phone className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-400" aria-hidden />
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-sand-400/70">
                Call us
              </p>
              <div className="mt-2 space-y-1 text-[0.9375rem] text-sand-200">
                {[...contact.phones, ...contact.mobiles].map((phone) => (
                  <a key={phone.href + phone.display} href={phone.href} className="block transition hover:text-turmeric-300">
                    {phone.display}
                    <span className="ml-2 text-[0.75rem] text-sand-400/70">{phone.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Icon.clock className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-400" aria-hidden />
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-sand-400/70">
                OPD hours
              </p>
              <ul className="mt-2 space-y-1.5 text-[0.9375rem] text-sand-200">
                {contact.hours.map((entry) => (
                  <li key={entry.days}>
                    <span className="block">{entry.days}</span>
                    <span className="text-[0.8125rem] text-sand-400/80">{entry.time}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 inline-flex items-center gap-2 text-[0.875rem] text-turmeric-300 transition hover:text-turmeric-200"
              >
                <Icon.mail className="h-4 w-4" aria-hidden />
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.8125rem] text-sand-400/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}
            <span className="mx-2 text-sand-400/40" aria-hidden>
              ·
            </span>
            Website by Brand Fables
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-sand-100">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="transition hover:text-sand-100">
              Terms of Use
            </Link>
            <Link href="/sitemap.xml" className="transition hover:text-sand-100">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
