import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { AiImage } from './AiImage';
import { Icon } from './Icons';
import { Orb } from './Section';
import { Reveal } from './Reveal';

export type Crumb = { label: string; href?: string };

/**
 * The banner every inner page opens with.
 *
 * Accepts either a real WordPress image (`image`) or an AI image slot
 * (`imageSlot`); falls back to a pure gradient when neither is given.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  image,
  imageSlot,
  align = 'left',
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageSlot?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-jade-950 pt-[calc(var(--header-height)+3.5rem)] pb-16 text-sand-100 md:pb-24">
      {/* Background layer */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {image ? (
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : imageSlot ? (
          <AiImage slot={imageSlot} className="h-full w-full" showPrompt={false} priority />
        ) : null}
      </div>

      {/*
        Legibility scrim, kept light enough that the photograph clearly shows
        through. On small screens the copy spans the full width, so a vertical
        gradient is used; from `md` up it becomes diagonal — dark under the
        heading on the left, fading to near-clear on the right where the image
        carries the section.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_31_24/0.86)_0%,rgb(10_31_24/0.66)_55%,rgb(10_31_24/0.82)_100%)] md:bg-[linear-gradient(105deg,rgb(10_31_24/0.9)_0%,rgb(10_31_24/0.68)_38%,rgb(10_31_24/0.32)_68%,rgb(10_31_24/0.12)_100%)]"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10 opacity-60" />
      <Orb className="-top-28 right-[-6rem] h-96 w-96" color="turmeric" />

      <div className="container-page relative">
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {crumbs.length > 0 ? (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol
                  className={cn(
                    'flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-sand-300/80',
                    align === 'center' && 'justify-center',
                  )}
                >
                  <li>
                    <Link href="/" className="transition hover:text-turmeric-300">
                      Home
                    </Link>
                  </li>
                  {crumbs.map((crumb) => (
                    <li key={crumb.label} className="flex items-center gap-2">
                      <Icon.chevronRight className="h-3.5 w-3.5 text-sand-400/60" aria-hidden />
                      {crumb.href ? (
                        <Link href={crumb.href} className="transition hover:text-turmeric-300">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-sand-100">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          ) : null}

          {eyebrow ? (
            <Reveal delay={60}>
              <p className={cn('eyebrow mt-7 text-turmeric-300', align === 'center' && 'eyebrow-center')}>
                {eyebrow}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={110}>
            <h1 className="mt-4 text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] leading-[1.06] text-sand-50">
              {title}
            </h1>
          </Reveal>

          {intro ? (
            <Reveal delay={180}>
              <div className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-sand-200/85">{intro}</div>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal delay={240}>
              <div className="mt-9">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
