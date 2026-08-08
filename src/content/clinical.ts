import type { IconName } from '@/components/ui/Icons';
import { media } from '@/lib/media';

/** OPD departments, transcribed from the WordPress OPD page. */
export const departments = [
  {
    slug: 'kayachikitsa',
    name: 'Kayachikitsa',
    english: 'General Medicine',
    icon: 'stethoscope' as IconName,
    body: 'The foundational branch of Ayurveda, Kayachikitsa corrects the digestive fire (Agni) and restores balance of Vata, Pitta and Kapha to address chronic conditions at their root.',
    listTitle: 'Conditions treated',
    list: [
      'Skin diseases — Psoriasis, Eczema, Urticaria, Atopic Dermatitis',
      'Gastritis and Irritable Bowel Syndrome',
      'Arthritis — Osteoarthritis, Rheumatoid Arthritis',
      'Respiratory diseases (Kasa, Swasa)',
      'Jaundice (Kaamale)',
      'Neurovascular disorders',
    ],
  },
  {
    slug: 'panchakarma',
    name: 'Panchakarma',
    english: 'Purification Therapies',
    icon: 'drop' as IconName,
    body: "JSS Ayurveda Hospital's dedicated Panchakarma department offers the complete spectrum of classical purification therapies — each individually prescribed and performed under direct medical supervision.",
    listTitle: 'Key procedures',
    list: [
      'Abhyanga, Avagaha, Udwarthana, Upanaha',
      'Choorna / Jambheera / Patra / Shashtikashali Pinda Sweda',
      'Dhanyamladhara, Kashayadhara, Ksheera Dhara, Thailadhara, Takradhara',
      'Katibasti, Matrabasti, Yoga Basti, Shirobasti',
      'Nasya, Netra Tarpana, Putapaka, Ksheera Dhooma',
      'Snehapana, Vamana, Virechana, Rakthamoksha',
    ],
  },
  {
    slug: 'shalakyatantra',
    name: 'Shalakyatantra',
    english: 'ENT & Ophthalmology',
    icon: 'eye' as IconName,
    body: 'Shalakyatantra is the branch of Ayurveda that deals with all diseases of the body above the neck — the eyes, ears, nose, throat, teeth, oral cavity, skull and brain.',
    listTitle: 'Conditions treated',
    list: [
      'Netra Rogas — eye disorders',
      'Karna Rogas — ear conditions',
      'Nasa Rogas — nasal and sinus conditions',
      'Mukha Rogas — oral and dental health',
      'Shiro Rogas — head and skull disorders',
      'CNS and brain conditions',
    ],
  },
  {
    slug: 'swasthavritta',
    name: 'Swasthavritta',
    english: 'Preventive Health',
    // Dinacharya / Ritucharya — daily and seasonal routine.
    icon: 'sun' as IconName,
    body: 'Swasthavritta is the Ayurvedic science of maintaining health in those who are already healthy — through seasonal routines, daily practices (Dinacharya), yoga, diet guidance and preventive therapies.',
    listTitle: 'Focus areas',
    list: [
      'Dinacharya — daily routine design',
      'Ritucharya — seasonal regimen',
      'Yoga and pranayama practice',
      'Personalised diet guidance',
      'Preventive Panchakarma',
    ],
  },
  {
    slug: 'prasooti-streeroga',
    name: 'Prasoothi & Streeroga',
    english: 'Obstetrics & Gynaecology',
    icon: 'baby' as IconName,
    body: 'Comprehensive Ayurvedic care for women across all life stages — from puberty and menstrual health to fertility, pregnancy and post-natal recovery.',
    listTitle: 'Services',
    list: [
      'Pre-conceptional care and Garbhasanskara',
      'Month-wise pregnancy regimen and yoga in pregnancy',
      'Menstrual disorder management — PCOS, thyroid, obesity-related',
      'Post-natal care',
      'Infertility management (male and female)',
      'Non-surgical management of pregnancy complaints',
    ],
  },
  {
    slug: 'shalyatantra',
    name: 'Shalyatantra',
    english: 'Surgery',
    icon: 'scalpel' as IconName,
    body: 'Rooted in the surgical science of Sushruta, this department offers both classical Ayurvedic surgery and proven para-surgical techniques for conditions that require precision intervention.',
    listTitle: 'Conditions treated',
    list: [
      'Piles, Fissure, Fistula-in-Ano, Recurrent Abscess',
      'Gall Stones, Hernias, Varicose Veins',
      'Cysts, Warts, Corns, Osteomyelitis, UTI',
      'Traumatic and deformity conditions',
      'Para-surgical: Agnikarma, Ksharakarma, Kshara Sutra, Jalukavacharana',
    ],
  },
  {
    slug: 'kaumarabhritya',
    name: 'Kaumarabhritya',
    english: 'Paediatrics',
    icon: 'child' as IconName,
    body: "Safe, gentle and evidence-informed Ayurvedic care for children — from newborns to teenagers. Our Kaumarabhritya department uses natural treatments tailored to each stage of a child's growth and development.",
    listTitle: 'Conditions treated',
    list: [
      'Cerebral Palsy, Muscular Dystrophy',
      'Autism Spectrum Disorder, ADHD, Developmental Delays',
      'Neonatal care and infant feeding guidance',
      'Gastrointestinal diseases',
      'Kasa — respiratory conditions',
      'General child health and immunity',
    ],
  },
] as const;

export const opdInfo = {
  summary:
    'The OPD functions from 9:00 AM to 4:30 PM on all working days, with consultants available across every speciality. Duty doctors are available for consultation round the clock — during non-working hours, in-house consultants attend to patients. Out-patient services are available in all specialities, attended by experienced and qualified Ayurvedacharya / B.A.M.S. / M.D. doctors.',
  visitors: [
    {
      title: 'New Patients',
      body: 'Register your name at the registration counter, where initial screening is done by our doctors. Based on your requirements and medical issue, our staff will guide you to the concerned consultant. Please bring copies of all previous evaluations and investigations.',
    },
    {
      title: 'Follow-up / Review Patients',
      body: 'Plan your follow-up visit according to the availability of your consultant and visit the OPD on their duty day. Please bring your Registration Card or Discharge Summary Card for every follow-up visit.',
    },
  ],
} as const;

export type Speciality = {
  slug: string;
  name: string;
  summary: string;
  icon: IconName;
  image: string;
  /** Present only on clinics that get a long-form deep-dive section. */
  heading?: string;
  detail?: string[];
  /**
   * Patient numbers supplied by the hospital. Optional — a clinic without a
   * confirmed figure simply shows no stat rather than a zero or a guess.
   *
   * `count` is written out rather than stored as a number because the figures
   * are quoted in mixed units (thousands and lakhs) and are shown exactly as
   * the hospital states them, always as an "at least" figure. `label` is kept
   * per-clinic so a single clinic's wording can be changed without touching
   * the rest.
   */
  treated?: {
    count: string;
    label: string;
    /** Shown under the headline figure where one clinic covers several conditions. */
    breakdown?: { label: string; value: string }[];
  };
};

/** Speciality clinics — the short card copy plus the long-form detail. */
export const specialities: Speciality[] = [
  {
    slug: 'parkinsons',
    name: "Parkinson's Clinic",
    summary:
      "Panchakarma and Rasayana-based approach to support neurological function, reduce tremors, improve mobility and enhance quality of life for Parkinson's patients.",
    icon: 'brain' as IconName,
    image: media.neckTreatment,
    treated: { count: '1,000+', label: 'patients recovered' },
    heading: 'Nourishing the Nervous System — Naturally',
    detail: [
      "Parkinson's disease progressively affects the motor system — causing tremors, muscle rigidity, slowness of movement, postural instability and, in later stages, difficulty with speech and swallowing. While conventional medicine offers symptomatic management, Ayurveda offers a powerful complementary approach that addresses the underlying neurological deterioration.",
      "At JSS Ayurveda Hospital's Parkinson's Clinic, we use a combination of Panchakarma purification therapies and Rasayana (neuro-nutrition) treatments — alongside specific exercises, yoga, meditation and an Ayurvedic diet — to improve neurological function, reduce symptoms and significantly enhance the patient's quality of life. Each program is personalised by our senior consultant.",
    ],
  },
  {
    slug: 'cancer-supportive',
    name: 'Cancer Supportive Clinic',
    summary:
      'Holistic Ayurvedic support alongside conventional cancer treatment — improving immunity, minimising side effects of chemo/radiation and enhancing patient quality of life.',
    icon: 'shield' as IconName,
    image: media.herbs,
    treated: { count: '700+', label: 'patients recovered' },
    heading: 'Ayurvedic Support Alongside Your Cancer Treatment',
    detail: [
      "Cancer is one of the most challenging experiences a person and their family can face. JSS Ayurveda Hospital's Cancer Clinic does not claim to cure cancer — but it plays a deeply meaningful role in improving the patient's strength, immunity and wellbeing during and after conventional treatment.",
      "Our approach focuses on correcting the patient's digestive strength (Agni), using immunomodulatory and Rasayana therapies to rebuild resilience, and applying Panchakarma to prevent further spread of toxins. For patients undergoing chemotherapy or radiation, our treatments are designed as a supportive adjuvant — minimising side effects, improving appetite and enhancing overall quality of life. The treatment approach is tailored to the site and stage of cancer.",
    ],
  },
  {
    slug: 'headache-migraine',
    name: 'Headache & Migraine Clinic',
    summary:
      'Targeted Shirodhara, Nasya and Talam therapies to identify and correct the root cause of chronic headaches and migraines — providing lasting relief rather than temporary suppression.',
    icon: 'head' as IconName,
    image: media.shirodharaVessel,
    treated: {
      count: '7,400+',
      label: 'patients recovered',
      breakdown: [
        { label: 'Migraine', value: '3,000+' },
        { label: 'Sinus', value: '2,000+' },
        { label: 'Tension-type', value: '2,400+' },
      ],
    },
  },
  {
    slug: 'liver',
    name: 'Liver Clinic',
    summary:
      'Classical Ayurvedic hepatology — Virechana and specialised herbal formulations to cleanse, restore and protect liver function for hepatitis, fatty liver, jaundice and cirrhosis support.',
    icon: 'liver' as IconName,
    image: media.turmericWide,
    treated: { count: '10,000+', label: 'patients recovered' },
  },
  {
    slug: 'male-infertility',
    name: 'Male Infertility Clinic',
    summary:
      'Confidential, personalised care for male-factor infertility — improving sperm health, hormonal balance and vitality through classical Vajikarana and Rasayana therapies.',
    icon: 'dna' as IconName,
    image: media.goldenMilk,
    heading: 'Restoring Male Fertility — Naturally',
    detail: [
      'Male-factor infertility contributes to nearly half of all infertility cases — low sperm count, poor motility, hormonal imbalance, stress and lifestyle factors are the most common causes. At JSS Ayurveda Hospital, treatment is rooted in Vajikarana — the classical Ayurvedic science of reproductive health.',
      'Our protocol begins with a confidential consultation and a complete Panchakarma detoxification to clear reproductive toxins, followed by personalised Vajikarana and Rasayana formulations to improve sperm quality, count and vitality — supported by a tailored diet, yoga and lifestyle plan. Every case is handled with complete privacy, sensitivity and care.',
    ],
  },
  {
    slug: 'female-infertility',
    name: 'Female Infertility Clinic',
    summary:
      'A gentle, personalised path to natural conception — addressing hormonal imbalance, uterine health and reproductive wellness. We have helped many women conceive naturally after failed conventional treatments.',
    icon: 'baby' as IconName,
    image: media.faceMassage,
    treated: { count: '1 Lakh+', label: 'patients recovered' },
    heading: 'A Natural, Compassionate Path to Conception',
    detail: [
      'Infertility is a deeply personal and emotionally challenging journey. According to WHO data, primary infertility in India has risen significantly. The causes are many — ovulation disorders, PCOS, uterine abnormalities, endometriosis, tubal blockage and lifestyle factors. At JSS Ayurveda Hospital, we approach infertility with sensitivity, patience and a genuine commitment to finding a natural path forward.',
      'Our protocol begins with thorough counselling and a complete Panchakarma detoxification to remove reproductive toxins and restore hormonal balance. This is followed by specialised uterine strengthening therapies, pre-conception care rituals (Garbhasanskara), herbal medicines to support fertilisation and embryo health, and a personalised diet and lifestyle plan. We have helped many women — including those who had gone through multiple failed IVF cycles — conceive naturally.',
    ],
  },
  {
    slug: 'prakruthi-wellness',
    name: 'Prakruthi for Wellness',
    summary:
      'Know your body type and prevent disease before it starts. Personalised wellness programs based on your unique Prakruti constitution — covering diet, daily routine, yoga and seasonal practices.',
    // Prakruti is the balance of the three doshas.
    icon: 'scale' as IconName,
    image: media.spices,
    treated: { count: '1 Lakh+', label: 'patients recovered' },
  },
  {
    slug: 'piles-fistula',
    name: 'Piles & Fistula-in-Ano Clinic',
    summary:
      'Minimally invasive Ayurvedic para-surgical procedures for piles, fissure and fistula — including the classical Kshara Sutra technique, proven safe and effective with a fast recovery time.',
    icon: 'scalpel' as IconName,
    image: media.oilsAlt,
    treated: { count: '4,000+', label: 'patients recovered' },
  },
  {
    slug: 'arthritis',
    name: 'Arthritis Clinic',
    summary:
      'Panchakarma therapies, herbal medicines and dietary guidance to relieve joint pain, reduce inflammation and restore function for Osteoarthritis, Rheumatoid Arthritis and other inflammatory joint conditions.',
    icon: 'bone' as IconName,
    image: media.herbalCompress,
    treated: { count: '2.5 Lakhs+', label: 'patients recovered' },
    heading: 'Relief, Restoration and Renewed Movement',
    detail: [
      'Arthritis is not an inevitable part of ageing — and joint pain should not be something you simply learn to live with. At JSS Ayurveda Hospital, our doctors use a combination of Panchakarma therapies, targeted herbal formulations and personalised dietary guidance to address the inflammation at its root.',
      'For Osteoarthritis, we focus on nourishing the joint with Katibasti, Janubasti, Abhyanga and Navarakizhi. For Rheumatoid Arthritis, our treatment targets the immune response using Virechana, Basti and anti-inflammatory herbal medicine. Results are carefully monitored by our doctors throughout the treatment program.',
    ],
  },
];

/** Full treatment catalogue with a grouping used for filtering on the page. */
export const treatmentGroups = [
  { slug: 'signature', name: 'Signature Therapies' },
  { slug: 'panchakarma', name: 'Panchakarma' },
  { slug: 'dhara', name: 'Dhara & Sweda' },
  { slug: 'head-eye', name: 'Head, Eye & ENT' },
  { slug: 'wellness', name: 'Wellness & Beauty' },
] as const;

export type TreatmentGroup = (typeof treatmentGroups)[number]['slug'];

export const treatments: {
  name: string;
  group: TreatmentGroup;
  body: string;
  helps?: string;
}[] = [
  {
    name: 'Abhyanga',
    group: 'signature',
    body: 'Full-body warm medicated oil massage. Penetrates tissues to improve circulation, nourish the body, aid digestion, reduce fatigue and deeply calm the nervous system.',
    helps: 'Fatigue, poor sleep, dry skin, hair loss, degenerative nerve conditions, chronic headaches',
  },
  {
    name: 'Shirodhara',
    group: 'signature',
    body: "Warm medicated oil poured in a continuous, gentle stream over the forehead — directly calming the hypothalamus and restoring the nervous system's natural balance.",
    helps: 'Insomnia, chronic stress, anxiety, depression, migraines, memory loss, mental fatigue, skin conditions',
  },
  {
    name: 'Katibasti',
    group: 'signature',
    body: 'Warm medicated oil is held in a dough boundary over the lower back, deeply nourishing the lumbar vertebrae, discs and surrounding muscles.',
    helps: 'Lower back pain, lumbar spondylosis, disc prolapse, sciatica, sacroiliac joint disorders',
  },
  {
    name: 'Nasya',
    group: 'head-eye',
    body: 'Medicated drops administered through the nostrils — the direct pathway to the brain and central nervous system. Cleanses sinuses and relieves head-related conditions.',
    helps: 'Sinusitis, chronic headaches, hair and scalp disorders, facial palsy, neurological conditions, ENT disorders',
  },
  {
    name: 'Netra Tarpana',
    group: 'head-eye',
    body: 'Warm medicated ghee held in a dough boundary around both eyes, deeply nourishing the optic nerve, retinal tissues and surrounding eye muscles.',
    helps: 'Refractive errors, degenerative eye conditions, dry eye syndrome, computer eye strain, early cataract',
  },
  {
    name: 'Patra Pinda Sweda (Kizhi)',
    group: 'signature',
    body: 'Hot bolus bags filled with fresh medicinal leaves are massaged over the body. The warmth and medicinal properties of the herbs penetrate deep into inflamed joints and muscles.',
    helps: 'Arthritis, spondylosis, sports injuries, neurological disorders, post-stroke rehabilitation, muscular pain',
  },
  {
    name: 'Navarakizhi (Shashtikashali Pinda Sweda)',
    group: 'signature',
    body: 'Njavara rice boiled in herbal milk, applied in warm boluses; nourishes muscles and nerves.',
    helps: 'Stroke recovery, muscle wasting, degenerative conditions',
  },
  {
    name: 'Udwarthana',
    group: 'wellness',
    body: 'Vigorous upward massage using coarse herbal powder; dissolves subcutaneous fat, improves lymphatic drainage and tones the body.',
    helps: 'Obesity and Kapha conditions',
  },
  {
    name: 'Virechana',
    group: 'panchakarma',
    body: 'Medicated therapeutic purgation; cleanses the liver and gallbladder and removes Pitta toxins.',
    helps: 'Skin disorders, diabetes, constipation, psoriasis',
  },
  {
    name: 'Vamana',
    group: 'panchakarma',
    body: 'Controlled therapeutic emesis; clears excess Kapha and mucus.',
    helps: 'Asthma, chronic bronchitis, respiratory congestion, Kapha-related skin diseases',
  },
  {
    name: 'Takradhara',
    group: 'dhara',
    body: 'Medicated buttermilk poured continuously over the forehead.',
    helps: 'Scalp conditions, psoriasis, insomnia, stress, nervous system disorders',
  },
  {
    name: 'Shirobasti',
    group: 'head-eye',
    body: 'Warm medicated oil retained in a leather cap fitted on the head.',
    helps: 'Facial paralysis, chronic headaches, degenerative brain conditions, insomnia',
  },
  {
    name: 'Shiropichu',
    group: 'head-eye',
    body: 'Oil-soaked cloth applied to the head crown.',
    helps: 'Cranial nerve diseases, insomnia, cervical spondylosis, mental conditions',
  },
  {
    name: 'Pichu',
    group: 'signature',
    body: 'Oil-soaked cloth applied to the affected spine or head area.',
    helps: 'Disc prolapse, spondylosis, cervical conditions',
  },
  {
    name: 'Yoga Basti & Matrabasti',
    group: 'panchakarma',
    body: 'Herbal enema therapy in a regulated sequence.',
    helps: 'Vata diseases, rheumatism, joint disorders, skin conditions, gynaecological disorders',
  },
  {
    name: 'Rakthamoksha (Jalukavacharana)',
    group: 'panchakarma',
    body: 'Medicinal leech therapy — removes impure blood from localised areas.',
    helps: 'Skin conditions, varicose veins, joint pain, blood purification',
  },
  {
    name: 'Avagaha',
    group: 'dhara',
    body: 'Herbal decoction bath.',
    helps: 'Joint pain, urogenital conditions and Vata disorders',
  },
  {
    name: 'Dhanyamladhara',
    group: 'dhara',
    body: 'Fermented herbal decoction poured over the body.',
    helps: 'Rheumatoid arthritis, obesity, thyroid conditions',
  },
  {
    name: 'Snehapana',
    group: 'panchakarma',
    body: 'Medicated ghee taken internally in increasing doses; prepares the body for Panchakarma.',
    helps: 'Chronic deep-seated disease',
  },
  {
    name: 'Ksheera Dhara',
    group: 'dhara',
    body: 'Warm medicated milk poured over the body.',
    helps: 'Pitta diseases, headaches, insomnia, stress, burning sensations',
  },
  {
    name: 'Kashayadhara',
    group: 'dhara',
    body: 'Warm herbal decoction poured over the body.',
    helps: 'Infectious conditions, skin diseases, insomnia',
  },
  {
    name: 'Ksheera Dhooma',
    group: 'head-eye',
    body: 'Medicated milk steam applied to the face.',
    helps: "Facial palsy, speech disorders, ptosis, Bell's palsy",
  },
  {
    name: 'Thalam',
    group: 'head-eye',
    body: 'Herbal oil or paste applied to the crown of the head.',
    helps: 'Insomnia, hypertension, migraines, stress',
  },
  {
    name: 'Lepa',
    group: 'wellness',
    body: 'Herbal paste applied to affected skin areas.',
    helps: 'Skin diseases, local pain and inflammation, improving skin complexion',
  },
  {
    name: 'Upanaha',
    group: 'signature',
    body: 'Herbal poultice tied over affected joints.',
    helps: 'Osteoarthritis, rheumatoid arthritis, joint stiffness and swelling',
  },
  {
    name: 'Jambheera Pinda Sweda',
    group: 'signature',
    body: 'Lemon and herbal bolus massage.',
    helps: 'Sciatica, lumbar spondylosis, low backache, cervical spondylosis',
  },
  {
    name: 'Choorna Pinda Sweda',
    group: 'signature',
    body: 'Herbal powder bolus massage.',
    helps: 'Arthritis, spinal conditions, neurological conditions, inflammation',
  },
  {
    name: 'Padabhyanga',
    group: 'wellness',
    body: 'Foot massage with warm medicated oil.',
    helps: 'Stress, poor sleep, circulation disorders and general relaxation',
  },
  {
    name: 'Mukhabhyanga',
    group: 'wellness',
    body: 'Ayurvedic face massage with herbal oil.',
    helps: 'Skin health, facial circulation, relaxation, anti-ageing',
  },
  {
    name: 'Shirobhyanga',
    group: 'wellness',
    body: 'Medicated head oil massage.',
    helps: 'Hair loss, scalp conditions, migraine, insomnia',
  },
  {
    name: 'Acupuncture & Acupressure',
    group: 'wellness',
    body: 'Complementary therapies available alongside Ayurvedic treatment.',
    helps: 'Pain management, stress and nervous conditions',
  },
  {
    name: 'Mud Pack Therapy',
    group: 'wellness',
    body: 'Natural therapeutic mud applied to the body or eyes.',
    helps: 'Skin conditions, inflammation and eye care',
  },
  {
    name: 'Beauty Treatments',
    group: 'wellness',
    body: 'Classical Ayurvedic beauty therapies using freshly prepared herbal pastes and oils.',
    helps: 'Skin glow, hair health and natural complexion enhancement',
  },
];
