import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const Icon = {
  leaf: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 10-4.5 14-9 14Z" />
      <path d="M4 20c2-6 6-9 12-11" />
    </svg>
  ),
  lotus: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 21c-4 0-7.5-2.4-9-6 2-1.2 3.8-1.3 5.3-.6" />
      <path d="M12 21c4 0 7.5-2.4 9-6-2-1.2-3.8-1.3-5.3-.6" />
      <path d="M12 21c-3-2-4.5-5-4.5-8 0-3.4 1.6-6.2 4.5-8 2.9 1.8 4.5 4.6 4.5 8 0 3-1.5 6-4.5 8Z" />
    </svg>
  ),
  drop: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3s6 6.2 6 10.2A6 6 0 0 1 6 13.2C6 9.2 12 3 12 3Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  ),
  mortar: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 10h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8Z" />
      <path d="M12 18v3M8 21h8" />
      <path d="m14 10 5-6" />
    </svg>
  ),
  pulse: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M3 12h4l2.5-6 4 12L16 12h5" />
    </svg>
  ),
  sun: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  scale: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3v18M7 21h10" />
      <path d="M3 8h18M6 8l-3 6h6L6 8ZM18 8l-3 6h6l-3-6Z" />
    </svg>
  ),
  heart: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z" />
    </svg>
  ),
  brain: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M9 5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 9 19h.5V5H9Z" />
      <path d="M15 5a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 15 19h-.5V5H15Z" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  bed: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M3 18V7M3 12h18v6M21 18v-4" />
      <circle cx="7.5" cy="10.5" r="1.8" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6L16 13l5 1.5V18a3 3 0 0 1-3.3 3A17 17 0 0 1 3 6.3 3 3 0 0 1 6 3Z" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  chevronDown: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  chevronRight: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  ),
  download: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3v12M8 11l4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  ),
  play: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5.6c0-.8.9-1.3 1.6-.9l9 6.4c.6.4.6 1.4 0 1.8l-9 6.4c-.7.4-1.6-.1-1.6-.9V5.6Z" />
    </svg>
  ),
  quote: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M9.6 5.2C6.3 6.7 4.4 9.5 4.4 13v5.8h6.4v-6.4H7.9c0-2.3 1-3.9 3-4.9l-1.3-2.3Zm9.3 0c-3.3 1.5-5.2 4.3-5.2 7.8v5.8h6.4v-6.4h-2.9c0-2.3 1-3.9 3-4.9l-1.3-2.3Z" />
    </svg>
  ),
  facebook: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.6V4.3A20 20 0 0 0 14.3 4C12 4 10.5 5.4 10.5 8v2.4H8v3h2.5V21h3Z" />
    </svg>
  ),
  instagram: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z" />
    </svg>
  ),
  whatsapp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5s-.5-1.3-.7-1.7-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3A2.9 2.9 0 0 0 7 9.5c0 1.3.9 2.5 1 2.7a10.4 10.4 0 0 0 4 3.5c1.5.6 2 .6 2.8.5a2.5 2.5 0 0 0 1.6-1.2 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />
    </svg>
  ),
  sparkle: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.5 13.7 9l6.5 1.7-6.5 1.7L12 19l-1.7-6.6L3.8 10.7 10.3 9 12 2.5Z" />
    </svg>
  ),
  star: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="m5 12.5 5 5 9-11" />
    </svg>
  ),
  users: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.3a3.2 3.2 0 0 1 0 5.4M17.5 20a5.5 5.5 0 0 0-2-4.3" />
    </svg>
  ),
  chart: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 20v-6M12.5 20V9M17 20v-9" />
    </svg>
  ),
  recycle: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="m7 17-2.5-4 2-3.5M17 17l2.5-4-3.5-6h-4" />
      <path d="M4.5 17H10M14 17h5.5M12 3.5 10 7h4l-2-3.5Z" />
    </svg>
  ),
  building: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M4 21h16M9 21v-5h6v5" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" />
    </svg>
  ),

  /* ----------------------------------------------------------------------
     Clinical & anatomical set — each maps to a specific department, clinic or
     product so a card's glyph names its subject instead of decorating it.
     ---------------------------------------------------------------------- */

  /** Shalakyatantra — ENT & ophthalmology. */
  eye: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  /** Shalyatantra — surgery and para-surgical procedures. */
  scalpel: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M20.5 3.5a2.1 2.1 0 0 0-3 0L10 11v3h3l7.5-7.5a2.1 2.1 0 0 0 0-3Z" />
      <path d="M10 14 3.5 20.5" />
    </svg>
  ),

  /** Prasoothi & Streeroga, female infertility — obstetrics. */
  baby: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="6.5" r="3.6" />
      <path d="M10.6 6h.01M13.4 6h.01" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  ),

  /** Kaumarabhritya, Immuno Kidz — paediatrics. */
  child: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="5" r="2.6" />
      <path d="M12 8v6M8 10.5h8M9.5 21 12 14l2.5 7" />
    </svg>
  ),

  /**
   * Agni — the digestive fire, for metabolism.
   *
   * Deliberately asymmetric with a curled tip: a symmetric teardrop shape would
   * be indistinguishable from `drop` (Panchakarma), and the two appear in the
   * same services grid.
   */
  flame: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12.8 2.5c.5 2.7-.7 4.2-2.2 5.7-1.8 1.8-3.1 3.5-3.1 6a6 6 0 0 0 12 0c0-2.4-1.1-4.1-2.5-5.7-.4 1.4-1.2 2.2-2.1 2.7.7-2.9 1-6-.1-8.7Z" />
      <path d="M12 20a3 3 0 0 1-3-3c0-1.3.8-2.2 2-3.4" />
    </svg>
  ),

  /** Headache & migraine — head in profile with radiating pain. */
  head: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M14.5 21v-2.6c2.7-.9 4.5-3.4 4.5-6.4a7 7 0 0 0-13.9-1.1c-.1.7-.3 1.1-.7 1.6l-.9 1.2c-.4.6-.1 1.4.6 1.5l1.6.3V19a2 2 0 0 0 2 2Z" />
      <path d="M2.6 4.6 4 6M6.6 2.4 7 4.4M2 9.4h2" />
    </svg>
  ),

  /**
   * Liver clinic. The falciform fissure and the gallbladder dot are what make
   * this read as an organ rather than a blob at 20px — keep both if editing.
   */
  liver: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M2.6 9.4C2.6 7.6 4.1 6.5 6 6.2c4-.6 8.3-.7 12.3.2 1.9.4 3.2 1.5 3.2 3.3 0 4.2-3.4 7.7-7.6 8.6-1.9.4-3.6-.1-5-1.3l-1.7-1.4c-.9-.7-2-.9-3.1-.6" />
      <path d="M2.6 9.4c-.8 2.5-.6 5 .6 7.2" />
      <path d="M13.2 6.4c-.5 2.2-1 3.9-1.6 5.1" />
      <circle cx="15.6" cy="14.2" r="1.1" />
    </svg>
  ),

  /** Male infertility, functional medicine — genetics and root-cause work. */
  dna: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9" />
      <path d="M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9" />
      <path d="M9 6.5h6M8.5 12h7M9 17.5h6" />
    </svg>
  ),

  /** Arthritis, orthopaedic rehabilitation — joints. */
  bone: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="6.5" cy="17.5" r="3" />
      <circle cx="17.5" cy="6.5" r="3" />
      <path d="M8.6 15.4 15.4 8.6" />
    </svg>
  ),

  /** Post-Covid recovery — respiratory. */
  lungs: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 3v9" />
      <path d="M12 8c-1.5 0-2.5 1-3 2.5-.6 1.8-1.2 4-1.2 6 0 1.4.6 2.5 2 2.5h1.2c.7 0 1-.5 1-1.2Z" />
      <path d="M12 8c1.5 0 2.5 1 3 2.5.6 1.8 1.2 4 1.2 6 0 1.4-.6 2.5-2 2.5h-1.2c-.7 0-1-.5-1-1.2Z" />
    </svg>
  ),

  /** Consultation, clinical designation, medical education. */
  stethoscope: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M4.5 3h3M12.5 3h3" />
      <path d="M10 12v2.5a4.5 4.5 0 0 0 9 0V14" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),

  /** Qualifications and education. */
  graduation: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 10.8V15c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.2" />
      <path d="M21.5 8.5v5" />
    </svg>
  ),

  /** Geriatric mobility and gait rehabilitation. */
  walk: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <circle cx="13.5" cy="4.5" r="2.2" />
      <path d="M13 9 10.5 12.5 8 14.5" />
      <path d="M13 9l2.5 3v4l2 4.5" />
      <path d="M10.5 12.5 9.5 17 7 20.5" />
      <path d="M13.5 9.5 16.5 8" />
    </svg>
  ),

  /** Leave and attendance periods. */
  calendar: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </svg>
  ),

  copy: (p: IconProps) => (
    <svg {...stroke} {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5.5 15A2.5 2.5 0 0 1 4 12.5V6A2.5 2.5 0 0 1 6.5 3.5H13a2.5 2.5 0 0 1 2.5 2.5" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof Icon;
