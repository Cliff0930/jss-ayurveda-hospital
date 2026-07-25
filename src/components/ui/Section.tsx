import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Reveal } from './Reveal';

type Tone = 'cream' | 'white' | 'jade' | 'jade-deep' | 'sand';

const tones: Record<Tone, string> = {
  cream: 'bg-sand-50 text-ink-700',
  white: 'bg-white text-ink-700',
  sand: 'bg-sand-100 text-ink-700',
  jade: 'bg-jade-800 text-sand-100',
  'jade-deep': 'bg-jade-950 text-sand-100',
};

export function Section({
  children,
  tone = 'cream',
  id,
  className,
  compact = false,
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden',
        compact ? 'py-14 md:py-20' : 'py-20 md:py-28 lg:py-32',
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  /** `light` inverts the type colours for use on jade backgrounds. */
  tone?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn('eyebrow', align === 'center' && 'eyebrow-center', tone === 'light' && 'text-turmeric-300')}>
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          'mt-4 text-[clamp(1.75rem,1.15rem+2.1vw,2.85rem)] leading-[1.15]',
          tone === 'light' && 'text-sand-50',
        )}
      >
        {title}
      </h2>

      {intro ? (
        <div
          className={cn(
            'mt-5 text-[1.0625rem] leading-relaxed',
            tone === 'light' ? 'text-sand-200/85' : 'text-ink-500',
          )}
        >
          {intro}
        </div>
      ) : null}

      {children}
    </Reveal>
  );
}

/** Decorative blurred orb used to give flat sections depth. */
export function Orb({
  className,
  color = 'turmeric',
}: {
  className?: string;
  color?: 'turmeric' | 'jade' | 'sand';
}) {
  const colors = {
    turmeric: 'bg-turmeric-300/25',
    jade: 'bg-jade-400/20',
    sand: 'bg-sand-300/40',
  };

  return (
    <div
      aria-hidden
      className={cn(
        'animate-breathe pointer-events-none absolute -z-10 rounded-full blur-3xl',
        colors[color],
        className,
      )}
    />
  );
}
