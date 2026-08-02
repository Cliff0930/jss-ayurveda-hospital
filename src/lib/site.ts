/**
 * Global site configuration: identity, contact details and navigation.
 *
 * Contact details are sourced from the live sites:
 *   - https://wordpress-1420178-6266636.cloudwaysapps.com/contact/
 *   - https://jssamch.org/contact-us/
 *
 * Everything here is intentionally static (it changes maybe once a year). If
 * the hospital later wants to edit it from WordPress, move it into an ACF
 * Options page and swap this object for `getSiteSettings()` in lib/wp/queries.
 */

export const site = {
  name: 'JSS Ayurveda Hospital',
  legalName: 'JSS Ayurveda Medical College & Hospital',
  shortName: 'JSS Ayurveda',
  city: 'Mysuru',
  tagline: 'Foundation for Good Health',
  motto: 'Broad Spectrum — Holistic Approach',
  established: 1992,
  description:
    'JSS Ayurveda Hospital, Mysuru — where 5,000 years of Ayurvedic wisdom meets compassionate, personalised healing. NABH accredited, trusted since 1992.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jssayurvedahospital.org',
} as const;

export const contact = {
  addressLines: ['No. 41/E, Lalithadripura Road', 'Alanahalli, Mysuru – 570028', 'Karnataka, India'],
  addressOneLine: 'No. 41/E, Lalithadripura Road, Alanahalli, Mysuru – 570028',
  phones: [
    { label: 'Reception', display: '0821-2548231', href: 'tel:+918212548231' },
    { label: 'Enquiries', display: '0821-2548298', href: 'tel:+918212548298' },
  ],
  mobiles: [{ label: 'Hospital', display: '+91 91487 59349', href: 'tel:+919148759349' }],
  email: 'contact@jssamch.org',
  whatsapp: 'https://wa.me/919148759349',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=JSS+Ayurveda+Medical+College+and+Hospital+Alanahalli+Mysuru',
  mapsEmbed:
    'https://www.google.com/maps?q=JSS%20Ayurveda%20Medical%20College%20and%20Hospital%2C%20Lalithadripura%20Road%2C%20Alanahalli%2C%20Mysuru%20570028&output=embed',
  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 4:30 PM', note: 'OPD consultation' },
    { days: 'Sunday & Govt. holidays', time: '9:00 AM – 1:00 PM', note: 'OPD consultation' },
    { days: 'All days', time: '24 × 7', note: 'Duty doctors & in-patient care' },
  ],
} as const;

export const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/JSSAMCH/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com/jssayurvedahospital', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCCelKf58krIBVPcJKoL1Ybg', icon: 'youtube' },
] as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

/**
 * Main navigation.
 *
 * Transparency (staff / attendance / waste) and FAQs are deliberately absent —
 * they are reference material rather than things a prospective patient browses
 * for, so they live in the footer only. The slots they used to occupy now carry
 * Treatments and Speciality Clinics, which were previously buried one level
 * down inside the old "Care" dropdown.
 */
export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About the Hospital', href: '/about', description: 'Our story, campus and philosophy' },
      { label: 'JSS Mahavidyapeetha', href: '/about/jss-mahavidyapeetha', description: 'The parent institution, since 1954' },
      { label: 'Our Doctors', href: '/doctors', description: '44 consultants across 12 departments' },
      { label: 'Our Staff', href: '/staff', description: 'The full hospital team' },
      { label: 'Facilities & Rooms', href: '/facilities', description: 'Wards, therapy rooms and campus' },
      { label: 'JSS Ayur Pharma', href: '/ayur-pharma', description: 'In-house Ayur-drug manufacturing' },
      { label: 'Gallery', href: '/gallery', description: 'Campus, gardens, events and outreach' },
    ],
  },
  { label: 'OPD & Departments', href: '/opd' },
  { label: 'Physiotherapy', href: '/physiotherapy' },
  {
    label: 'Packages',
    href: '/wellness-packages',
    children: [
      { label: 'Wellness Packages', href: '/wellness-packages', description: 'Panchakarma, Rasayana and more' },
      { label: 'Pricing Plans', href: '/pricing', description: 'Transparent, all-inclusive tariffs' },
    ],
  },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Speciality Clinics', href: '/specialities' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    title: 'Hospital',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'JSS Mahavidyapeetha', href: '/about/jss-mahavidyapeetha' },
      { label: 'Our Doctors', href: '/doctors' },
      { label: 'Our Staff', href: '/staff' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Treatment',
    links: [
      { label: 'OPD & Departments', href: '/opd' },
      { label: 'Speciality Clinics', href: '/specialities' },
      { label: 'Treatments', href: '/treatments' },
      { label: 'Facilities & Rooms', href: '/facilities' },
      { label: 'Physiotherapy', href: '/physiotherapy' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Wellness Packages', href: '/wellness-packages' },
      { label: 'Department Packages', href: '/packages' },
      { label: 'Pricing Plans', href: '/pricing' },
      { label: 'Our Products', href: '/products' },
      { label: 'JSS Ayur Pharma', href: '/ayur-pharma' },
    ],
  },
  /*
    Transparency and FAQs are reachable from here only — they were taken out of
    the main menu, so this group is now their sole entry point in the chrome.
  */
  {
    title: 'Transparency',
    links: [
      { label: 'Staff Directory', href: '/staff' },
      { label: 'Attendance Analysis', href: '/attendance-analysis' },
      { label: 'Bio-Medical Waste Data', href: '/waste-data' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
    ],
  },
] as const;
