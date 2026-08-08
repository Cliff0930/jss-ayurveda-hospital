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
/* Client-supplied photography (August 2026)                                  */
/* -------------------------------------------------------------------------- */

/**
 * Photographs delivered by the client's designer against the reference numbers
 * in JSS-Website-Image-Specification.pdf, shot or sourced at the exact size the
 * brief asked for.
 *
 * These are served from `public/photos/` rather than WordPress: they arrived as
 * files, not as media-library uploads, and shipping them with the build keeps
 * the size guarantee intact. If they are later uploaded to WordPress, move the
 * entries into `media` above and delete the files — nothing else changes.
 *
 * The key is the placement; the comment is the spec reference.
 */
const photoFile = (name: string) => `/photos/${name}`;

export const photo = {
  /** H-01 — homepage hero slider, seven slides in order. */
  heroHospitalFront: photoFile('h-01-1-hospital-front.webp'),
  heroCampus: photoFile('h-01-2-campus.webp'),
  heroCollegeBlock: photoFile('h-01-3-college-block.webp'),
  heroWardRound: photoFile('h-01-4-ward-round.webp'),
  heroAbhyanga: photoFile('h-01-5-abhyanga.webp'),
  heroEyeClinic: photoFile('h-01-6-eye-clinic.webp'),
  heroShirodhara: photoFile('h-01-7-shirodhara.webp'),

  /** H-08 — "Why Choose Us" panel, right column. */
  whyChooseUs: photoFile('h-08-why-choose-us.webp'),
  /** H-11 — consultation, used by the homepage process steps and the FAQs banner. */
  consultation: photoFile('h-11-consultation.webp'),

  /** A-01 / A-02 / A-03 — About Us. */
  aboutBanner: photoFile('a-01-about-banner.webp'),
  campusPortrait: photoFile('a-02-campus-portrait.webp'),
  campusAerial: photoFile('a-03-campus-aerial.webp'),

  /** A-06 / A-07 — JSS Mahavidyapeetha. */
  legacyBanner: photoFile('a-06-legacy-banner.webp'),
  founders: photoFile('a-07-founders.webp'),

  /** A-10 / A-11 / A-12 — JSS Ayur Pharma. */
  ayurPharmaBanner: photoFile('a-10-ayur-pharma-banner.webp'),
  pharmacyUnit: photoFile('a-11-pharmacy-unit.webp'),
  ingredients1: photoFile('a-12-ingredients-1.webp'),
  ingredients2: photoFile('a-12-ingredients-2.webp'),
  ingredients3: photoFile('a-12-ingredients-3.webp'),

  /** A-14 / A-15 — Physiotherapy. */
  physiotherapyBanner: photoFile('a-14-physiotherapy-banner.webp'),
  physiotherapyBand: photoFile('a-15-physiotherapy-band.webp'),

  /** O-01 / O-02 — OPD & Departments. */
  opdBanner: photoFile('o-01-opd-banner.webp'),
  opdPortrait: photoFile('o-02-consultation-portrait.webp'),

  /** S-01 — Speciality Clinics (also the Our Doctors banner). */
  specialitiesBanner: photoFile('s-01-specialities-banner.webp'),

  /** T-01 / T-04 — Treatments. */
  treatmentsBanner: photoFile('t-01-treatments-banner.webp'),
  panchakarmaBand: photoFile('t-04-panchakarma-band.webp'),

  /** Y-01 — Gallery banner. */
  galleryBanner: photoFile('y-01-gallery-banner.jpg'),

  /** X-01 — Transparency banner, shared by Staff, Attendance and Waste data. */
  transparencyBanner: photoFile('x-01-transparency-banner.webp'),

  /**
   * Poster frames for the video testimonials, pulled from the clips themselves
   * so the card matches the first thing the viewer sees on play. Vertical 9:16
   * to match the footage. Re-grab these if a clip is re-edited.
   */
  storyAbhishek: photoFile('story-abhishek-jain.webp'),
  storyBaby: photoFile('story-baby.webp'),
  storySrinivas: photoFile('story-srinivas.webp'),
  storyTpSingh: photoFile('story-tp-singh.webp'),
} as const;

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
