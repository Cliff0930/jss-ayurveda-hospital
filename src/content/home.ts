import { media, photo } from '@/lib/media';
import type { IconName } from '@/components/ui/Icons';

/**
 * Homepage copy, transcribed from the live WordPress site.
 *
 * These are presentational blocks rather than records, so they live in code.
 * To make any of them editable from WordPress later, create the matching ACF
 * field group on the `home` page and read it with `getPageAcf('home')` — the
 * shapes below are the contract to match.
 */

export const hero = {
  eyebrow: `Trusted since 1992 · NABH Accredited`,
  title: 'An Ancient Key For Total Wellbeing',
  intro:
    'Trusted since 1992 by more than 25 lakh patients from India and across the world — JSS Ayurveda Hospital, Mysuru, where 5,000 years of Ayurvedic wisdom meets compassionate, personalised healing with 100% authentic Ayurvedic medicines.',
  primary: { label: 'Book a Consultation', href: '/contact' },
  secondary: { label: 'Insurance', href: '/#insurance' },
} as const;

/**
 * Hero slider — spec ref H-01. Four of the seven delivered slides; the campus,
 * ward-round and eye-clinic photos were dropped at the client's request.
 *
 * The photographs are the client-supplied set in `public/photos/`, kept in the
 * order they were delivered. Each caption describes the photograph above it, so
 * re-ordering or swapping a slide means re-checking the caption with it.
 */
export const heroSlides = [
  {
    image: photo.heroHospitalFront,
    title: 'Our Mysuru campus',
    caption: '15 green acres at the foothills of the Chamundi Hills',
  },
  {
    image: photo.heroCollegeBlock,
    title: 'Built for healing',
    caption: 'NABH-accredited infrastructure across the hospital',
  },
  {
    image: photo.heroAbhyanga,
    title: 'Abhyanga, performed the classical way',
    caption: 'Trained therapists working on a traditional wooden Droni',
  },
  {
    image: photo.heroShirodhara,
    title: '26 dedicated therapy rooms',
    caption: 'Classical Panchakarma under direct medical supervision',
  },
] as const;

export const trustPoints = [
  {
    title: '100% Authentic Ayurvedic Medicines',
    body: 'Classical formulations prepared from herbs grown in our own on-campus garden.',
    icon: 'leaf' as IconName,
  },
  {
    title: 'NABH Accredited Hospital',
    body: 'Recognised for quality and patient safety standards.',
    icon: 'shield' as IconName,
  },
  {
    title: 'In-House Medicine Preparation',
    body: 'Authentic formulations made from hand-picked, high-quality herbs in our own GMP-certified pharmacy.',
    icon: 'mortar' as IconName,
  },
  {
    title: '30+ Years of Trusted Care',
    body: 'Serving patients from India, USA, Europe and beyond.',
    icon: 'heart' as IconName,
  },
] as const;

export const achievements = [
  { value: 100, suffix: '%', label: 'Authentic Ayurvedic Medicines', detail: 'Prepared in our own unit' },
  { value: 25, suffix: ' Lakhs+', label: 'Happy Patients', detail: 'Treated since 1992' },
  { value: 33, suffix: '+', label: 'Years of Experience', detail: 'Started in August 1992' },
  { value: 44, suffix: '', label: 'Qualified Doctors', detail: 'BAMS, MD & MS consultants' },
] as const;

export const services = [
  {
    title: 'Doctor Consultation',
    body: 'Every healing journey begins with a thorough Prakruti (body constitution) assessment. Our qualified doctors take time to understand your unique health condition before recommending any treatment.',
    icon: 'stethoscope' as IconName,
  },
  {
    title: 'Panchakarma Detoxification',
    body: 'The most powerful Ayurvedic purification therapy — removing accumulated toxins from deep within the tissues and restoring full balance of Vata, Pitta and Kapha. Customised for every patient.',
    icon: 'drop' as IconName,
  },
  {
    title: 'Rasayana Rejuvenation',
    body: 'Rebuild vitality, restore youthful energy and strengthen immunity through time-tested Rasayana therapies — tailored to your age, constitution and health goals.',
    icon: 'lotus' as IconName,
  },
  {
    title: 'Stress Management',
    body: 'A structured combination of Shirodhara, Abhyanga, Talam and Yoga Nidra — targeting the root cause of chronic stress and restoring nervous system balance.',
    icon: 'brain' as IconName,
  },
  {
    title: 'Yoga & Meditation',
    body: 'Daily yoga and pranayama sessions guided by trained gurus, available to all in-patients. Individual yoga sessions also available on request.',
    icon: 'sun' as IconName,
  },
  {
    title: 'Functional Medicine',
    body: 'A root-cause approach that pairs Ayurvedic diagnostics with modern health insights — correcting imbalances at their source instead of only managing symptoms.',
    icon: 'dna' as IconName,
  },
  {
    title: 'Weight Management',
    body: 'Natural, sustainable weight management through Udwarthana (herbal powder massage), personalised Ayurvedic diet, yoga and targeted Panchakarma therapies.',
    icon: 'scale' as IconName,
  },
  {
    title: 'Metabolic Balance',
    body: 'Rekindle healthy Agni — your digestive fire — through personalised diet, herbal formulations and lifestyle correction for steady weight, energy and hormonal balance.',
    icon: 'flame' as IconName,
  },
] as const;

export const whyUs = [
  {
    title: '100% Authentic Ayurvedic Medicines',
    body: 'All Churnas, Kashayams, Ghritams and Tailas are prepared in our in-house GMP-certified Ayur-Drug Manufacturing Unit, from hand-picked, high-quality herbs grown in our 15-acre herbal garden. Organic, authentic and quality-controlled.',
  },
  {
    title: 'Qualified Ayurvedic Doctors and Therapists',
    body: 'Our consultants hold BAMS or MD (Ayurveda) qualifications. Every therapy is supervised by them directly. Our therapists are trained in classical procedures and follow strict protocols.',
  },
  {
    title: 'Classical Formulations — Unchanged for Thousands of Years',
    body: 'Our medicines follow the exact formulations described in classical Ayurvedic texts — Charaka Samhita, Sushruta Samhita and Ashtanga Hridaya. Proven and time-tested.',
  },
] as const;

export const testimonials = [
  {
    quote:
      'The personalised care at JSS Ayurveda Hospital is unlike anything I have experienced. The doctors truly listen, the therapists are skilled, and the environment is deeply healing. I came feeling broken — I left feeling reborn.',
    name: 'Shalini Gupta',
    location: 'USA',
  },
  {
    quote:
      'I had been suffering from severe arthritis for years. After just 10 days of Panchakarma at JSS, I walked out feeling no pain at all. The doctors are genuinely caring and every therapy was done with great skill.',
    name: 'Nizam Hussain',
    location: 'Mysuru',
  },
  {
    quote:
      'I have visited JSS Ayurveda Hospital every year since 2017 for rejuvenation. The detox therapies here are unmatched. It truly feels like a second home.',
    name: 'Robert Iriza',
    location: 'Romania',
  },
] as const;

/**
 * Video testimonials — the "Watch Our Stories" section requested in the August
 * 2026 correction round.
 *
 * Each story plays from ONE of two sources, checked in this order:
 *
 *   youtubeId  — preferred. Paste the 11-character id from the watch URL
 *                (youtube.com/watch?v=THIS_PART). Unlisted videos work.
 *   src        — a file served by us, currently `public/videos/`.
 *
 * Setting `youtubeId` on a story silently retires its `src`, so moving the
 * videos to the hospital's YouTube channel later is one line per story and the
 * files under `public/videos/` can then be deleted.
 *
 * A story with neither source set is skipped, and the whole section disappears
 * if none of them can play — so a half-finished list never ships a broken card.
 *
 * The clips are vertical (9:16) and the layout depends on that; a landscape
 * clip added here would letterbox inside its card.
 */
export const videoStories = [
  {
    name: 'Abhishek Jain',
    context: 'In his own words',
    duration: '1:43',
    poster: photo.storyAbhishek,
    youtubeId: '',
    src: '/videos/story-abhishek-jain.mp4',
  },
  {
    name: 'A young patient',
    context: 'Told by her father',
    duration: '0:35',
    poster: photo.storyBaby,
    youtubeId: '',
    src: '/videos/story-baby.mp4',
  },
  {
    name: 'Srinivas',
    context: 'Patient of Dr. Netra B Hubballi',
    duration: '1:50',
    poster: photo.storySrinivas,
    youtubeId: '',
    src: '/videos/story-srinivas.mp4',
  },
  {
    name: 'T P Singh',
    context: 'In his own words',
    duration: '0:59',
    poster: photo.storyTpSingh,
    youtubeId: '',
    src: '/videos/story-tp-singh.mp4',
  },
] as const;

export type VideoStory = (typeof videoStories)[number];

export const programs = [
  {
    title: 'Panchakarma',
    duration: '5–14 Days',
    body: 'Complete purification of body and mind — removing accumulated toxins, restoring dosha balance and renewing every cell. The cornerstone of Ayurvedic healing.',
    image: media.panchakarma,
  },
  {
    title: 'Detoxification',
    duration: '5–14 Days',
    body: 'Targeted deep cleanse through Virechana, Basti and Abhyanga — eliminating deep-seated impurities from the digestive and lymphatic systems.',
    image: media.oils,
  },
  {
    title: 'Weight Loss',
    duration: '7–14 Days',
    body: 'Natural, lasting weight management through Udwarthana, Ayurvedic diet discipline, yoga and Panchakarma therapies.',
    image: media.yoga,
  },
  {
    title: 'Rejuvenation (Rasayana)',
    duration: '5–14 Days',
    body: 'Rebuild vitality and restore youthfulness through Rasayana therapies including Shirodhara, Snehapana and medicated oil treatments.',
    image: media.shirodhara,
  },
  {
    title: 'Stress Management',
    duration: 'Minimum 3 Days',
    body: 'A carefully structured program using Shirodhara, Abhyanga, Talam and Yoga Nidra to calm the nervous system and restore inner peace.',
    image: media.spaRelax,
  },
] as const;

export const process = [
  {
    step: '01',
    title: 'Consultation with our experts',
    body: 'Our doctors begin with a thorough Prakruti (body constitution) assessment — understanding the root cause of your concern and designing a completely personalised program.',
  },
  {
    step: '02',
    title: 'Get an appointment',
    body: 'Our team helps you plan your visit dates, choose the right program and arrange your accommodation, therapy schedule and dietary plan.',
  },
  {
    step: '03',
    title: 'Enjoy your healing',
    body: 'Relax and let Ayurveda do its work. Your therapies, meals, yoga and herbal medicines are all taken care of. Your doctor monitors your progress daily.',
  },
] as const;

export const philosophy = {
  eyebrow: 'Who We Are',
  title: 'The Natural Way to Achieving Balance and Optimal Health',
  body: [
    'JSS Ayurveda Hospital, Mysuru brings together highly qualified Ayurvedic doctors, authentic classical therapies and a serene healing campus — to address the root cause of your condition, not just the symptoms.',
    'We have been trusted by patients from across India and the world since 1992.',
  ],
  quote: 'We heal you — and we teach you how to stay healthy.',
} as const;

/**
 * NABH and insurance — placed directly under the hero at the hospital's request
 * so both are the first thing a patient reads.
 *
 * Insurance lists come from the hospital's own insurer and TPA boards. Cashless
 * is ICICI Lombard only; everything else is reimbursement. Insurers that have
 * since merged are listed under their current name (Apollo Munich → HDFC ERGO,
 * Bharti AXA → ICICI Lombard, Cigna TTK → ManipalCigna, Max Bupa → Niva Bupa,
 * Religare → Care Health).
 */
export const nabhHighlight = {
  title: 'NABH Accredited',
  body: 'Accredited by the National Accreditation Board for Hospitals & Healthcare Providers — the national standard for quality of care and patient safety in India.',
  points: [
    'Clinical care that follows documented, audited protocols',
    'Infection control and patient-safety standards across every ward',
    'Patient rights, consent and transparent billing',
  ],
} as const;

export const insuranceInfo = {
  title: 'Health Insurance Support',
  body: 'Cashless admission is available with ICICI Lombard. With every other insurer and TPA below, your treatment is covered by reimbursement — our team prepares every document you need for your claim.',
  cashless: 'ICICI Lombard',
  approval: 'Approved by CGHS and the State Government',
  points: [
    'Discharge summary and treatment records',
    'Itemised bills and receipts',
    'Help with your insurer’s claim forms',
  ],
  lists: [
    {
      title: 'Insurance companies',
      note: 'Reimbursement',
      items: [
        'Star Health', 'Future Generali', 'Bajaj Allianz', 'ManipalCigna', 'National Insurance',
        'IFFCO Tokio', 'New India Assurance', 'Oriental Insurance', 'Reliance General',
        'United India', 'Royal Sundaram', 'Tata AIG', 'Cholamandalam MS', 'HDFC ERGO',
        'Universal Sompo', 'SBI General', 'Raheja QBE', 'Niva Bupa', 'Care Health',
        'Liberty General', 'Shriram General', 'Magma HDI',
      ],
    },
    {
      title: 'TPAs',
      note: 'Reimbursement',
      items: [
        'Medi Assist', 'United Healthcare Parekh', 'E Meditek', 'MDIndia', 'Family Health Plan',
        'Focus Healthservices', 'Vidal Health', 'Heritage Health', 'Vipul MedCorp', 'Raksha',
        'Rothshield Healthcare', 'Dedicated Healthcare Services', 'Spurthi Meditech', 'Ericson',
        'Sri Gokulam Health Services', 'Safeway',
      ],
    },
    {
      title: 'Corporate tie-ups',
      note: null,
      items: ['Karnataka Power Transmission Corporation Ltd (KPTCL)', 'Rare Material Project (RMP)'],
    },
  ],
  note: 'Please check your policy’s cover for Ayurvedic hospitalisation with your insurer before admission — our team will guide you.',
} as const;

/** The three ways to consult a doctor, shown on the homepage and Contact page. */
export const consultOptions = [
  {
    key: 'direct',
    title: 'Direct consultation',
    body: 'Walk in to the OPD — no appointment needed for a general consultation.',
    detail: 'Mon – Sat 8:00 AM – 4:30 PM · Sun & holidays 9:00 AM – 1:00 PM',
    icon: 'stethoscope' as IconName,
  },
  {
    key: 'online',
    title: 'Online consultation',
    body: 'Consult our doctors from home by audio call. Call us to book and we will allot a doctor and a time slot.',
    detail: '₹550 · Call +91 91487 59349 or 0821-2548231',
    icon: 'phone' as IconName,
  },
  {
    key: 'email',
    title: 'Email enquiries',
    body: 'Send your reports and questions — our team replies within one working day.',
    detail: 'contact@jssamch.org',
    icon: 'mail' as IconName,
  },
] as const;
