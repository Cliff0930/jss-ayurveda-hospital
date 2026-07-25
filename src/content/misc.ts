import type { AccordionItem } from '@/components/ui/Accordion';
import type { IconName } from '@/components/ui/Icons';

/** Products, from the WordPress "Our Products" page. */
export const products = [
  {
    name: 'Immune Booster Kit',
    body: 'A physician-formulated Ayurvedic kit combining classical herbs and preparations that strengthen your natural immune response, improve digestive function and build lasting vitality. Ideal for daily immune support and seasonal protection.',
    icon: 'shield' as IconName,
  },
  {
    name: 'Hitayu Kit (Post-Covid Recovery)',
    body: 'Specifically designed for those recovering from Covid-19. The Hitayu Kit addresses post-Covid symptoms — persistent fatigue, breathlessness, digestive weakness, joint pain and brain fog — through targeted Ayurvedic formulations that support the body’s natural healing and rebuilding process.',
    icon: 'lungs' as IconName,
  },
  {
    name: 'Immuno Kidz',
    body: 'Safe, gentle and effective immunity support formulated specifically for children. Made with child-friendly Ayurvedic ingredients — free from synthetic chemicals, preservatives and artificial flavours. Supports healthy growth, improves digestion and builds strong natural immunity from early childhood.',
    icon: 'child' as IconName,
  },
  {
    name: 'JSS Ayur-Drug Manufacturing Unit',
    body: 'All medicines used at JSS Ayurveda Hospital are prepared in our own GACP-compliant Ayur-Drug Manufacturing Unit using herbs from our herbal garden and following exact classical Ayurvedic formulations. This unit ensures purity, authenticity and complete traceability — from plant to preparation to patient.',
    icon: 'mortar' as IconName,
  },
] as const;

export const productsPurity = {
  eyebrow: 'In-House Preparation',
  title: 'Purity You Can Trust — Prepared the Way Nature Intended',
  body: [
    'At JSS Ayurveda Hospital, every Churna, Kashayam, Ghritam, Taila and Avaleha is prepared in our own Ayur-Drug Manufacturing Unit — using herbs grown in our own herbal garden under controlled organic conditions. Nothing is outsourced. Nothing is compromised. Our formulations follow the exact classical Ayurvedic texts — unchanged and uncompromised.',
    'This is why the medicines at JSS Ayurveda Hospital are genuinely effective — because they are authentic. When you take a JSS product, you can be certain of what it contains, where it comes from and why your doctor has prescribed it.',
  ],
} as const;

/** FAQs, from the WordPress FAQ page. */
export const faqs: AccordionItem[] = [
  {
    question: 'What is Ayurveda?',
    answer:
      "Ayurveda is India's 5,000-year-old science of life — a complete system of natural medicine that addresses the body, mind and spirit as one. The word comes from two Sanskrit roots: 'Ayu' (life) and 'Veda' (knowledge). Unlike modern medicine, which focuses on managing disease, Ayurveda focuses on understanding each person's unique constitution (Prakruti) and restoring their body's natural balance through diet, lifestyle, herbal medicines and therapeutic treatments.",
  },
  {
    question: 'How is Ayurveda different from modern medicine?',
    answer:
      'Modern medicine typically targets the symptom — suppressing it with drugs or surgery. Ayurveda targets the cause — the underlying imbalance that produced the symptom in the first place. Ayurveda is a wellness-first system: it works to prevent disease before it starts, treat the root cause when disease does occur, and restore the body to a state of natural health and resilience. It is also deeply personalised — no two treatment plans at JSS Ayurveda Hospital are the same.',
  },
  {
    question: 'Can I take Ayurvedic medicines along with my current allopathic medications?',
    answer:
      'In most cases, yes. Simple herbal Ayurvedic formulations are generally safe to take alongside modern medications. However, we always ask our patients to inform our doctors about all medicines they are currently taking — including supplements and homeopathic preparations. Our doctors will advise on timing and any considerations specific to your case.',
  },
  {
    question: 'Do Ayurvedic treatments have side effects?',
    answer:
      "Authentic Ayurvedic treatments use natural, bio-compatible substances that the human body recognises and accepts. When prescribed by qualified doctors and performed by trained therapists — as at JSS Ayurveda Hospital — they do not cause harmful side effects. Patients also do not develop dependency on Ayurvedic medicines, unlike many modern pharmaceutical drugs. This is one of Ayurveda's most important advantages for long-term health management.",
  },
  {
    question: 'When is Panchakarma recommended?',
    answer:
      "Panchakarma is recommended in two situations: (1) When accumulated toxins in the body have led to chronic conditions — skin diseases, arthritis, digestive disorders, neurological conditions, hormonal imbalances — that are not responding adequately to oral medication alone. (2) As a preventive measure every few years, even for healthy individuals, to cleanse and rejuvenate the body's tissues and organ systems.",
  },
  {
    question: 'How long is a typical treatment stay?',
    answer:
      "It depends entirely on your condition and treatment goals. Our Rejuvenate programs start from just 1 day. Panchakarma and therapeutic programs run for 5, 7 or 14 days. Speciality programs — for conditions like Parkinson's, infertility or cancer support — may be longer. Our doctors will recommend the ideal duration after your initial consultation.",
  },
  {
    question: 'Do you accept health insurance?',
    answer:
      'Yes. JSS Ayurveda Hospital supports reimbursement for Ayurvedic hospitalisation under several health insurance policies. Our team will provide all necessary documentation — discharge summary, treatment records, billing — for your insurance claim. We recommend checking with your insurer in advance about specific coverage for Ayurvedic in-patient treatment.',
  },
  {
    question: 'Is the food at the hospital vegetarian?',
    answer:
      'Yes. All meals served at JSS Ayurveda Hospital are pure vegetarian and prepared according to Ayurvedic dietary principles. Your meals are specifically designed by our in-house dietitian based on your treatment stage and your doctor’s instructions — and are served in your room. Attendants and family members can dine in our hospital canteen.',
  },
  {
    question: 'Can I visit for a consultation without staying as an in-patient?',
    answer:
      'Absolutely. Our OPD consultation is available Monday to Saturday from 9:00 AM to 4:30 PM, and on Sundays and Government holidays from 9:00 AM to 1:00 PM. Duty doctors are also available round the clock for urgent consultations. No appointment is needed for general OPD visits. For specialist consultations, we recommend calling ahead to confirm the consultant’s availability on that day.',
  },
  {
    question: 'Do you treat patients from other countries?',
    answer:
      'Yes. JSS Ayurveda Hospital regularly welcomes patients from the USA, Germany, Romania, France, the UAE, and many other countries. We have experience in supporting international patients with treatment planning, accommodation arrangements and all necessary documentation for travel or insurance. Please contact us well in advance — ideally 2–4 weeks before your intended arrival date — so we can prepare your complete program.',
  },
];

/** About page long-form copy. */
export const aboutStory = {
  eyebrow: 'Who We Are',
  title: 'The Natural Way to Achieving Balance and Optimal Health',
  paragraphs: [
    'JSS Ayurveda Hospital was established in August 1992 on MG Road, Mysuru. Today we stand on a peaceful 15-acre campus at the foothills of the Chamundi Hills — home to over 300 species of medicinal herbs, 26 specialised therapy rooms and a team of qualified doctors dedicated to authentic Ayurvedic healing.',
    'We are proudly part of the JSS Mahavidyapeetha — a century-old institution founded by Jagadguru Sri Shivarathreeshwara Mahaswamiji, built on the principle of selfless service to all.',
  ],
  milestones: [
    { year: '1992', title: 'Founded on MG Road', body: 'JSS Ayurveda Hospital opens in the heart of Mysuru in August 1992.' },
    { year: '2000s', title: 'A campus of our own', body: 'The hospital moves to a 15-acre campus at the foothills of the Chamundi Hills.' },
    { year: 'Today', title: 'NABH accredited', body: '26 therapy rooms, 300+ herb species, 44 consultants and patients from across the world.' },
  ],
} as const;

/** JSS Mahavidyapeetha page copy. */
export const mahavidyapeetha = {
  intro:
    'JSS Mahavidyapeetha traces its roots to 1928, when a modest hostel was set up in Mysuru to support students pursuing higher education. In 1954, His Holiness Jagadguru Dr. Sri Shivarathri Rajendra Mahaswamiji formally established the Mahavidyapeetha — today one of India’s largest educational and humanitarian movements, and the parent organisation of JSS Ayurveda Hospital.',
  points: [
    '300+ institutions — from kindergartens to postdoctoral research',
    'Over one lakh students across India and abroad',
    'Four universities, including JSS AHER and JSS Science & Technology University',
    'International presence in the USA, Mauritius and Dubai',
  ],
  stats: [
    { value: 300, suffix: '+', label: 'Institutions' },
    { value: 1, suffix: ' Lakh+', label: 'Students' },
    { value: 70, suffix: '+', label: 'Years of Service' },
  ],
  reach:
    'From its home in Mysuru, the Mahavidyapeetha’s institutions reach Bengaluru, Noida, New Delhi, Ooty and Coimbatore — and beyond India to the United States, Mauritius and Dubai. Its universities include the JSS Academy of Higher Education & Research, JSS Science and Technology University, JSS University Noida and the JSS Academy in Mauritius.',
  divisions: [
    {
      title: 'General & Technical Education',
      body: 'Schools, arts, commerce and science colleges, polytechnics and engineering institutions across India.',
      icon: 'graduation' as IconName,
    },
    {
      title: 'Medical Education & Healthcare',
      body: 'Ayurveda, nursing, pharmacy, physiotherapy and allied health sciences — with hospitals in Mysuru and Chamarajanagar.',
      icon: 'stethoscope' as IconName,
    },
    {
      title: 'Community, Culture & Rural Development',
      body: 'Vocational training, old-age homes, cultural preservation, promotion of the arts and temple restoration.',
      icon: 'users' as IconName,
    },
  ],
} as const;

/** Physiotherapy — the source page is a stub, so this expands it responsibly. */
export const physiotherapy = {
  intro:
    'Modern rehabilitation care working alongside classical Ayurvedic treatment. Our physiotherapy team supports patients recovering from neurological, orthopaedic and post-surgical conditions — complementing Panchakarma and Rasayana therapies with structured, measurable rehabilitation.',
  services: [
    {
      title: 'Neuro-rehabilitation',
      body: 'Post-stroke, Parkinson’s and cerebral palsy rehabilitation coordinated with the Kayachikitsa and Kaumarabhritya departments.',
      icon: 'brain' as IconName,
    },
    {
      title: 'Orthopaedic rehabilitation',
      body: 'Structured mobility and strengthening programs for arthritis, spondylosis, disc conditions and sports injuries.',
      icon: 'bone' as IconName,
    },
    {
      title: 'Post-operative recovery',
      body: 'Guided recovery following Shalyatantra procedures, restoring movement safely and steadily.',
      icon: 'scalpel' as IconName,
    },
    {
      title: 'Geriatric mobility care',
      body: 'Balance, gait and fall-prevention programs designed for older patients during their stay.',
      icon: 'walk' as IconName,
    },
  ],
  note: 'Physiotherapy is available to in-patients as part of their treatment plan and to out-patients on referral from our consultants. Please contact the hospital for current session timings.',
} as const;

/** JSS Ayur Pharma — the source page is a stub; this expands it responsibly. */
export const ayurPharma = {
  intro:
    'JSS Ayur Pharma is the hospital’s own Ayur-Drug manufacturing unit. Every medicine used in our treatments — and every product we sell — is prepared here from herbs grown in our 15-acre garden, following the exact formulations of the classical Ayurvedic texts.',
  pillars: [
    { title: 'Grown here', body: 'Over 300 medicinal species cultivated on campus and irrigated with treated water.', icon: 'leaf' as IconName },
    { title: 'Prepared here', body: 'Churnas, Kashayams, Ghritams, Tailas and Avalehas made in our GACP-compliant unit.', icon: 'mortar' as IconName },
    { title: 'Prescribed here', body: 'Dispensed only on the prescription of our BAMS / MD consultants after assessment.', icon: 'stethoscope' as IconName },
    { title: 'Traceable end to end', body: 'From plant to preparation to patient — full traceability at every stage.', icon: 'shield' as IconName },
  ],
  formulations: ['Churna (powders)', 'Kashayam (decoctions)', 'Ghritam (medicated ghee)', 'Taila (medicated oils)', 'Avaleha (herbal jams)', 'Lehya & Gulika'],
} as const;
