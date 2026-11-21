import type { IconName } from '@/components/ui/Icons';
import { photo } from '@/lib/media';

/** Accommodation options, from the WordPress "Facilities & Rooms" page. */
export const rooms = [
  {
    slug: 'general-ward',
    name: 'General Ward',
    body: 'Spacious, naturally lit rooms with suction connection, bedside locker and shared washroom. Comfortable and affordable.',
    features: ['Natural light', 'Bedside locker', 'Suction connection', 'Shared washroom'],
    imageSlot: 'room-general',
  },
  {
    slug: 'semi-special-ward',
    name: 'Semi-Special Ward',
    body: '2+2 bed rooms with attached washroom, natural light, bedside locker and space for one attendant.',
    features: ['Attached Washroom', 'Natural light', 'Bedside locker', 'Space for one attendant'],
    imageSlot: 'room-semi-special',
  },
  {
    slug: 'special-ward',
    name: 'Special Ward',
    body: 'Single-occupancy private room, conveniently located close to the treatment area.',
    features: ['Single occupancy', 'Private washroom', 'Close to therapy wing', 'Attendant seating'],
    imageSlot: 'room-special',
  },
  {
    slug: 'ultra-deluxe',
    name: 'Ultra Deluxe',
    body: 'Wide single-occupancy room with TV, AC, natural light and a view of the Chamundi Hills. Adjacent to the treatment area.',
    features: ['Maximum privacy', 'Premium furnishing', 'Sitting area', 'Garden outlook'],
    imageSlot: 'room-ultra-deluxe',
  },
] as const;

export const campusFacilities = [
  {
    title: '26 Dedicated Therapy Rooms',
    body: 'Separate wings for male and female patients. Each room is hygienically maintained and fitted with specially designed massage tables and steam chambers. Therapies are performed only by trained therapists under medical supervision.',
    icon: 'drop' as IconName,
    stat: '26',
    statLabel: 'therapy rooms',
  },
  {
    title: 'Daily Yoga Hall and Yoga Garden',
    body: 'Group yoga sessions are held twice daily — at 11:30 AM and 3:30 PM — conducted by trained yoga gurus. Individual yoga sessions are available on request. Yoga is an integral part of every healing program at JSS.',
    icon: 'sun' as IconName,
    stat: '2×',
    statLabel: 'sessions daily',
  },
  {
    title: '15-Acre Herbal Garden — 300+ Species',
    body: 'Our herbal garden is one of the most extensive medicinal plant collections in Karnataka. Over 300 species of Ayurvedic herbs are grown, maintained and irrigated with treated water. Most herbs used in your treatments and medicines come directly from this garden.',
    icon: 'leaf' as IconName,
    stat: '300+',
    statLabel: 'herb species',
  },
] as const;

export const additionalFacilities = [
  'In-House Pharmacy',
  'Clinical Laboratory — haematology & biochemistry',
  'ECG',
  'X-Ray and Radiology',
  'Two Operation Theatres',
  'Sathwa — Ayurvedic satvik kitchen',
  'Wi-Fi across the campus',
  'Health insurance — cashless with ICICI Lombard, reimbursement with others',
] as const;

/**
 * Clinical care units, shown as photographs with a caption. The hospital asked
 * for photos only; add a `body` here if they later send details (services,
 * hours, beds).
 */
export const careUnits = [
  { title: 'ECG', image: photo.unitEcg, alt: 'The ECG machine and electrode leads on its trolley' },
  { title: 'Casualty', image: photo.unitCasualty, alt: 'The casualty ward with electric beds and an emergency trolley' },
  { title: 'Newborn care', image: photo.unitNewbornCare, alt: 'An infant warmer, newborn cot and baby weighing scale in the newborn care area' },
] as const;

export const campusIntro = {
  eyebrow: 'The Campus',
  title: 'A sanctuary, not just a hospital',
  body: 'Our 15-acre campus at the foothills of the Chamundi Hills is more than just a hospital — it is a sanctuary. Lush greenery, a thriving herbal garden, clean fresh air, the sound of nature and the quiet of the foothills all become part of your healing process. Patients frequently tell us that the environment itself begins to heal them before the therapies even start.',
} as const;

/**
 * In-house laboratory tests, as listed in the hospital's published scope of
 * services. Update the lists here when the laboratory adds or drops a test.
 */
export const laboratory = {
  intro:
    'Our in-house clinical laboratory runs routine blood investigations on campus, so your doctor has results quickly and you do not need to travel for tests during your treatment.',
  groups: [
    {
      title: 'Haematology',
      tests: [
        'HB%', 'TC', 'DC', 'ESR', 'PCV', 'MCV', 'MCH', 'MCHC', 'RBC count', 'Platelets',
        'Bleeding time (BT)', 'Clotting time (CT)', 'Blood grouping', 'Rh typing',
      ],
    },
    {
      title: 'Biochemistry',
      tests: [
        'Blood glucose', 'HbA1c', 'OGCT', 'GTT', 'Urea', 'Creatinine', 'Uric acid',
        'Total & direct bilirubin', 'Total protein', 'Albumin', 'Globulin', 'A/G ratio',
        'ALT', 'AST', 'ALP', 'GGT', 'Total cholesterol', 'HDL', 'LDL', 'VLDL', 'Triglycerides',
      ],
    },
    {
      title: 'Clinical Pathology',
      tests: [
        'Urine routine', 'Bile salt', 'Bile pigment', 'Urobilinogen', 'Albumin', 'Sugar', 'Microscopy',
      ],
    },
    {
      title: 'Serology',
      tests: ['HIV (card)', 'HBsAg (card)', 'RA', 'CRP'],
    },
    {
      title: 'Packages',
      tests: ['LFT', 'Lipid profile', 'CBC'],
    },
  ],
} as const;
