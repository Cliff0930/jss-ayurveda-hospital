import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { programs } from '@/content/home';

export function Programs() {
  return (
    <Section tone="white">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Wellness Programs"
            title="Get Empowered with Ayurvedic Programs"
            intro="Whether you need a complete body detox, a total rejuvenation or a focused therapeutic program — our doctors will design the right experience for you."
            className="max-w-2xl"
          />
          <Reveal delay={120}>
            <ButtonLink href="/wellness-packages" variant="ghost" arrow className="shrink-0">
              See all programs &amp; tariffs
            </ButtonLink>
          </Reveal>
        </div>

        {/* Editorial layout: first card spans two columns on large screens */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Reveal
              key={program.title}
              delay={(index % 3) * 80}
              className={index === 0 ? 'sm:col-span-2' : undefined}
            >
              <Link
                href="/wellness-packages"
                className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-card"
              >
                <Image
                  src={program.image}
                  alt=""
                  fill
                  sizes={index === 0 ? '(min-width: 640px) 44rem, 90vw' : '(min-width: 1024px) 22rem, 45vw'}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_31_24/0.15)_25%,rgb(10_31_24/0.9)_100%)]"
                />

                <div className="relative p-6 md:p-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-turmeric-400/95 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-jade-950">
                    <Icon.clock className="h-3 w-3" aria-hidden />
                    {program.duration}
                  </span>

                  <h3 className="mt-3 text-[1.35rem] leading-tight text-sand-50">{program.title}</h3>

                  <p
                    className={
                      index === 0
                        ? 'mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-sand-200/85'
                        : 'mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-sand-200/80'
                    }
                  >
                    {program.body}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-turmeric-300">
                    Read more
                    <Icon.arrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
