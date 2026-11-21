import type { IconName } from '@/components/ui/Icons';
import { media, photo } from '@/lib/media';

/** OPD departments, transcribed from the WordPress OPD page. */
export const departments = [
  {
    slug: 'kayachikitsa',
    name: 'Kayachikitsa',
    english: 'General Medicine',
    icon: 'stethoscope' as IconName,
    body: 'The foremost branch of Ashtanga Ayurveda and its counterpart of internal medicine. Kayachikitsa restores Agni (the digestive fire) and the balance of Vata, Pitta and Kapha to manage acute and chronic illness of body and mind.',
    listTitle: 'Conditions treated',
    list: [
      'Arthritis, spine and joint disorders',
      'Skin and hair — Psoriasis, Eczema, Urticaria, Acne',
      'Gastritis, acid-peptic disorders and IBS',
      'Liver — Jaundice (Kamala), Hepatitis, Fatty liver',
      'Diabetes, Hypertension, Thyroid and lifestyle disorders',
      'Stroke, Parkinson’s and other neurological conditions',
    ],
  },
  {
    slug: 'panchakarma',
    name: 'Panchakarma',
    english: 'Purification Therapies',
    icon: 'drop' as IconName,
    body: "Classical detoxification and restorative therapies, each chosen for the patient's constitution, strength, age, digestion and condition — and given under direct medical supervision. The department also runs a Neuro Speciality Clinic.",
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
    body: 'Preventive, promotive and curative Ayurvedic care for the eyes, ears, nose, throat, mouth and related structures of the head and neck — with modern clinical examination for accurate assessment.',
    listTitle: 'Conditions treated',
    list: [
      'Netra Roga — dry eye, digital eye strain, eyelid and corneal disorders',
      'Karna Roga — earache, tinnitus, hearing complaints',
      'Nasa Roga — allergic rhinitis, sinusitis, congestion',
      'Mukha–Kantha Roga — sore throat, hoarseness, tonsils',
      'Mukha & Danta Roga — mouth ulcers, gum disorders',
      'Netra Kriyakalpa, Nasya, Karna Purana, Gandusha',
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
    body: 'Ayurvedic and evidence-based care for women at every stage of life — adolescence, the reproductive years, pregnancy, childbirth and menopause.',
    listTitle: 'Services',
    list: [
      'Preconception, antenatal and postnatal care',
      'Month-wise pregnancy diet and yoga',
      'Menstrual health clinic and PCOS / PCOD',
      'Infertility OPD, including after failed IVF',
      'Fibroids, leucorrhoea and menopausal care',
      'Uttara Basti, Yoni Pichu and other local procedures',
    ],
  },
  {
    slug: 'shalyatantra',
    name: 'Shalyatantra',
    english: 'Surgery',
    icon: 'scalpel' as IconName,
    body: 'Ayurvedic surgery integrated with contemporary surgical principles, with a fully equipped Major Operation Theatre, a Maggot Debridement Therapy Clinic and an exclusive Anushastra OPD for para-surgical procedures.',
    listTitle: 'Conditions treated',
    list: [
      'Piles, fissure and fistula — Ksharasutra therapy',
      'Hernia repair, haemorrhoidectomy and excisions',
      'Chronic and non-healing wounds, diabetic foot ulcers',
      'Cysts, lipomas, warts and corns',
      'Para-surgical: Agnikarma, Ksharakarma, Jalaukavacharana, Siravyadha',
    ],
  },
  {
    slug: 'kaumarabhritya',
    name: 'Kaumarabhritya',
    english: 'Paediatrics',
    icon: 'child' as IconName,
    body: 'Preventive, promotive and curative Ayurvedic care for infants, children and adolescents — with emphasis on nutrition, immunity, growth, development and neurodevelopmental conditions.',
    listTitle: 'Conditions treated',
    list: [
      'Autism, ADHD, cerebral palsy and developmental delay',
      'Speech delay — AYURVANI satellite OPD',
      'Recurrent infections, asthma and allergies',
      'Growth, nutrition and feeding guidance',
      'Monthly Swarnaprashana',
      'Neonatal care',
    ],
  },
] as const;

export const opdInfo = {
  summary:
    'The OPD functions from 8:00 AM to 4:30 PM on all working days, with consultants available across every speciality. Duty doctors are available for consultation round the clock — during non-working hours, in-house consultants attend to patients. Out-patient services are available in all specialities, attended by experienced and qualified Ayurvedacharya / B.A.M.S. / M.D. doctors.',
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
  /**
   * The department that runs the clinic, shown under its name. Left out where
   * the hospital has not confirmed it yet, so nothing is shown rather than a guess.
   */
  department?: string;
  /** Card copy. Left out for clinics whose description the hospital will supply. */
  summary?: string;
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
    department: 'Department of Kayachikitsa',
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
    department: 'Department of Kayachikitsa',
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
    department: 'Department of Shalakyatantra',
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
    department: 'Department of Kayachikitsa',
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
    department: 'Department of Prasoothi & Streeroga',
    summary:
      'A gentle, personalised path to natural conception — addressing hormonal imbalance, uterine health and reproductive wellness. We have helped many women conceive naturally after failed conventional treatments.',
    icon: 'baby' as IconName,
    image: photo.faceMassage,
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
    department: 'Department of Swasthavritta',
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
    department: 'Department of Shalyatantra',
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
  // Still awaiting the hospital's description: the card shows the clinic and its department only.
  {
    slug: 'manasa-roga',
    name: 'Manasa Roga Clinic',
    // OPD roster: "Kayachikitsa 2 (Skin & Manasa Roga)", room 6.
    department: 'Department of Kayachikitsa',
    icon: 'lotus' as IconName,
    image: media.shirodhara,
  },
  {
    slug: 'neuro',
    name: 'Neuro Speciality Clinic',
    // OPD roster: "Panchakarma 2 (Neuro)", room 7.
    department: 'Department of Panchakarma',
    summary:
      'Integrated Ayurvedic management and rehabilitation for stroke, paraparesis, IVDP with radiculopathy, motor neuron disease, multiple sclerosis, GBS and other neurological conditions.',
    icon: 'brain' as IconName,
    image: media.backMassage,
    heading: 'Integrated Rehabilitation for Neurological Conditions',
    detail: [
      "The Department of Panchakarma's Neuro Speciality Clinic provides comprehensive, integrated Ayurvedic management for a wide range of neurological conditions — stroke, quadriparesis, paraparesis, post-laminectomy cases with neurological deficits, cervical and lumbar IVDP with radiculopathy, sensory neuropathy, motor neuron disease (MND), Parkinson's disease, hypoxic encephalopathy, multiple sclerosis, Guillain–Barré syndrome (GBS) and more.",
      'Rehabilitation is coordinated across Ayurvedic therapies, physiotherapy, and speech and hearing services, with the aim of improving functional recovery, mobility, communication, quality of life and overall well-being.',
    ],
  },
  {
    slug: 'maggot-debridement',
    name: 'Maggot Debridement Therapy Clinic',
    department: 'Department of Shalyatantra',
    summary:
      'A safe, natural way to clean chronic and non-healing wounds — diabetic foot ulcers, pressure sores and other wounds where routine wound care has not been enough.',
    icon: 'leaf' as IconName,
    image: media.greenery,
    heading: 'Helping Non-Healing Wounds Heal',
    detail: [
      'Maggot Debridement Therapy (MDT) is a safe and natural method for cleaning difficult or non-healing wounds. Specially grown, medically sterilised maggots are placed on the wound, where they remove dead or infected tissue while leaving healthy tissue largely untouched.',
      'This helps reduce infection, cleans the wound and creates a healthy environment for healing. The Department of Shalyatantra has made MDT part of routine clinical practice, and runs this dedicated clinic for diabetic foot ulcers, pressure sores and other chronic wounds.',
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

export const opdWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export type OpdWeekday = (typeof opdWeekdays)[number];

export type OpdRoom = {
  room: number;
  name: string;
  /** Doctor ids (WordPress name slugified, e.g. `dr-beena-m-d`) per weekday. */
  days?: Partial<Record<OpdWeekday, string[]>>;
  /** Shown across the whole row instead of names, e.g. for the casualty OPD. */
  note?: string;
};

/**
 * Consultant OPD roster, from the hospital's "Consultants and OPD Days" board
 * (jssamch.org/wp-content/uploads/2026/08/consultant-opd-days.jpg).
 *
 * Doctors are referenced by id so names always match the Doctors page.
 * Following the hospital's November 2026 replies:
 *   - Drs. Greeshma Menon, Priyadarshini D J, Pooja P K, Visal S Kumar,
 *     Ramachandar and Hemanth Kumar have left and are omitted; their slots
 *     show as empty, and the casualty OPD shows duty doctors instead.
 *   - "Dr. Rinchu R C" is Dr. Rinchu R S, "Dr. Sowmya M.N." is Dr. Sowmya M N,
 *     and "Dr. Lakshmi" is Dr. Lakshmi K. Avaradi.
 * Sundays run on rotation.
 */
export const opdRoster: OpdRoom[] = [
  {
    room: 1,
    name: 'Kayachikitsa 1',
    days: {
      Mon: ['dr-deepa-c-patil'], Tue: ['dr-netra-b-hubballi'], Wed: ['dr-beena-m-d'],
      Thu: ['dr-maitri-g-m'], Fri: ['dr-anu-krishna-p'], Sat: ['dr-deepa-c-patil'],
    },
  },
  {
    room: 2,
    name: 'Panchakarma 1',
    days: {
      Mon: ['dr-veena-g-rao'], Tue: ['dr-jyoti'], Wed: ['dr-seetha-devi'],
      Thu: ['dr-veena-g-rao'], Fri: ['dr-manasa-s-d'], Sat: ['dr-vineeth-c-p'],
    },
  },
  {
    room: 3,
    name: 'Bala Roga (Paediatrics)',
    days: {
      Mon: ['dr-srihari-s'], Tue: ['dr-vaisakh-k'], Wed: ['dr-pooja-m-s'],
      Thu: ['dr-jyoty-k-b'], Sat: ['dr-preeti-h-m'],
    },
  },
  {
    room: 4,
    name: 'Shalakya Tantra (ENT)',
    days: {
      Mon: ['dr-gavimath-shivanand'], Tue: ['dr-sandhya-rani'],
      Thu: ['dr-gavimath-shivanand'], Fri: ['dr-sandhya-rani'], Sat: ['dr-chaya-c'],
    },
  },
  {
    room: 5,
    name: 'Shalakya Tantra (Eye)',
    days: {
      Mon: ['dr-sandhya-rani'], Tue: ['dr-sarbeswar-kar'], Wed: ['dr-chaya-c'],
      Fri: ['dr-gavimath-shivanand'],
    },
  },
  {
    room: 6,
    name: 'Kayachikitsa 2 (Skin & Manasa Roga)',
    days: {
      Mon: ['dr-beena-m-d'], Tue: ['dr-anu-krishna-p'], Wed: ['dr-netra-b-hubballi'],
      Thu: ['dr-beena-m-d'], Fri: ['dr-maitri-g-m'], Sat: ['dr-harshitha-h-s'],
    },
  },
  {
    room: 7,
    name: 'Panchakarma 2 (Neuro)',
    days: {
      Mon: ['dr-apoorva'], Tue: ['dr-manasa-s-d'], Wed: ['dr-jyoti'],
      Thu: ['dr-vineeth-c-p'], Fri: ['dr-veena-g-rao'], Sat: ['dr-seetha-devi'],
    },
  },
  {
    room: 8,
    name: 'Visha Chikitsa (Toxicology)',
    days: {
      Mon: ['dr-pallavi-y-c'], Tue: ['dr-shashi-bindu'], Wed: ['dr-rinchu-r-s'],
      Thu: ['dr-rinchu-r-s'], Fri: ['dr-pallavi-y-c'], Sat: ['dr-shashi-bindu'],
    },
  },
  {
    room: 9,
    name: 'Prasooti Tantra (Obstetrics)',
    days: {
      Mon: ['dr-usha-d-t'], Tue: ['dr-nanda-k-o'], Wed: ['dr-usha-d-t'],
      Thu: ['dr-tejaswini-k-r'], Fri: ['dr-lakshmi-k-avaradi'], Sat: ['dr-tejaswini-k-r'],
    },
  },
  {
    room: 10,
    name: 'Shalya Tantra (Surgery)',
    days: {
      Mon: ['dr-siddayya-aradhyamath'], Tue: ['dr-aiyanna'], Wed: ['dr-poornima-jalawadi'],
      Fri: ['dr-poornima-p-k-m'], Sat: ['dr-adithya-j-v'],
    },
  },
  {
    room: 11,
    name: 'Stree Roga (Gynaecology)',
    days: {
      Mon: ['dr-lakshmi-k-avaradi'], Tue: ['dr-tejaswini-k-r'], Wed: ['dr-nanda-k-o'],
      Thu: ['dr-lakshmi-k-avaradi'], Fri: ['dr-nanda-k-o'], Sat: ['dr-usha-d-t'],
    },
  },
  {
    room: 12,
    name: 'Swasthavritta / Yoga & Naturopathy',
    days: {
      Mon: ['dr-sudhakar-reddy', 'dr-nirmala-a-r'],
      Tue: ['dr-vidyashree-m', 'dr-nirmala-a-r'],
      Wed: ['dr-sowmya-m-n', 'dr-nirmala-a-r'],
      Thu: ['dr-shalini-s', 'dr-nirmala-a-r'],
      Fri: ['dr-anusha-s', 'dr-nirmala-a-r'],
      Sat: ['dr-sudhakar-reddy', 'dr-nirmala-a-r'],
    },
  },
  {
    room: 13,
    name: 'Atyayika / Casualty OPD',
    note: 'Duty doctors on every day',
  },
  {
    room: 14,
    // "PTSR 2 (PG)" on the board.
    name: 'Prasooti Tantra & Stree Roga 2 (PG)',
    days: {
      Mon: ['dr-tejaswini-k-r'], Tue: ['dr-lakshmi-k-avaradi'], Wed: ['dr-tejaswini-k-r'],
      Thu: ['dr-usha-d-t'], Fri: ['dr-usha-d-t'], Sat: ['dr-nanda-k-o'],
    },
  },
];

/** Sunday has no fixed roster. */
export const opdSundayNote = 'Sundays: consultants on rotation';

/**
 * Each consultant's OPD days, derived from `opdRoster` and keyed by doctor id,
 * e.g. `{ 'dr-beena-m-d': 'Mon, Wed, Thu' }`. A doctor with no entry shows the
 * prior-appointment line only.
 */
export const consultantOpdDays: Record<string, string> = (() => {
  const byDoctor = new Map<string, Set<OpdWeekday>>();
  for (const room of opdRoster) {
    for (const day of opdWeekdays) {
      for (const id of room.days?.[day] ?? []) {
        if (!byDoctor.has(id)) byDoctor.set(id, new Set());
        byDoctor.get(id)!.add(day);
      }
    }
  }
  return Object.fromEntries(
    [...byDoctor].map(([id, days]) => [
      id,
      days.size === opdWeekdays.length
        ? 'Mon – Sat'
        : opdWeekdays.filter((day) => days.has(day)).join(', '),
    ]),
  );
})();

export const priorAppointmentNote = 'Also available on prior appointment';

/**
 * Doctors kept off the site at the hospital's request, matched by id. Removing
 * them in WordPress as well is cleaner; this keeps them hidden either way.
 */
export const hiddenDoctorIds = ['dr-nischitha-m-s'];

/**
 * Swarnaprashana and Agnikarma — shown as their own row under the speciality
 * clinics. Copy follows the hospital's own published descriptions on jssamch.org.
 */
export const signatureProcedures = [
  {
    slug: 'swarnaprashana',
    name: 'Swarnaprashana',
    tagline: 'Immunity care for children',
    icon: 'child' as IconName,
    body: 'Swarna (gold) with classical herbs — Vacha, Shankhapushpi, Brahmi and Ashwagandha in honey and cow’s ghee — given to children by mouth. It improves digestion and immunity, supports physical and mental growth, sharpens concentration and memory, and helps prevent frequent fever, cold, cough, asthma and allergies. It has no adverse effects, and your child can eat normally before and after the dose.',
    facts: [
      { label: 'Who', value: 'Children from birth to 16 years of age' },
      { label: 'When', value: 'Every month, on Pushya Nakshatra day' },
      { label: 'Fee', value: '₹150 per dose at the hospital · ₹100 for a single-dose bottle to take home' },
    ],
    // From the hospital's Swarnaprashana Campaign 2026 leaflet. Replace each year.
    calendar: {
      title: 'Swarnaprashana dates 2026',
      dates: [
        'Mon, 5 January', 'Sun, 1 February', 'Sat, 28 February', 'Sat, 28 March',
        'Fri, 24 April', 'Fri, 22 May', 'Thu, 18 June', 'Wed, 15 July',
        'Tue, 11 August', 'Tue, 8 September', 'Mon, 5 October', 'Sun, 1 November',
        'Sat, 28 November', 'Sat, 26 December',
      ],
    },
    department: 'Kaumarabhritya (Paediatrics)',
  },
  {
    slug: 'agnikarma',
    name: 'Agnikarma',
    tagline: 'Classical para-surgical heat therapy',
    icon: 'flame' as IconName,
    body: 'A precise, controlled application of therapeutic heat at specific points, described by Sushruta and performed by our Shalyatantra surgeons. A quick OPD procedure for acute and chronic pain, musculoskeletal disorders and localised tissue growths.',
    facts: [
      { label: 'Treats', value: 'Acute and chronic pain, musculoskeletal disorders and localised tissue growths' },
      { label: 'Performed by', value: 'Shalyatantra (Surgery) consultants' },
      { label: 'Setting', value: 'OPD procedure' },
    ],
    department: 'Shalyatantra (Surgery)',
  },
] as const;
