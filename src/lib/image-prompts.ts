/**
 * AI image slots.
 *
 * Every slot below is a place where the design wants a photograph that does not
 * exist in the WordPress media library yet. Each entry carries the exact pixel
 * size and a ready-to-use generation prompt.
 *
 * HOW TO FILL A SLOT
 * ------------------
 *   1. Generate the image using `prompt` at the stated `width` × `height`.
 *   2. Save it to `public/ai/<id>.webp` (or .jpg).
 *   3. Set `src: '/ai/<id>.webp'` on that slot below.
 *
 * `src` also accepts a remote URL from an allowlisted host — several slots below
 * are already filled with genuine hospital photography from jssamch.org (see
 * `archive` in lib/media.ts) rather than a generated image. A real photograph of
 * the actual room or therapy always beats a generated one, so a slot is only
 * left open where no suitable photograph exists.
 *
 * Until `src` is set, <AiImage> renders a branded placeholder showing the slot
 * id, the exact dimensions and the prompt — so nothing looks broken and the
 * remaining work is visible on the page itself.
 *
 * A full printable list is generated at /image-brief.
 */

export type ImageSlot = {
  id: string;
  /** Short human label for the brief. */
  label: string;
  /** Where it appears, for the brief. */
  usedOn: string;
  width: number;
  height: number;
  prompt: string;
  /** A local /ai/… path, or a remote URL from an allowlisted host. */
  src?: string;
  /** Where a filled image came from, when it is not AI-generated. */
  source?: string;
};

import { archive, media } from './media';

const SHARED_STYLE =
  'Photorealistic editorial photography, natural daylight, warm and calm colour grade of deep forest green, sandalwood beige, turmeric gold and cream. Authentic South Indian Ayurvedic hospital in Mysuru, Karnataka. Indian people, respectful and dignified. Clean, uncluttered composition with generous negative space. No text, no logos, no watermarks, no distorted hands or faces.';

export const imageSlots: ImageSlot[] = [
  {
    id: 'home-hero',
    label: 'Homepage hero — healing hands & herbs',
    usedOn: 'Home / hero background',
    width: 2400,
    height: 1600,
    prompt: `Wide cinematic hero image: a serene Ayurvedic treatment hall at golden hour, warm sunlight falling through tall arched windows onto a polished dark-teak massage table with a folded white cotton sheet, small brass vessels of medicated oil, fresh green herbs and marigold petals on a stone tray. Soft haze in the air, depth of field, no people. Composition weighted to the right so headline text can sit on the left third. ${SHARED_STYLE}`,
  },
  {
    id: 'home-hero-portrait',
    label: 'Homepage hero — vertical accent',
    usedOn: 'Home / hero floating card',
    width: 900,
    height: 1200,
    prompt: `Vertical portrait: an experienced Indian Ayurvedic doctor in a crisp white coat over traditional attire, mid-40s, warmly listening to a patient off-frame, seated in a sunlit consultation room with wooden shelves of labelled herbal jars behind. Gentle, trustworthy expression, hands relaxed. Shallow depth of field. ${SHARED_STYLE}`,
  },
  {
    id: 'campus-aerial',
    label: 'Campus aerial at the foothills',
    usedOn: 'About / campus band, Facilities',
    width: 2400,
    height: 1200,
    prompt: `Aerial drone photograph of a 15-acre green hospital campus at the foothills of Chamundi Hills, Mysuru, early morning. Low white and terracotta buildings surrounded by dense medicinal herb gardens, coconut palms, walking paths, water tanks, and mist over the hills in the background. Lush and peaceful. ${SHARED_STYLE}`,
  },
  {
    id: 'herbal-garden-macro',
    label: 'Herbal garden — close detail',
    usedOn: 'About, Products / in-house preparation',
    width: 1600,
    height: 1000,
    prompt: `Close photograph of hands of an Indian gardener gently harvesting fresh tulsi and brahmi leaves into a woven cane basket in a dew-covered medicinal herb garden at sunrise. Water droplets on leaves, soft backlight, rich greens. ${SHARED_STYLE}`,
    src: archive.herbalGarden,
    source: 'jssamch.org — doctors and students in the campus herbal garden',
  },
  {
    id: 'pharmacy-unit',
    label: 'Ayur-Drug manufacturing unit',
    usedOn: 'Products, JSS Ayur Pharma',
    width: 1600,
    height: 1000,
    prompt: `Interior of a clean, well-lit traditional Ayurvedic medicine manufacturing unit: large polished copper and steel vessels simmering herbal decoction, technicians in white coats and hairnets working carefully, rows of labelled glass jars of churna powders, stainless steel work surfaces. Steam and warm light, GMP-clean but traditional in character. ${SHARED_STYLE}`,
    src: archive.pharmacyCounter,
    source: 'jssamch.org — the hospital’s in-house pharmacy counter',
  },
  {
    id: 'panchakarma-therapy',
    label: 'Panchakarma therapy in progress',
    usedOn: 'Home / programs, Treatments',
    width: 1600,
    height: 1100,
    prompt: `An Ayurvedic Abhyanga therapy in progress: two trained Indian therapists in white uniforms performing a synchronised warm oil massage on a patient lying on a carved wooden Droni table, the patient's modesty fully covered with white cloth. Brass oil pot, folded towels, herbal steam chamber in soft focus behind. Respectful, clinical yet warm. ${SHARED_STYLE}`,
    src: archive.therapyAbhyanga,
    source: 'jssamch.org — Abhyanga performed on a Droni in the therapy wing',
  },
  {
    id: 'consultation-room',
    label: 'Doctor consultation / Prakruti assessment',
    usedOn: 'OPD, How it works',
    width: 1400,
    height: 1000,
    prompt: `An Ayurvedic doctor performing Nadi Pariksha (pulse diagnosis) — three fingers gently on a seated patient's wrist across a wooden desk in a bright consultation room. Notebook, brass bell, small potted plant, framed anatomy chart on the wall. Focus on the hands, patient softly blurred. ${SHARED_STYLE}`,
    src: archive.doctorPatient,
    source: 'jssamch.org — a consultant greeting an in-patient on the ward',
  },
  {
    id: 'yoga-hall',
    label: 'Yoga hall session',
    usedOn: 'Facilities / campus facilities',
    width: 1600,
    height: 1000,
    prompt: `A calm morning yoga session in an airy hall with polished stone floor and open windows looking onto green hills. Eight adults of mixed ages on cotton mats in a seated pranayama posture, a trained Indian yoga guru guiding at the front. Soft directional morning light, dust motes in the air. ${SHARED_STYLE}`,
    src: archive.yogaDay,
    source: 'jssamch.org — International Day of Yoga 2025 session on the campus',
  },
  {
    id: 'sattvic-kitchen',
    label: 'Sattvic dietary kitchen',
    usedOn: 'Facilities / campus facilities',
    width: 1400,
    height: 1000,
    prompt: `A spotless traditional Indian hospital kitchen preparing sattvic vegetarian meals: a cook plating steamed rice, dal, seasonal vegetables and a small bowl of buttermilk onto a stainless steel thali. Fresh vegetables and herbs on the counter, large brass pots, warm overhead light. Wholesome and hygienic. ${SHARED_STYLE}`,
  },
  {
    id: 'room-general',
    label: 'General ward',
    usedOn: 'Facilities / accommodation',
    width: 1200,
    height: 900,
    prompt: `A clean, bright general ward in an Ayurvedic hospital: four neatly made beds with white linen, bedside lockers, large windows with green view, polished floor, ceiling fans, no people. Simple, dignified and spotless. ${SHARED_STYLE}`,
  },
  {
    id: 'room-semi-special',
    label: 'Semi-special ward',
    usedOn: 'Facilities / accommodation',
    width: 1200,
    height: 900,
    prompt: `A semi-private hospital room with two beds separated by a light curtain, white linen, attached toilet door, bedside lockers, a single chair for an attendant, wide window with garden view, no people. ${SHARED_STYLE}`,
  },
  {
    id: 'room-special',
    label: 'Special ward',
    usedOn: 'Facilities / accommodation',
    width: 1200,
    height: 900,
    prompt: `A single-occupancy private hospital room: one bed with crisp white linen, wooden side table with a brass water jug, attendant chair, framed botanical print, large window with sheer curtain and green view, no people. ${SHARED_STYLE}`,
  },
  {
    id: 'room-deluxe',
    label: 'Deluxe ward',
    usedOn: 'Facilities / accommodation',
    width: 1200,
    height: 900,
    prompt: `A wide deluxe hospital room with warm wooden flooring, a single bed with white linen and a cotton throw, air conditioner, wall-mounted television, a comfortable armchair, writing desk, and a large window framing the green Chamundi Hills, no people. Boutique-hotel calm with clinical cleanliness. ${SHARED_STYLE}`,
    src: archive.roomDeluxe,
    source: 'jssamch.org — the actual deluxe room, with AC, television and wardrobe',
  },
  {
    id: 'room-ultra-deluxe',
    label: 'Ultra deluxe suite',
    usedOn: 'Facilities / accommodation',
    width: 1200,
    height: 900,
    prompt: `An ultra-deluxe hospital suite: bedroom and small sitting area, teak furniture, cream upholstery, brass accent lamp, fresh flowers in a vase, private balcony doors opening onto a garden, soft evening light, no people. Premium yet serene and understated. ${SHARED_STYLE}`,
    src: archive.roomUltraDeluxe,
    source: 'jssamch.org — the actual ultra deluxe suite, bedroom plus seating area',
  },
  {
    id: 'physiotherapy-suite',
    label: 'Physiotherapy department',
    usedOn: 'Physiotherapy',
    width: 1600,
    height: 1000,
    prompt: `A modern physiotherapy and rehabilitation room in an Indian hospital: parallel bars, exercise mats, therapy balls, a treatment couch, ultrasound therapy unit, and a physiotherapist in a white coat guiding a middle-aged patient through a gentle knee exercise. Bright, clean, encouraging atmosphere. ${SHARED_STYLE}`,
  },
  {
    id: 'products-range',
    label: 'JSS product range still life',
    usedOn: 'Products / hero',
    width: 1400,
    height: 1000,
    prompt: `Elegant still-life of traditional Ayurvedic products on a dark stone surface: amber glass bottles of medicated oil, ceramic jars of churna powder, a kashayam bottle, a small brass measuring spoon, dried herbs and a cinnamon stick scattered around. Dramatic side light, deep shadows, premium apothecary feel. Unbranded plain labels only. ${SHARED_STYLE}`,
    src: media.turmericWide,
    source: 'WordPress media — turmeric root and powder, a core Ayurvedic ingredient',
  },
  {
    id: 'speciality-clinic',
    label: 'Speciality clinic care',
    usedOn: 'Specialities / hero',
    width: 1600,
    height: 1100,
    prompt: `A senior Indian Ayurvedic consultant explaining a treatment plan to an elderly patient and their adult daughter across a consultation desk, all seated, warm and reassuring body language, sunlight from a side window, wooden shelves of classical Sanskrit texts behind. ${SHARED_STYLE}`,
    src: archive.wardRound,
    source: 'jssamch.org — a consultant and nurse reviewing an in-patient',
  },
  {
    id: 'international-patient',
    label: 'International patient welcome',
    usedOn: 'Home / testimonials, Wellness packages',
    width: 1400,
    height: 1000,
    prompt: `A European woman in her fifties in comfortable cotton clothes walking a garden path on a South Indian Ayurvedic hospital campus alongside an Indian nurse, both smiling in conversation, tall trees and herb beds either side, morning light. Warm, welcoming, unposed. ${SHARED_STYLE}`,
    src: archive.therapyKizhi,
    source: 'jssamch.org — Patra Pinda Sweda (Kizhi) rejuvenation therapy',
  },
  {
    id: 'cta-band',
    label: 'Closing call-to-action band',
    usedOn: 'Global CTA before footer',
    width: 2400,
    height: 900,
    prompt: `Wide atmospheric banner: a long stone corridor of a South Indian hospital opening onto a green herbal garden, warm late-afternoon light streaming across the floor in long diagonals, a few potted medicinal plants along the wall, no people. Very dark and moody so white text overlays cleanly. ${SHARED_STYLE}`,
    src: archive.lobby,
    source: 'jssamch.org — the main hospital atrium and ceremonial lamp',
  },
  {
    id: 'transparency-band',
    label: 'Transparency / records band',
    usedOn: 'Staff, Attendance, Waste data headers',
    width: 2000,
    height: 800,
    prompt: `Abstract editorial photograph representing institutional transparency in healthcare: an orderly wall of pale wooden card-index drawers with brass label holders, softly lit from the left, shallow depth of field, one drawer slightly open. Calm, precise, archival. ${SHARED_STYLE}`,
    src: archive.nursingStation,
    source: 'jssamch.org — the hospital nursing station with staff on duty',
  },
  {
    id: 'waste-management',
    label: 'Bio-medical waste handling',
    usedOn: 'Waste data / context card',
    width: 1400,
    height: 900,
    prompt: `A clean, well-organised hospital bio-medical waste segregation station: colour-coded yellow, red, blue and black bins in a row with clear pictogram lids, a trained staff member in gloves and mask correctly disposing of material, spotless tiled floor, safety signage without readable text. Clinical, responsible and orderly. ${SHARED_STYLE}`,
  },
  {
    id: 'legacy-portrait',
    label: 'Institutional legacy',
    usedOn: 'About JSS Mahavidyapeetha',
    width: 1600,
    height: 1000,
    prompt: `A dignified wide photograph of a historic South Indian educational institution building in Mysuru at golden hour — colonial-era stone architecture with arches and columns, mature trees, students walking in the distance, warm light on the facade. Timeless and respectful. ${SHARED_STYLE}`,
    src: media.founders,
    source: 'WordPress media — the founders of JSS Mahavidyapeetha',
  },
];

export const imageSlotsById: Record<string, ImageSlot> = Object.fromEntries(
  imageSlots.map((slot) => [slot.id, slot]),
);

export type ImageSlotId = string;
