import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';

import { FloatingActions } from '@/components/layout/FloatingActions';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { media } from '@/lib/media';
import { contact, site } from '@/lib/site';

import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.city} — Authentic Ayurvedic Care Since ${site.established}`,
    template: `%s | ${site.name}, ${site.city}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Ayurveda hospital Mysuru',
    'Panchakarma treatment Mysuru',
    'JSS Ayurveda Hospital',
    'Ayurvedic treatment Karnataka',
    'NABH accredited Ayurveda hospital',
    'Ayurvedic doctors Mysuru',
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name}, ${site.city}`,
    description: site.description,
    images: [{ url: media.campusFront, width: 1172, height: 497, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.city}`,
    description: site.description,
    images: [media.campusFront],
  },
  icons: { icon: media.favicon, apple: media.favicon },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#123529',
  colorScheme: 'light',
};

/** Schema.org record so search engines can surface hours, address and phone. */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: media.logo,
  image: media.campusFront,
  description: site.description,
  telephone: contact.phones[0].display,
  email: contact.email,
  foundingDate: String(site.established),
  medicalSpecialty: 'Ayurvedic Medicine',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 41/E, Lalithadripura Road, Alanahalli',
    addressLocality: 'Mysuru',
    addressRegion: 'Karnataka',
    postalCode: '570028',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '16:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'JSS Mahavidyapeetha',
    url: 'https://jssonline.org',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-jade-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-sand-50"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />

        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
