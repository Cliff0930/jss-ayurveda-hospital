import { archive, media } from '@/lib/media';
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
  eyebrow: `NABH Accredited · Since 1992`,
  title: 'An Ancient Key For Total Wellbeing',
  intro:
    'JSS Ayurveda Hospital, Mysuru — where 5,000 years of Ayurvedic wisdom meets compassionate, personalised healing. Trusted since 1992 by patients from India and across the world.',
  primary: { label: 'Book a Consultation', href: '/contact' },
  secondary: { label: 'Explore Treatments', href: '/treatments' },
} as const;

/**
 * Hero slider. Photographs are real images from the hospital's WordPress media
 * library, so swapping one is a single edit here (or a re-upload in WordPress
 * against the same filename).
 */
export const heroSlides = [
  {
    image: media.campusFront,
    title: 'Our Mysuru campus',
    caption: '15 green acres at the foothills of the Chamundi Hills',
  },
  {
    image: archive.lobby,
    title: 'Step inside',
    caption: 'The main hall — where every patient’s journey begins',
  },
  {
    image: media.campusWide,
    title: 'Built for healing',
    caption: 'NABH-accredited infrastructure across the hospital',
  },
  {
    image: archive.therapyAbhyanga,
    title: 'Abhyanga, performed the classical way',
    caption: 'Trained therapists working on a traditional wooden Droni',
  },
  {
    image: media.panchakarma,
    title: '26 dedicated therapy rooms',
    caption: 'Classical Panchakarma under direct medical supervision',
  },
  {
    image: media.campusGarden,
    title: 'Our own herbal garden',
    caption: '300+ medicinal species grown and harvested on site',
  },
  {
    image: media.campusReception,
    title: 'Care from the moment you arrive',
    caption: 'OPD open 9:00 AM – 4:30 PM on all working days',
  },
] as const;

export const trustPoints = [
  {
    title: '100% Organic Herbal',
    body: 'Medicines prepared from our own on-campus herbal garden.',
    icon: 'leaf' as IconName,
  },
  {
    title: 'NABH Accredited Hospital',
    body: 'Recognised for quality and patient safety standards.',
    icon: 'shield' as IconName,
  },
  {
    title: 'In-House Medicine Preparation',
    body: 'Authentic formulations made in our own Ayur-Drug Manufacturing Unit.',
    icon: 'mortar' as IconName,
  },
  {
    title: '30+ Years of Trusted Care',
    body: 'Serving patients from India, USA, Europe and beyond.',
    icon: 'heart' as IconName,
  },
] as const;

export const achievements = [
  { value: 100, suffix: '%', label: 'Product Purity', detail: 'From our own herbal garden' },
  { value: 5, suffix: ' Lakhs+', label: 'Happy Patients', detail: 'Treated since 1992' },
  { value: 33, suffix: '+', label: 'Years of Experience', detail: 'Established August 1992' },
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
    title: 'Balancing Metabolism',
    body: 'Rekindle healthy Agni — your digestive fire — through personalised diet, herbal formulations and lifestyle correction for steady weight, energy and hormonal balance.',
    icon: 'flame' as IconName,
  },
] as const;

export const effectiveness = [
  { label: 'Treatment Effectiveness', value: 96 },
  { label: 'Body Balance Restoration', value: 92 },
  { label: 'Accurate Diagnosis', value: 98 },
  { label: 'Complete Detoxification', value: 94 },
] as const;

export const whyUs = [
  {
    title: '100% Organic Herbal Medicines',
    body: 'All Churnas, Kashayams, Ghritams and Tailas are prepared in our in-house Ayur-Drug Manufacturing Unit, using herbs from our 15-acre herbal garden. Organic, authentic and quality-controlled.',
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
