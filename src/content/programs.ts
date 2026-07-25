import { media } from '@/lib/media';

/**
 * Wellness programs and tariffs, transcribed from the WordPress
 * "Wellness Packages" and "Pricing Plan" pages.
 *
 * Tariffs are the numbers published on the source site. They are held in one
 * place so a price revision is a single-file edit — or an ACF repeater later.
 */

export const wardTypes = ['Standard Ward', 'Special Ward', 'Deluxe Ward', 'Ultra Deluxe'] as const;
export type WardType = (typeof wardTypes)[number];

export type Tariff = {
  ward: WardType;
  /** Price in ₹ keyed by duration in days. */
  prices: Record<number, number>;
};

export type WellnessProgram = {
  slug: string;
  name: string;
  duration: string;
  durationsInDays: number[];
  description: string;
  includes: string[];
  tariffs?: Tariff[];
  idealFor?: string[];
  image: string;
  featured?: boolean;
};

export const wellnessPrograms: WellnessProgram[] = [
  {
    slug: 'panchakarma',
    name: 'Panchakarma Detoxification',
    duration: '5 / 7 / 14 days',
    durationsInDays: [5, 7, 14],
    description:
      'Panchakarma is the most comprehensive Ayurvedic healing experience available. Over 5 to 14 days, this program removes accumulated toxins from your tissues, restores the balance of Vata, Pitta and Kapha and leaves your body completely renewed at a cellular level.',
    includes: [
      'Doctor consultation to monitor progress',
      'Snehapana (medicated ghee intake)',
      'Abhyanga (full-body oil massage)',
      'Virechana or Basti as prescribed',
      'Oral herbal medications',
      'Personalised Ayurvedic diet',
      'Optional yoga, pranayama and meditation',
    ],
    tariffs: [
      { ward: 'Standard Ward', prices: { 5: 21000, 7: 29400, 14: 58800 } },
      { ward: 'Special Ward', prices: { 5: 24500, 7: 34300, 14: 68600 } },
      { ward: 'Deluxe Ward', prices: { 5: 26000, 7: 36400, 14: 72800 } },
      { ward: 'Ultra Deluxe', prices: { 5: 27000, 7: 37800, 14: 75600 } },
    ],
    image: media.panchakarma,
    featured: true,
  },
  {
    slug: 'rasayana',
    name: 'Rasayana Rejuvenation Therapy',
    duration: '5 / 7 / 14 days',
    durationsInDays: [5, 7, 14],
    description:
      'Rasayana is the Ayurvedic science of rebuilding — nourishing every cell, reversing ageing and strengthening immunity.',
    includes: [
      'Vaidya consultation',
      'Snehapana, Abhyanga, Shirodhara',
      'Basti',
      'Yoga Nidra',
      'Herbal medication & Ayurvedic diet',
      'Yoga and meditation',
    ],
    tariffs: [
      { ward: 'Standard Ward', prices: { 5: 21250, 7: 29750, 14: 59500 } },
      { ward: 'Special Ward', prices: { 5: 22500, 7: 31500, 14: 63000 } },
      { ward: 'Deluxe Ward', prices: { 5: 23000, 7: 32200, 14: 64400 } },
      { ward: 'Ultra Deluxe', prices: { 5: 24500, 7: 34300, 14: 68600 } },
    ],
    image: media.shirodhara,
    featured: true,
  },
  {
    slug: 'stress-management',
    name: 'Stress Management',
    duration: 'Minimum 3 / 5 / 7 / 14 days',
    durationsInDays: [5, 7, 14],
    description:
      'Designed to unwind the nervous system using therapies like Shirodhara and Yoga Nidra to restore calm and resilience.',
    includes: [
      'Abhyanga (45 min)',
      'Shirodhara (45 min)',
      'Talam or Pichu',
      'Steam bath',
      'Yoga Nidra & pranayama',
      'Ayurvedic diet',
    ],
    tariffs: [
      { ward: 'Standard Ward', prices: { 5: 21750, 7: 30450, 14: 60900 } },
      { ward: 'Special Ward', prices: { 5: 25500, 7: 35700, 14: 71400 } },
      { ward: 'Deluxe Ward', prices: { 5: 27500, 7: 38500, 14: 77000 } },
      { ward: 'Ultra Deluxe', prices: { 5: 28500, 7: 39900, 14: 79800 } },
    ],
    image: media.spaRelax,
    featured: true,
  },
  {
    slug: 'vasantha-vamana',
    name: 'Vasantha Vamana (Seasonal Cleanse)',
    duration: 'As prescribed — typically 5–7 days',
    durationsInDays: [5, 7],
    description:
      'Seasonal Ayurvedic cleanse to eliminate excess Kapha and improve respiratory and digestive health.',
    includes: [
      'Preparatory Snehapana and Swedana',
      'Supervised Vamana procedure',
      'Post-procedure diet regimen (Samsarjana Krama)',
      'Herbal medication',
    ],
    idealFor: ['Respiratory conditions', 'Chronic allergies', 'Skin diseases', 'Kapha body types'],
    image: media.herbs,
  },
  {
    slug: 'migraine-relief',
    name: 'Migraine Relief Program',
    duration: 'Typically 7–14 days',
    durationsInDays: [7, 14],
    description:
      'Addresses root causes of migraines using Nasya, Shirodhara and personalised herbal treatment.',
    includes: ['Nasya therapy', 'Shirodhara', 'Thalam', 'Personalised herbal medication', 'Diet and lifestyle plan'],
    image: media.shirodharaVessel,
  },
];

export const additionalPrograms = [
  { name: 'Anti-Obesity Camp', body: 'Udwarthana, personalised diet and daily yoga.' },
  { name: 'Leech Therapy', body: 'Blood purification and management of skin conditions.' },
  { name: 'Rejuvenate 24', body: 'A complete 1-day wellness program.' },
  { name: 'Rejuvenate 48', body: 'A complete 2-day wellness program.' },
] as const;

export const pricingTiers = [
  {
    name: 'Rejuvenate',
    subtitle: 'Rejuvenate 24: 1 day  ·  Rejuvenate 48: 2 days',
    price: '₹5,500',
    unit: 'per day',
    features: [
      'Doctor consultation (15 min) + Prakruti analysis (30 min)',
      'Abhyanga & Swedana (45 min)',
      'Dhara therapy (45 min)',
      'Optional beauty therapy (30 min)',
      '1-hour yoga session with a trained guru',
      'Accommodation with breakfast, lunch and dinner',
    ],
    featured: false,
  },
  {
    name: 'Panchakarma / Rasayana',
    subtitle: '5 days · 7 days · 14 days',
    price: '₹21,000',
    unit: 'from — Standard Ward, 5 days',
    features: [
      'Daily doctor consultation + health monitoring',
      'Panchakarma therapies: Snehapana, Abhyanga, Virechana/Basti as prescribed',
      'Personalised herbal medicines (classical formulations)',
      'Personalised Ayurvedic diet — all meals',
      'Yoga and pranayama sessions',
      'Accommodation: Standard / Special / Deluxe / Ultra Deluxe',
    ],
    featured: true,
  },
  {
    name: 'Stress Management',
    subtitle: 'Minimum 3 days · 5 / 7 / 14 days',
    price: '₹21,750',
    unit: 'from — per program',
    features: [
      'Abhyanga & Shirodhara sessions (45 min each)',
      'Talam or Pichu therapy',
      'Herbal steam bath',
      'Yoga Nidra & pranayama sessions',
      'Personalised Ayurvedic diet — all meals',
      'Accommodation across all ward types',
    ],
    featured: false,
  },
] as const;

export const pricingNote =
  'All tariffs include accommodation, all meals, daily doctor consultations, prescribed therapies and herbal medicines. Health insurance reimbursement documentation is provided on request. Room types range from Standard Ward to Ultra Deluxe — all on our serene 15-acre campus.';
