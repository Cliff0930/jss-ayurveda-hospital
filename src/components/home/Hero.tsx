'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { hero, heroSlides } from '@/content/home';
import { media } from '@/lib/media';
import { contact } from '@/lib/site';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  // Autoplay stops while the pointer or keyboard focus is inside the slider, and
  // never runs at all for visitors who ask for reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % heroSlides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const active = heroSlides[index];

  return (
    <section
      className="relative isolate min-h-[min(100svh,56rem)] overflow-hidden bg-jade-950 pb-16 pt-[calc(var(--header-height)+3rem)] text-sand-100 md:pb-20 lg:pt-[calc(var(--header-height)+5rem)]"
      aria-roledescription="carousel"
      aria-label="JSS Ayurveda Hospital"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        if (start === null || end === undefined) return;
        const delta = end - start;
        if (Math.abs(delta) > 55) go(index + (delta < 0 ? 1 : -1));
        touchStartX.current = null;
      }}
    >
      {/* Slides */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.image}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-out',
              slideIndex === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              priority={slideIndex === 0}
              className={cn(
                'object-cover',
                slideIndex === index && !reducedMotion && 'animate-kenburns',
              )}
            />
          </div>
        ))}
      </div>

      {/*
        Legibility scrim, kept as light as the text allows so the photographs
        stay clearly visible — that is the whole point of the slider.

        Small screens get a vertical scrim (the copy spans the full width there);
        from `md` up it becomes diagonal, heavy only under the headline on the
        left and nearly clear on the right where the image does the talking.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_31_24/0.82)_0%,rgb(10_31_24/0.66)_45%,rgb(10_31_24/0.78)_100%)] md:bg-[linear-gradient(100deg,rgb(10_31_24/0.92)_0%,rgb(10_31_24/0.72)_34%,rgb(10_31_24/0.34)_64%,rgb(10_31_24/0.1)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-sand-50 to-transparent"
      />

      {/*
        The copy column is deliberately capped at half the width and nothing is
        placed beside it: the right-hand side of the hero is left empty so the
        photograph behind it carries that area. The slider caption sits below,
        in the strip the statistics rail used to occupy — those figures already
        appear in full in the Achievements section further down the page.
      */}
      <div className="container-page relative">
        <div>
          {/* Copy */}
          <div className="max-w-2xl">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-turmeric-400/35 bg-turmeric-400/10 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-turmeric-200 backdrop-blur">
                <Icon.sparkle className="h-3.5 w-3.5" aria-hidden />
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 text-[clamp(2.3rem,1.2rem+4.2vw,4.4rem)] font-normal leading-[1.03] text-sand-50">
                An Ancient Key For{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-gold italic">Total Wellbeing</span>
                  <svg
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-2.5 w-full text-turmeric-400/60"
                  >
                    <path
                      d="M2 8C60 3 120 2 180 5c40 2 80 4 118 2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-sand-200/85 md:text-[1.125rem]">
                {hero.intro}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={hero.primary.href} variant="secondary" size="lg" arrow>
                  {hero.primary.label}
                </ButtonLink>
                <ButtonLink href={hero.secondary.href} variant="outline-light" size="lg">
                  {hero.secondary.label}
                </ButtonLink>
              </div>
            </Reveal>

            {/*
              NABH accreditation and the phone number sit in normal document flow
              rather than as absolutely-positioned floating cards — the previous
              floating badge was being clipped by the visual cluster beside it.
            */}
            <Reveal delay={330}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-sand-50/20 bg-jade-950/55 py-2.5 pl-2.5 pr-4 backdrop-blur-md">
                  <Image
                    src={media.nabh}
                    alt=""
                    width={400}
                    height={396}
                    className="h-10 w-10 shrink-0 rounded-lg bg-sand-50 object-contain p-1"
                  />
                  <span className="text-[0.8125rem] leading-tight">
                    <span className="block font-semibold text-sand-50">NABH Accredited</span>
                    <span className="block text-sand-400">Quality &amp; patient-safety certified</span>
                  </span>
                </div>

                <a
                  href={contact.phones[0].href}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-sand-50/20 bg-jade-950/55 py-2.5 pl-2.5 pr-4 backdrop-blur-md transition hover:border-turmeric-400/60"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-turmeric-400 text-jade-950">
                    <Icon.phone className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="text-[0.8125rem] leading-tight">
                    <span className="block text-sand-400">Consultation on call</span>
                    <span className="block font-semibold text-sand-50 transition group-hover:text-turmeric-300">
                      {contact.phones[0].display}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Slider caption + controls */}
          <Reveal delay={300}>
            <div className="mt-14 w-full max-w-3xl rounded-[1.5rem] border border-sand-50/15 bg-jade-950/60 p-6 backdrop-blur-xl md:mt-16 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div aria-live="polite" className="min-w-0">
                  <p className="font-display text-[1.25rem] leading-snug text-sand-50">{active.title}</p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-sand-300/80">
                    {active.caption}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[0.75rem] tracking-widest text-turmeric-300 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                  <span className="text-sand-500">/{String(heroSlides.length).padStart(2, '0')}</span>
                </p>
              </div>

              {/* Thumbnails double as the slide picker */}
              <ul className="mt-6 flex gap-2">
                {heroSlides.map((slide, slideIndex) => (
                  <li key={slide.image} className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => go(slideIndex)}
                      aria-label={`Show slide ${slideIndex + 1}: ${slide.title}`}
                      aria-current={slideIndex === index}
                      className={cn(
                        'relative block aspect-4/3 w-full overflow-hidden rounded-lg border transition-all duration-300',
                        slideIndex === index
                          ? 'border-turmeric-400 opacity-100'
                          : 'border-sand-50/20 opacity-55 hover:opacity-90',
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous slide"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sand-50/25 text-sand-100 transition hover:border-turmeric-400 hover:bg-sand-50/10"
                >
                  <Icon.chevronRight className="h-4.5 w-4.5 rotate-180" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next slide"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sand-50/25 text-sand-100 transition hover:border-turmeric-400 hover:bg-sand-50/10"
                >
                  <Icon.chevronRight className="h-4.5 w-4.5" aria-hidden />
                </button>

                {/* Progress bar — also signals that autoplay has paused */}
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-sand-50/15">
                  <div
                    key={`${index}-${paused}-${reducedMotion}`}
                    className="h-full rounded-full bg-turmeric-400"
                    style={{
                      animation:
                        paused || reducedMotion
                          ? undefined
                          : `jss-hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                      width: paused || reducedMotion ? '100%' : undefined,
                    }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes jss-hero-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
