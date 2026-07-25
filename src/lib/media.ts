/**
 * Named references to real images already in the WordPress media library.
 *
 * Images are served straight from the WordPress uploads folder and optimised by
 * next/image, so replacing a photo in WordPress replaces it on the site — no
 * redeploy. Only the *mapping* of image → slot lives here.
 */

import { WP_URL } from './wp/client';

const upload = (path: string) => `${WP_URL}/wp-content/uploads/${path}`;

export const media = {
  // Identity
  logo: upload('2026/03/JSS_Ayurveda_hospital_Mysuru_logo3.webp'),
  logoWhite: upload('2026/03/JSS_Ayurveda_hospital_Mysuru_logo3-white.webp'),
  nabh: upload('2026/07/nabh-accredited-logo.webp'),
  hospitalMark: upload('2026/07/jssah-logo.webp'),
  favicon: upload('2026/03/cropped-site-icon.webp'),

  // Campus
  campusFront: upload('2026/07/jssamch-front-view.webp'),
  campusGarden: upload('2026/07/jss-campus-garden.webp'),
  campusWide: upload('2026/07/JSSAMCH_Infrastrure_1.webp'),
  campusBuilding: upload('2026/07/JSSAMCH_Infrastrure_2.webp'),
  campusInterior: upload('2026/07/JSSAMCH_Infrastrure_3.webp'),
  campusReception: upload('2026/07/JSSAMCH_Infrastrure_4.webp'),
  campusWard: upload('2026/07/JSSAMCH_Infrastrure_5.webp'),
  campusTherapy: upload('2026/07/JSSAMCH_Infrastrure_6.webp'),
  environment1: upload('2026/07/JSSAMCH-Enchanting-Environment-img1.webp'),
  environment2: upload('2026/07/JSSAMCH-Enchanting-Environment-img2.webp'),
  environment3: upload('2026/07/JSSAMCH-Enchanting-Environment-img3.webp'),
  environment6: upload('2026/07/JSSAMCH-Enchanting-Environment-img6.webp'),
  garden1: upload('2026/07/Garden-image1.webp'),
  garden2: upload('2026/07/Garden-image2.webp'),
  garden4: upload('2026/07/Garden-image4.webp'),
  garden8: upload('2026/07/Garden-image8.webp'),

  // Therapy & treatment
  panchakarma: upload('2026/07/JSS-Ayurveda.panchakarma.webp'),
  faceMassage: upload('2026/03/ayurveda-face-massage.webp'),
  backMassage: upload('2026/03/woman-having-a-back-oil-massage.webp'),
  shirodhara: upload('2026/03/caucasian-woman-having-ayurveda-shirodhara-treatment-in-india.webp'),
  shirodharaVessel: upload('2026/03/relaxed-young-woman-lying-under-shirodhara-vessel-during-ayurvedic-procedure.webp'),
  neckTreatment: upload('2026/03/ayurvedic-neck-treatment.webp'),
  stomachMassage: upload('2026/03/ayurveda-stomach-massage.webp'),
  herbalCompress: upload('2026/03/close-up-of-woman-receiving-thai-herbal-compress-massage-at-the-spa-.webp'),
  spaRelax: upload('2026/03/serene-bearded-man-relaxing-in-thai-spa.webp'),
  yoga: upload('2026/03/yoga-position.webp'),

  // Herbs & medicine
  chyawanprash: upload('2026/03/ayurvedic-chyawanprash-or-chyavanprash-1.webp'),
  turmericRoot: upload('2026/03/turmeric-powder-and-curcuma-root-2.webp'),
  turmericWide: upload('2026/03/turmeric-powder-and-curcuma-root-e1682947169292.webp'),
  fenugreek: upload('2026/03/kasoori-methi-or-dried-fenugreek-leaves.webp'),
  goldenMilk: upload('2026/03/healthy-vegan-turmeric-latte-or-golden-milk-turmeric-root-ginger-powder-black-pepper-over-grey.webp'),
  herbs: upload('2026/03/nasturtium-in-herbal-medicine-homeopathic-herbs.webp'),
  oils: upload('2026/03/concept-of-natural-essential-organic-oils-bali-spa-beauty-treatment-relax-time-atmosphere-of.webp'),
  oilsAlt: upload('2026/03/concept-of-natural-essential-organic-oils-bali-spa-beauty-treatment-relax-time-atmosphere-of-1.webp'),
  spices: upload('2026/03/fresh-ginger-garlic-onion-and-tomato-puree.webp'),
  spaAccessories: upload('2026/03/spa-accessories-grey-background-1.webp'),
  greenery: upload('2026/03/galium-aparine-cleavers-clivers-goosegrass-catchweed-stickyweed-robin-run-the-hedge-sticky.webp'),
  palms: upload('2026/03/beautiful-palms-black-with-copyspace.webp'),

  // Institution
  founders: upload('2026/07/jss-mahavidyapeetha-founders.webp'),
  visionMission: upload('2026/07/vission-mission-new-banner.webp'),
  nabhBanner: upload('2026/07/JSS_NAHB.webp'),
} as const;

export type MediaKey = keyof typeof media;

/* -------------------------------------------------------------------------- */
/* Archive photography from jssamch.org                                       */
/* -------------------------------------------------------------------------- */

const jssamch = (path: string) => `https://jssamch.org/wp-content/uploads/${path}`;

/**
 * Genuine photographs of the hospital, sourced from the institution's
 * long-running site jssamch.org (same organisation, same campus).
 *
 * These are real rooms, real therapies and real staff — they replace AI
 * placeholders in the slots where the subject matches exactly. Each entry was
 * opened and checked before being mapped, and every URL was verified to return
 * 200. jssamch.org is allowlisted for next/image in next.config.ts.
 *
 * If these ever need to live on the primary CMS, re-upload them to the
 * Cloudways WordPress media library and move the entries into `media` above.
 */
export const archive = {
  /** Abhyanga — therapist performing a full-body oil massage on a Droni. */
  therapyAbhyanga: jssamch('2016/08/jssamch_g7-22.jpg'),
  /** Patra Pinda Sweda (Kizhi) — warm herbal bolus massage. */
  therapyKizhi: jssamch('2016/08/jssamch_g7-89.jpg'),
  /** Udwarthana — herbal powder therapy. */
  therapyUdwarthana: jssamch('2016/08/jssamch_g7-90-1.jpg'),
  /** Nasya — medicated nasal administration. */
  therapyNasya: jssamch('2016/08/jssamch_g7-81.jpg'),

  /** Consultant and nurse reviewing an in-patient on the ward. */
  wardRound: jssamch('2016/08/jssamch_g7-5.jpg'),
  /** Consultant greeting an in-patient. */
  doctorPatient: jssamch('2016/08/jssamch_g7-6.jpg'),
  /** Nursing station with staff on duty. */
  nursingStation: jssamch('2016/08/jssamch_g7-71.jpg'),

  /** Deluxe room — air conditioning, television, wardrobe. */
  roomDeluxe: jssamch('2016/08/jssamch_g7-3.jpg'),
  /** Ultra deluxe suite — bedroom plus a seating area. */
  roomUltraDeluxe: jssamch('2016/08/jssamch_g7-2.jpg'),

  /** The in-house pharmacy counter. */
  pharmacyCounter: jssamch('2016/08/jssamch_g7-9.jpg'),
  /** Main lobby atrium with the ceremonial lamp. */
  lobby: jssamch('2016/08/jssamch_g7-11.jpg'),
  /** Reception desk, carved in wood with the hospital name in Kannada. */
  reception: jssamch('2016/08/jssamch_g7-29.jpg'),
  /** Front-office reception hall. */
  receptionHall: jssamch('2016/08/jssamch_g7-14.jpg'),

  /** Doctors and students studying plants in the campus herbal garden. */
  herbalGarden: jssamch('2018/02/JSS-Ayurveda.garden.jpg'),
  /** International Day of Yoga 2025 — mass yoga session on campus. */
  yogaDay: jssamch(
    '2025/06/International-Day-of-Yoga-IDY-2025-YOGA-SANGAM-%E2%80%93-a-special-yoga-program-was-successfully-conducted-by-JSS-Ayurveda-Medical-College-Hospital-9.jpg',
  ),
} as const;
