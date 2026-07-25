import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Orb, Section, SectionHeading } from '@/components/ui/Section';
import { philosophy, trustPoints } from '@/content/home';
import { media } from '@/lib/media';

export function Philosophy() {
  return (
    <Section tone="cream">
      <Orb className="-left-40 top-20 h-80 w-80" color="jade" />
      <Orb className="right-[-8rem] bottom-0 h-96 w-96" color="turmeric" />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <div className="relative aspect-4/5 w-[78%] overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src={media.faceMassage}
                  alt="An Ayurvedic face massage in progress at JSS Ayurveda Hospital"
                  fill
                  sizes="(min-width: 1024px) 26rem, 70vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="absolute bottom-6 right-0 aspect-square w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-sand-50 shadow-lift">
                <Image
                  src={media.chyawanprash}
                  alt="Classical Ayurvedic chyawanprash prepared in the hospital's own unit"
                  fill
                  sizes="(min-width: 1024px) 18rem, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="absolute -top-4 right-4 flex items-center gap-3 rounded-2xl bg-jade-900 px-5 py-4 text-sand-50 shadow-lift">
                <Icon.leaf className="h-7 w-7 text-turmeric-400" aria-hidden />
                <div className="text-[0.8125rem] leading-tight">
                  <p className="font-display text-xl">300+</p>
                  <p className="text-sand-400">herb species on campus</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={philosophy.eyebrow}
              title={philosophy.title}
              intro={philosophy.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 first:mt-0">
                  {paragraph}
                </p>
              ))}
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point, index) => {
                const Glyph = Icon[point.icon];
                return (
                  <Reveal as="li" key={point.title} delay={index * 80}>
                    <div className="group h-full rounded-card border border-sand-200 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-turmeric-300 hover:shadow-soft">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-jade-50 text-jade-700 transition-colors duration-300 group-hover:bg-turmeric-100 group-hover:text-turmeric-700">
                        <Glyph className="h-5.5 w-5.5" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-[1rem] leading-snug">{point.title}</h3>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-500">{point.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/about" arrow>
                  More About Us
                </ButtonLink>
                <p className="font-display text-[1.0625rem] italic text-jade-700">
                  “{philosophy.quote}”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
