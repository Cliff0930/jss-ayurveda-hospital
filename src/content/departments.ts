import { archive, photo } from '@/lib/media';

/**
 * Long-form department pages (/opd/[slug]), written from the department
 * write-ups the hospital sent in November 2026. Keyed by the slug used in
 * `departments` (src/content/clinical.ts), which keeps the short OPD card copy.
 *
 * Swasthavritta has no write-up yet, so it has no page and its OPD card does
 * not link anywhere.
 */

export type DepartmentGroup = {
  title: string;
  /** The classical (Sanskrit) name, shown beside the English title. */
  classical?: string;
  intro?: string;
  items: string[];
  note?: string;
};

export type DepartmentClinic = {
  name: string;
  body: string;
  /** Consultant, day, time, venue — shown as a small definition list. */
  facts?: { label: string; value: string }[];
  items?: string[];
};

export type DepartmentDetail = {
  formalName: string;
  headline: string;
  image: string;
  imageAlt: string;
  intro: string[];
  groupsEyebrow: string;
  groupsTitle: string;
  groups: DepartmentGroup[];
  procedures?: {
    title: string;
    intro?: string;
    image?: { src: string; alt: string };
    items: { name: string; body?: string }[];
  };
  clinics?: { title: string; intro?: string; items: DepartmentClinic[] };
  closing?: { quote: string; translation?: string; body?: string };
};

export const departmentDetails: Record<string, DepartmentDetail> = {
  kayachikitsa: {
    formalName: 'Department of Kayachikitsa',
    headline: 'Internal medicine for body and mind',
    image: archive.doctorPatient,
    imageAlt: 'A Kayachikitsa consultant with an in-patient on the ward',
    intro: [
      'Kayachikitsa, the foremost branch of Ashtanga Ayurveda, is the Ayurvedic counterpart of General and Internal Medicine. It covers the complete management of disorders affecting the body and mind through a holistic, individualised approach.',
      'Kaya refers to the body and its metabolic functions, particularly Agni (the digestive fire); Chikitsa means treatment. Ayurveda holds the balance of Vata, Pitta and Kapha, and the proper functioning of Agni, to be fundamental to health. Disturbances in these are important contributors to how disease appears and progresses.',
      'The department follows a patient-centred approach that brings classical Ayurvedic principles together with contemporary clinical understanding, caring for both acute and chronic illness with an emphasis on management, prevention, rehabilitation, lifestyle change and overall well-being.',
    ],
    groupsEyebrow: 'Conditions treated',
    groupsTitle: 'A broad spectrum of systemic and lifestyle disorders',
    groups: [
      { title: 'Arthritic & musculoskeletal', items: ['Osteoarthritis', 'Rheumatoid arthritis', 'Gouty arthritis', 'Other spondyloarthropathies'] },
      { title: 'Spine & joints', items: ['Lumbar and cervical spondylosis', 'Disc prolapse', 'Ankylosing spondylitis'] },
      { title: 'Gastrointestinal', items: ['Gastritis', 'Acid-peptic disorders', 'Irritable bowel syndrome', 'Other digestive complaints'] },
      { title: 'Skin & hair', items: ['Psoriasis', 'Atopic dermatitis', 'Eczema', 'Urticaria', 'Acne and pimples', 'Other skin and hair disorders'] },
      { title: 'Neurological & neurodegenerative', items: ['Stroke', "Parkinson's and Parkinson-plus syndromes", 'Other related disorders'] },
      { title: 'Liver & biliary', classical: 'Kamala', items: ['Jaundice', 'Hepatitis', 'Fatty liver', 'Other liver disorders'] },
      { title: 'Metabolic & lifestyle', items: ['Diabetes mellitus', 'Hypertension', 'Hypothyroidism', 'Dyslipidaemia'] },
      { title: 'Autoimmune', items: ['Rheumatoid arthritis', 'Multiple sclerosis', 'SLE', 'Other autoimmune conditions'] },
      { title: 'Respiratory', items: ['Asthma', 'Cough and cold', 'Other related conditions'] },
      { title: 'Renal & urinary', items: ['Kidney stones', 'Urinary infections', 'Chronic kidney disease', 'BPH'] },
      { title: 'Mental health & psychosomatic', items: ['Stress and anxiety disorders', 'Depression', 'Sleep disturbances', 'Other psychological conditions'] },
      { title: 'Geriatric health', items: ["Alzheimer's disease", 'Senile dementia'] },
      { title: 'Blood disorders', items: ['Anaemia', 'Immune disorders'] },
      { title: 'Other acute & chronic', items: ['Fever', 'Allergies'] },
    ],
    procedures: {
      title: 'Treatment offered',
      intro: "Chosen for each patient's condition, constitution and clinical needs.",
      items: [
        { name: 'Panchakarma therapies' },
        { name: 'Detoxification and bio-purification' },
        { name: 'Rejuvenation (Rasayana) therapies' },
        { name: 'Internal and external Ayurvedic medicines' },
        { name: 'Lifestyle management and dietary counselling' },
        { name: 'Preventive healthcare and immunity programmes' },
        { name: 'Mental health counselling and supportive therapies' },
        { name: 'Rehabilitation and supportive care' },
        { name: 'Personalised health promotion and wellness' },
      ],
    },
    clinics: {
      title: 'Speciality clinics & services',
      intro:
        'Dedicated clinics give comprehensive supportive care through condition-specific Ayurvedic treatment, personalised planning, diet and lifestyle guidance, rehabilitation and long-term follow-up.',
      items: [
        { name: 'Cancer Care Clinic', body: 'Supportive Ayurvedic care alongside conventional cancer treatment.' },
        { name: "Parkinson's Disease Clinic", body: "Long-term, individualised management of Parkinson's disease." },
        { name: 'Casualty OPD', body: 'Prompt assessment, emergency management and supportive care for acute medical presentations.' },
        {
          name: 'Out-patient & in-patient care',
          body: 'Individualised clinical assessment and treatment planning, with long-term follow-up and disease management.',
        },
      ],
    },
    closing: {
      quote:
        'Preserving the authenticity of Ayurvedic principles while applying them through clinical practice, education, research and evidence-based care — for better health, longevity and quality of life.',
    },
  },

  panchakarma: {
    formalName: 'Department of Panchakarma',
    headline: 'Detoxification and restorative therapies, prescribed for you',
    image: photo.panchakarmaBand,
    imageAlt: 'A Panchakarma therapy in progress at JSS Ayurveda Hospital',
    intro: [
      'Panchakarma is a specialised branch of Ayurveda dealing with detoxification and restorative therapies, with an emphasis on maintaining health and treating illness.',
      "The five principal procedures, together with a wide range of supporting therapies (Upakarma), are selected and given according to each person's Prakriti (body constitution), strength, age, digestive capacity and clinical condition.",
      'At JSS Ayurveda Hospital, the department provides comprehensive, individualised care under the supervision of qualified physicians, following classical Ayurvedic principles and patient-safety protocols.',
    ],
    groupsEyebrow: 'The five principal procedures',
    groupsTitle: 'Pancha karma — five ways the body is cleansed',
    groups: [
      { title: 'Vamana', classical: 'Therapeutic emesis', items: [] },
      { title: 'Virechana', classical: 'Therapeutic purgation', items: [] },
      { title: 'Basti', classical: 'Medicated enema', items: [] },
      { title: 'Nasya', classical: 'Nasal administration', items: [] },
      { title: 'Raktamokshana', classical: 'Therapeutic bloodletting', items: [] },
    ],
    clinics: {
      title: 'Neuro Speciality Clinic',
      intro:
        'Integrated rehabilitation through coordinated Ayurvedic therapies, physiotherapy, and speech and hearing services — aimed at improving functional recovery, mobility, communication and quality of life.',
      items: [
        {
          name: 'Neuro Speciality Clinic',
          body: 'Comprehensive, integrated Ayurvedic management for a wide range of neurological conditions.',
          items: [
            'Stroke',
            'Quadriparesis and paraparesis',
            'Post-laminectomy cases with neurological deficits',
            'Cervical and lumbar IVDP with radiculopathy',
            'Sensory neuropathy',
            'Motor neuron disease (MND)',
            "Parkinson's disease",
            'Hypoxic encephalopathy',
            'Multiple sclerosis',
            'Guillain–Barré syndrome (GBS)',
          ],
        },
      ],
    },
  },

  shalakyatantra: {
    formalName: 'Department of PG Studies in Shalakya Tantra',
    headline: 'Ayurvedic care for the eye, ear, nose, throat and mouth',
    image: photo.heroEyeClinic,
    imageAlt: 'An eye examination in the Shalakya Tantra clinic',
    intro: [
      'Shalakya Tantra provides preventive, promotive and curative care for diseases of the eyes, ears, nose, throat, oral cavity and related structures of the head and neck.',
      'The department combines classical Ayurvedic principles with appropriate modern clinical examination and diagnostics, for accurate assessment and individualised care — with particular emphasis on eye disorders and visual health, ear and hearing problems, nasal and sinus disorders, throat diseases and oral healthcare.',
    ],
    groupsEyebrow: 'Specialised clinical services',
    groupsTitle: 'From vision to voice',
    groups: [
      {
        title: 'Eye disorders',
        classical: 'Netra Roga',
        items: [
          'Refractive errors and visual complaints',
          'Computer vision syndrome and digital eye strain',
          'Dry eye and ocular surface disorders',
          'Allergic eye conditions',
          'Conjunctival disorders',
          'Blepharitis and eyelid disorders',
          'Corneal disorders, including selected corneal opacity and degenerative conditions',
          'Cataract assessment and referral for surgery',
          'Glaucoma screening and referral',
          'Retinal disorders needing evaluation and follow-up',
          'Age-related visual complaints',
          'Headache and eye strain with visual disturbance',
        ],
        note: 'Netra Kriyakalpas such as Netra Tarpana, Seka, Pindi and Bidalaka may be undertaken after clinical assessment, according to established indications and safety protocols.',
      },
      {
        title: 'Ear disorders',
        classical: 'Karna Roga',
        items: [
          'Earache and ear discomfort',
          'Earwax accumulation',
          'Tinnitus (ringing in the ears)',
          'Hearing difficulties needing evaluation',
          'Recurrent ear complaints',
          'Selected external ear disorders',
          'Ear symptoms with upper respiratory conditions',
          'Referral for audiological evaluation or specialised ENT care',
        ],
      },
      {
        title: 'Nasal & sinus disorders',
        classical: 'Nasa Roga',
        items: [
          'Allergic rhinitis (Pratishyaya)',
          'Chronic nasal congestion',
          'Recurrent rhinitis',
          'Sinusitis and sinus complaints',
          'Sneezing and nasal irritation',
          'Nasal dryness and discomfort',
          'Nasal symptoms from environmental allergies',
        ],
        note: 'Nasya Karma may be considered when clinically indicated.',
      },
      {
        title: 'Throat & larynx',
        classical: 'Mukha–Kantha Roga',
        items: [
          'Recurrent sore throat',
          'Pharyngitis and throat irritation',
          'Hoarseness of voice',
          'Tonsillar disorders',
          'Swallowing discomfort needing evaluation',
          'Recurrent upper respiratory complaints',
          'Selected oral and throat mucosal disorders',
        ],
        note: 'Patients who need advanced diagnostics or surgery are referred to the appropriate speciality.',
      },
      {
        title: 'Oral & dental',
        classical: 'Mukha & Danta Roga',
        items: [
          'Mouth ulcers and recurrent aphthous ulcers',
          'Gum (gingival) disorders',
          'Halitosis (bad breath)',
          'Oral mucosal disorders',
          'Burning sensation in the mouth',
          'Selected tongue disorders',
          'Dental and periodontal complaints needing evaluation',
        ],
      },
      {
        title: 'Preventive & promotive care',
        items: [
          'Eye health assessment and visual hygiene counselling',
          'Preventing digital eye strain',
          'Advice on lighting, reading habits and screen use',
          'Ear hygiene and hearing health awareness',
          'Nasal hygiene and allergy prevention',
          'Oral hygiene education',
          'Lifestyle and dietary guidance',
          'Recognising warning signs that need a specialist',
        ],
      },
    ],
    procedures: {
      title: 'Specialised Shalakya procedures',
      intro:
        'Based on classical Shalakya Tantra principles. Every procedure follows clinical assessment, a check for contraindications and the necessary safety precautions.',
      items: [
        { name: 'Netra Kriyakalpa', body: 'Tarpana, Putapaka, Aschyotana and Seka for the eyes, where indicated.' },
        { name: 'Nasya Karma', body: 'Medicated nasal administration for selected conditions.' },
        { name: 'Karna Purana', body: 'Medicated oil retained in the ear, for appropriate indications.' },
        { name: 'Gandusha & Kavala', body: 'Medicated mouth-holding and gargling for oral health.' },
      ],
    },
    clinics: {
      title: 'Academic & clinical training',
      intro:
        'The department trains postgraduate scholars in Ayurvedic ophthalmology, otorhinolaryngology and oral healthcare — so patients are seen in a teaching environment that keeps practice current.',
      items: [
        {
          name: 'Postgraduate programme',
          body: 'Classical texts studied alongside contemporary clinical knowledge.',
          items: [
            'Classical Shalakya Tantra texts',
            'Clinical examination and differential diagnosis',
            'Correlating Ayurvedic and contemporary concepts',
            'Training in Ayurvedic therapeutic procedures',
            'Case discussions, seminars and journal presentations',
            'Clinical research and evidence-based practice',
          ],
        },
      ],
    },
    closing: {
      quote:
        'Promoting sensory health and quality of life through classical knowledge, modern clinical assessment, individualised care, preventive education and postgraduate training.',
    },
  },

  'prasooti-streeroga': {
    formalName: 'Department of PG Studies in Prasuti Tantra & Stree Roga',
    headline: "Women's health at every stage of life",
    image: photo.consultation,
    imageAlt: 'A consultant speaking with a patient during an OPD consultation',
    intro: [
      'Prasuti Tantra is the Ayurvedic science of pregnancy, childbirth and maternal care; Stree Roga covers diseases of the female reproductive system.',
      "The department offers comprehensive Ayurvedic and evidence-based care for women from adolescence through the reproductive years, pregnancy, childbirth and menopause — integrating classical principles with modern diagnostics and treatment to support reproductive health, well-being and quality of life.",
    ],
    groupsEyebrow: 'Facilities & services',
    groupsTitle: 'Care from first period to menopause',
    groups: [
      { title: 'Preconception care', classical: 'Garbhadharana', items: ['Counselling and preparation for a healthy conception'] },
      {
        title: 'Antenatal care',
        classical: 'Garbhini Paricharya',
        items: [
          'Comprehensive care for mother and baby',
          'Standardised month-wise pregnancy diet',
          'Planned yoga teaching',
          'Specific Panchakarma therapy as required',
          'Birth management',
        ],
      },
      {
        title: 'Postnatal care',
        classical: 'Sutika Paricharya',
        items: ['Ayurvedic postpartum recovery', 'Specific diet, Panchakarma and yoga protocol'],
      },
      {
        title: 'Menstrual health clinic',
        items: ['Irregular menstruation', 'Dysmenorrhoea (painful periods)', 'Heavy menstrual bleeding', 'Scanty menstruation'],
      },
      { title: 'PCOS / PCOD', items: ['Individualised care for hormonal and menstrual disturbances'] },
      { title: 'Infertility', items: ['Evaluation and Ayurvedic management of female infertility'] },
      { title: 'Uterine fibroids', items: ['Consultation and individualised treatment'] },
      { title: 'Leucorrhoea', items: ['Evaluation and treatment of abnormal vaginal discharge with Ayurvedic local therapies'] },
      { title: 'Adolescent gynaecology', items: ['Counselling and care for menstrual and puberty-related concerns'] },
      { title: 'Menopausal care', items: ['Holistic management of menopausal symptoms'] },
      { title: 'Recurrent pregnancy loss', items: ['Evaluation and counselling'] },
      { title: 'Urinary tract infections', items: ['Comprehensive care for UTI'] },
    ],
    procedures: {
      title: 'Specialised Ayurvedic procedures',
      intro:
        'Panchakarma and specialised local procedures are provided wherever indicated, based on individual assessment — alongside preventive gynaecology, lifestyle and dietary counselling, yoga and health education.',
      items: [
        { name: 'Yoni Prakshalana', body: 'Vaginal cleansing procedures.' },
        { name: 'Yoni Pichu', body: 'Local therapeutic application.' },
        { name: 'Uttara Basti', body: 'A specialised procedure, when indicated.' },
        { name: 'Matra Basti', body: 'And other indicated Basti therapies.' },
        { name: 'Yoni Purana' },
        { name: 'Yoni Varti' },
        { name: 'Yoni Dhupana' },
        { name: 'Kshara Karma' },
        { name: 'Agni Karma' },
      ],
    },
    clinics: {
      title: 'Special OPDs',
      items: [
        {
          name: 'Infertility OPD',
          body: 'A specialised clinic for comprehensive Ayurvedic evaluation and individualised management of infertility of diverse causes — including women with previous unsuccessful IVF attempts — with the aim of improving reproductive health and conception outcomes.',
          facts: [{ label: 'Consultant', value: 'Dr. Usha D T' }],
        },
        {
          name: 'Peripheral OPD — JSS Women’s College',
          body: 'Consultation for students and staff at the Saraswathipuram campus.',
          facts: [
            { label: 'Consultant', value: 'Dr. Nanda K O' },
            { label: 'Day', value: 'Every Thursday' },
            { label: 'Time', value: '10:00 AM – 1:00 PM' },
          ],
        },
        {
          name: 'Peripheral OPD — JSS Women’s Polytechnic',
          body: 'Consultation at the SJCE campus.',
          facts: [
            { label: 'Consultant', value: 'Dr. Jyothika Hublikar' },
            { label: 'Day', value: 'Every Friday' },
            { label: 'Time', value: '10:00 AM – 1:00 PM' },
          ],
        },
      ],
    },
    closing: {
      quote: 'Matritva Samvardhanam, Stree Swasthya Rakshanam',
      translation: "Nurturing motherhood, protecting women's health.",
    },
  },

  shalyatantra: {
    formalName: 'Department of Shalyatantra',
    headline: 'Ayurvedic surgery and para-surgery, with a modern OT',
    image: archive.wardRound,
    imageAlt: 'Shalyatantra consultants on a ward round',
    intro: [
      'Shalyatantra is a well-established surgical department offering comprehensive Ayurvedic surgical care integrated with contemporary surgical principles. It runs dedicated in-patient and out-patient units, supported by a fully equipped Major Operation Theatre where a wide range of major and minor procedures are performed routinely.',
      'The department has extensive expertise in anorectal disorders through Ksharasutra therapy and other classical para-surgical procedures. Major surgery — haemorrhoidectomy, hernia repair, amputations, disarticulations, excisions, fasciotomies and wound debridement — is regularly undertaken, and chronic and complex wounds are managed with Maggot Debridement Therapy as part of routine practice.',
      'With its infrastructure, experienced faculty and specialised clinics, the department serves as a referral centre for advanced Ayurvedic surgical and para-surgical care, as well as for teaching and research.',
    ],
    groupsEyebrow: 'Surgical services',
    groupsTitle: 'What the department treats',
    groups: [
      {
        title: 'Anorectal disorders',
        items: ['Piles (haemorrhoids)', 'Anal fistula', 'Anal fissure', 'Fistulous tracts and sinuses'],
      },
      {
        title: 'Major surgery',
        items: ['Haemorrhoidectomy', 'Hernia repair', 'Amputations and disarticulations', 'Excision procedures', 'Fasciotomies', 'Wound debridement'],
      },
      {
        title: 'Wounds',
        items: ['Diabetic foot ulcers', 'Pressure sores', 'Chronic and non-healing wounds'],
      },
      {
        title: 'Swellings & growths',
        items: ['Sebaceous cysts', 'Lipomas', 'Warts and corns', 'Other localised growths'],
      },
      {
        title: 'Pain & musculoskeletal',
        items: ['Joint pain', 'Muscle pain', 'Other localised painful conditions'],
      },
    ],
    procedures: {
      title: 'Para-surgical procedures',
      intro: 'Each procedure is chosen for the patient’s specific condition and carried out under qualified medical supervision.',
      image: {
        src: photo.shalyaTheatre,
        alt: 'Surgeons operating in the Shalyatantra operation theatre',
      },
      items: [
        {
          name: 'Agnikarma',
          body: 'Controlled heat applied briefly to selected points with a specially heated instrument. Commonly used for joint pain, muscle pain and other localised pain, and may relieve pain and stiffness.',
        },
        {
          name: 'Ksharakarma',
          body: 'A specially prepared herbal alkaline medicine (Kshara) applied to remove unhealthy tissue — used for piles, anal fistula, fissure, warts, corns and certain localised growths.',
        },
        {
          name: 'Ksharasutra',
          body: 'A medicated thread coated with herbal and alkaline substances that gradually treats unhealthy tissue while supporting natural healing — for fistulous tracts, certain cysts and sinuses. Done in stages with regular review.',
        },
        {
          name: 'Jalaukavacharana',
          body: 'Leech therapy: selected medicinal leeches draw a small amount of blood to ease pain, swelling and local inflammation — used for some skin disorders, swellings and inflammatory conditions.',
        },
        {
          name: 'Siravyadha',
          body: 'Therapeutic venesection: a small amount of blood is removed from a selected vein with sterile technique, after assessing suitability. Performed only by a qualified Ayurvedic physician.',
        },
        {
          name: 'Chedana Karma',
          body: 'Surgical excision of abnormal tissue such as sebaceous cysts, lipomas and other localised growths, aiming to prevent recurrence and promote healing.',
        },
        {
          name: 'Maggot Debridement Therapy',
          body: 'Medically sterilised maggots remove dead or infected tissue while leaving healthy tissue largely untouched — for diabetic foot ulcers, pressure sores and chronic wounds where routine care is not enough.',
        },
      ],
    },
    clinics: {
      title: 'Dedicated clinics',
      items: [
        {
          name: 'Maggot Debridement Therapy Clinic',
          body: 'For chronic and non-healing wounds — diabetic foot ulcers, pressure sores and other wounds that have not responded to routine care.',
        },
        {
          name: 'Anushastra OPD',
          body: 'An exclusive OPD for Ayurvedic para-surgical procedures — Ksharakarma, Agnikarma, Jalaukavacharana and Siravyadha — for a wide range of surgical and musculoskeletal disorders.',
        },
      ],
    },
  },

  kaumarabhritya: {
    formalName: 'Department of PG Studies in Kaumarabhritya (Bala Roga)',
    headline: 'Comprehensive Ayurvedic healthcare for children',
    image: photo.unitNewbornCare,
    imageAlt: 'The newborn care unit at JSS Ayurveda Hospital',
    intro: [
      'Kaumarabhritya is the Ayurvedic speciality dedicated to child health, providing preventive, promotive and curative care for infants, children and adolescents.',
      'The department combines classical Ayurvedic principles with evidence-based paediatric assessment and diagnostics, with particular emphasis on nutrition, immunity, growth and development, neurodevelopmental disorders and childhood illness.',
    ],
    groupsEyebrow: 'Specialised clinical services',
    groupsTitle: 'Care for every stage of growing up',
    groups: [
      {
        title: 'Neurodevelopmental & neurological',
        items: [
          'Autism Spectrum Disorder (ASD)',
          'ADHD',
          'Cerebral palsy',
          'Developmental and global developmental delay',
          'Speech and language delay',
          'Intellectual disability',
          'Learning and behavioural difficulties',
          'Epilepsy and seizure disorders',
          'Neuromuscular disorders, including DMD',
        ],
      },
      {
        title: 'General paediatric care',
        items: [
          'Recurrent respiratory infections',
          'Bronchial asthma (Tamaka Shwasa)',
          'Allergic disorders',
          'Recurrent cough and cold',
          'Constipation, indigestion and abdominal complaints',
          'Nutritional deficiencies and anaemia',
          'Poor appetite and failure to thrive',
          'Childhood obesity and undernutrition',
          'Skin disorders',
          'Worm infestations',
          'Recurrent infections and low immunity',
          'Sleep and behavioural concerns',
        ],
      },
      {
        title: 'Growth, development & nutrition',
        items: [
          'Monitoring physical growth and milestones',
          'Nutritional status and dietary needs',
          'Infant and young child feeding guidance',
          'Breastfeeding and complementary feeding counselling',
          'Personalised diet advice',
          'Early identification of developmental delay',
        ],
      },
      {
        title: 'Swarnaprashana',
        classical: 'Every month',
        items: [
          'Monthly Swarnaprashana administration',
          'Paediatric health check and parental counselling',
          'Guidance on nutrition, hygiene and healthy habits',
        ],
      },
      {
        title: 'Neonatal care',
        items: ['Assessment, monitoring and supportive care for babies born at the hospital'],
      },
    ],
    procedures: {
      title: 'How we treat',
      items: [
        {
          name: 'Specialised physicians',
          body: 'Experienced Ayurvedic paediatricians providing expert consultation, assessment and individualised treatment.',
        },
        {
          name: 'Panchakarma for children',
          body: "Disease-specific procedures tailored to each child's age, health and clinical needs, after medical assessment.",
        },
      ],
    },
    clinics: {
      title: 'AYURVANI — satellite OPD',
      intro:
        'A specialised out-patient service at the JSS Institute of Speech and Hearing, Mysuru, for children with speech, communication and neurodevelopmental difficulties — bringing Ayurveda and speech-and-hearing rehabilitation together.',
      items: [
        {
          name: 'AYURVANI',
          body: 'Early identification, individualised care, functional improvement and family-centred support.',
          facts: [{ label: 'Venue', value: 'JSS Institute of Speech and Hearing, Mysuru' }],
          items: [
            'Speech and language delay',
            'Autism Spectrum Disorder',
            'Developmental and global developmental delay',
            'Cerebral palsy',
            'ADHD and other neurodevelopmental conditions',
            'Parental counselling and guidance',
            'Coordination with speech and language therapy',
          ],
        },
      ],
    },
    closing: {
      quote:
        "Supporting every child's journey towards better health, optimal growth and development, and a better quality of life.",
    },
  },
};

/** WordPress doctor-department slugs that differ from the OPD department slugs. */
const doctorDepartmentAliases: Record<string, string> = {
  'shalakya-tantra': 'shalakyatantra',
  'shalya-tantra': 'shalyatantra',
  swasthavritha: 'swasthavritta',
};

const opdCardSlugs = ['swasthavritta'];

/**
 * Where a doctor's "View department" link goes: the department page, its card
 * on /opd when it has no page yet, the Yoga & Naturopathy page, or nowhere for non-OPD departments
 * (Agada Tantra, Dravyaguna, Roganidana, Hospital Administration).
 */
export function departmentHref(doctorDepartmentSlug: string): string | null {
  const slug = doctorDepartmentAliases[doctorDepartmentSlug] ?? doctorDepartmentSlug;
  if (slug in departmentDetails) return `/opd/${slug}`;
  if (opdCardSlugs.includes(slug)) return `/opd#${slug}`;
  if (slug === 'yoga') return '/yoga-naturopathy';
  return null;
}
