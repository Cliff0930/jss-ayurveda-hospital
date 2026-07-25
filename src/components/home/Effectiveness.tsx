'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Section';
import { effectiveness } from '@/content/home';
import { media } from '@/lib/media';

/**
 * Outcome bars that fill once scrolled into view.
 *
 * The observer lives on the wrapper (not per-bar) so all four fill together as
 * a single visual gesture rather than staggering unpredictably.
 */
export function Effectiveness() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-jade-950 py-20 text-sand-100 md:py-28">
      <Image
        src={media.herbs}
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,var(--color-jade-950)_35%,rgb(10_31_24/0.7)_100%)]"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Step Closer to Health"
            tone="light"
            title="Measurable progress, tracked by your doctor"
            intro="Our personalised programs deliver improvement across all dimensions of health — reviewed daily by the consultant assigned to you throughout your stay."
          />

          <div ref={ref} className="space-y-7">
            {effectiveness.map((item, index) => (
              <Reveal key={item.label} delay={index * 90}>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[0.9375rem] font-medium text-sand-100">{item.label}</p>
                    <p className="font-display text-2xl text-turmeric-300 tabular-nums">{item.value}%</p>
                  </div>

                  <div
                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sand-50/12"
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={item.label}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-turmeric-500 to-turmeric-300 transition-[width] duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: active ? `${item.value}%` : '0%',
                        transitionDelay: `${index * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
