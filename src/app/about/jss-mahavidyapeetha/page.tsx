import Image from 'next/image';
import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Counter } from '@/components/ui/Counter';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { mahavidyapeetha } from '@/content/misc';
import { media, photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'About JSS Mahavidyapeetha',
  description:
    'JSS Mahavidyapeetha — founded in 1954 by His Holiness Jagadguru Dr. Sri Shivarathri Rajendra Mahaswamiji, the parent organisation of JSS Ayurveda Hospital, with 300+ institutions across India and abroad.',
};

export default function MahavidyapeethaPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Parent Institution"
        title="A legacy of service since 1954"
        crumbs={[{ label: 'About', href: '/about' }, { label: 'JSS Mahavidyapeetha' }]}
        imageSlot="legacy-portrait"
        intro="Founded by His Holiness Jagadguru Dr. Sri Shivarathri Rajendra Mahaswamiji — guiding generations from Mysuru to the world."
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src={photo.founders}
                  alt="The founders of JSS Mahavidyapeetha"
                  fill
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="About JSS Mahavidyapeetha"
                title="A century of service through education"
                intro={mahavidyapeetha.intro}
              />

              <ul className="mt-9 space-y-3">
                {mahavidyapeetha.points.map((point, index) => (
                  <Reveal as="li" key={point} delay={index * 70}>
                    <div className="flex gap-3.5">
                      <Icon.check className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-600" aria-hidden />
                      <p className="text-[0.9375rem] leading-relaxed text-ink-500">{point}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <section className="relative isolate overflow-hidden bg-jade-900 py-16 text-sand-100 md:py-20">
        <div aria-hidden className="grain absolute inset-0" />
        <div className="container-page relative">
          <p className="eyebrow eyebrow-center mx-auto text-turmeric-300">The Mahavidyapeetha at a glance</p>
          <dl className="mt-10 grid gap-10 sm:grid-cols-3">
            {mahavidyapeetha.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <dt className="font-display text-[clamp(2.6rem,1.8rem+2.4vw,3.6rem)] leading-none text-sand-50">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-3 font-display text-lg text-turmeric-300">{stat.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Reach */}
      <Section tone="white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Reach"
            title="Education for all — from kindergarten to postdoctoral research"
            intro={mahavidyapeetha.reach}
            align="center"
          />

          <Reveal delay={120}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-sand-200">
              <Image
                src={media.visionMission}
                alt="The vision and mission of JSS Mahavidyapeetha"
                width={1920}
                height={661}
                sizes="100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Divisions */}
      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Key Divisions"
            title="Serving society across every field"
            intro="The Mahavidyapeetha's work spans education, healthcare and community welfare — carried out by hundreds of institutions working towards one mission."
            align="center"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {mahavidyapeetha.divisions.map((division, index) => {
              const Glyph = Icon[division.icon];
              return (
                <Reveal key={division.title} delay={index * 100}>
                  <article className="h-full rounded-card border border-sand-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-50 text-jade-700">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{division.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{division.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={340}>
            <div className="mt-12 rounded-[2rem] border border-jade-100 bg-jade-50 p-8 text-center md:p-12">
              <h3 className="mx-auto max-w-2xl text-[1.5rem] leading-snug">
                Explore the world of JSS Mahavidyapeetha
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-500">
                JSS Ayurveda Hospital is one of the many institutions carrying this legacy forward.
                Discover the Mahavidyapeetha&apos;s full story, institutions and initiatives on the
                official website.
              </p>
              <ButtonLink
                href="https://jssonline.org/about-jss-mahavidyapeetha/"
                className="mt-7"
                arrow
              >
                Visit jssonline.org
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Healing is one part of a much older mission"
        intro="JSS Ayurveda Hospital carries the Mahavidyapeetha's founding principle into healthcare — selfless service, available to all."
        primary={{ label: 'About the hospital', href: '/about' }}
        secondary={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  );
}
