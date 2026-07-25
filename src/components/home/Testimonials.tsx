'use client';

import { useCallback, useEffect, useState } from 'react';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { testimonials } from '@/content/home';
import { initials } from '@/lib/utils';

const ROTATE_MS = 8000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const active = testimonials[index];

  return (
    <Section tone="sand">
      <div className="container-page">
        <SectionHeading
          eyebrow="Patient Stories"
          title="Healing, in their own words"
          align="center"
        />

        <div
          className="relative mx-auto mt-14 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Reveal>
            <figure
              className="relative rounded-[2rem] border border-sand-200 bg-white p-8 shadow-soft md:p-14"
              aria-live="polite"
            >
              <Icon.quote
                className="absolute -top-5 left-8 h-12 w-12 text-turmeric-300/70 md:left-12"
                aria-hidden
              />

              <blockquote key={active.name} className="animate-[jss-fade_0.5s_ease-out]">
                <p className="font-display text-[clamp(1.2rem,1rem+0.9vw,1.75rem)] leading-[1.5] text-jade-900">
                  {active.quote}
                </p>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-jade-800 font-display text-lg text-sand-50"
                >
                  {initials(active.name)}
                </span>
                <span>
                  <span className="block font-semibold text-jade-900">{active.name}</span>
                  <span className="block text-[0.875rem] text-ink-500">{active.location}</span>
                </span>
                <span className="ml-auto flex gap-0.5 text-turmeric-400" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, star) => (
                    <Icon.star key={star} className="h-4 w-4" aria-hidden />
                  ))}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-sand-300 bg-white text-jade-800 transition hover:border-jade-300 hover:bg-jade-50"
            >
              <Icon.chevronRight className="h-4.5 w-4.5 rotate-180" aria-hidden />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, dot) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => go(dot)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={dot === index}
                  className={
                    dot === index
                      ? 'h-2 w-7 rounded-full bg-turmeric-500 transition-all duration-300'
                      : 'h-2 w-2 rounded-full bg-sand-300 transition-all duration-300 hover:bg-sand-400'
                  }
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-sand-300 bg-white text-jade-800 transition hover:border-jade-300 hover:bg-jade-50"
            >
              <Icon.chevronRight className="h-4.5 w-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
