import Image from 'next/image';
import type { Metadata } from 'next';

import { Achievements } from '@/components/home/Achievements';
import { WhyUs } from '@/components/home/WhyUs';
import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Orb, Section, SectionHeading } from '@/components/ui/Section';
import { trustPoints } from '@/content/home';
import { aboutStory } from '@/content/misc';
import { media, photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'JSS Ayurveda Hospital, Mysuru — established 1992, NABH accredited, set on a 15-acre campus at the foothills of the Chamundi Hills with over 300 species of medicinal herbs and 26 therapy rooms.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Rooted in ancient wisdom. Guided by genuine care."
        crumbs={[{ label: 'About Us' }]}
        image={photo.aboutBanner}
        intro="Healing since 1992 — on a peaceful 15-acre campus at the foothills of the Chamundi Hills, Mysuru."
      />

      {/* Story */}
      <Section tone="cream">
        <Orb className="-left-32 top-24 h-80 w-80" color="jade" />
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow={aboutStory.eyebrow}
                title={aboutStory.title}
                intro={aboutStory.paragraphs.map((paragraph) => (
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
                      <div className="h-full rounded-card border border-sand-200 bg-white p-5">
                        <Glyph className="h-6 w-6 text-turmeric-600" aria-hidden />
                        <h3 className="mt-3 text-[0.9375rem] leading-snug">{point.title}</h3>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">{point.body}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>

              <Reveal delay={320}>
                <ButtonLink href="/about/jss-mahavidyapeetha" variant="ghost" arrow className="mt-8">
                  About JSS Mahavidyapeetha
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="relative">
                <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={photo.campusPortrait}
                    alt="Medicinal plants growing in the herbal garden on the JSS Ayurveda Hospital campus"
                    fill
                    sizes="(min-width: 1024px) 32rem, 90vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-2xl bg-jade-900 p-6 text-sand-50 shadow-lift sm:block">
                  <Icon.leaf className="h-7 w-7 text-turmeric-400" aria-hidden />
                  <p className="mt-3 font-display text-3xl">15</p>
                  <p className="text-[0.8125rem] text-sand-300">acre campus at the Chamundi foothills</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="white" compact>
        <div className="container-page">
          <SectionHeading eyebrow="Our Journey" title="Three decades of authentic Ayurveda" align="center" />

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {aboutStory.milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year} delay={index * 110}>
                <div className="relative h-full rounded-card border border-sand-200 bg-sand-50 p-7">
                  <span
                    aria-hidden
                    className="absolute right-6 top-6 font-display text-5xl text-sand-200"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.14em] text-turmeric-700">
                    {milestone.year}
                  </p>
                  <h3 className="mt-3 text-[1.125rem] leading-snug">{milestone.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{milestone.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Achievements />

      {/* Campus band */}
      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Campus"
            title="A place designed to heal before treatment even begins"
            intro="Lush greenery, a thriving herbal garden, clean air and the quiet of the foothills — patients frequently tell us the environment itself begins to heal them."
            align="center"
          />

          <Reveal delay={100}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-sand-200">
              <AiImage slot="campus-aerial" className="aspect-2/1 w-full" sizes="100vw" showPrompt={false} />
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              { src: media.environment1, alt: 'The green environment of the hospital campus' },
              { src: media.campusWard, alt: 'A patient ward at JSS Ayurveda Hospital' },
              { src: media.garden1, alt: 'Medicinal plants in the campus herbal garden' },
            ].map((image, index) => (
              <Reveal key={image.src} delay={index * 90}>
                <div className="relative aspect-4/3 overflow-hidden rounded-card">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 24rem, 90vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260}>
            <div className="mt-10 text-center">
              <ButtonLink href="/gallery" variant="ghost" arrow>
                See the full gallery
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <WhyUs />
      <CtaBand />
    </>
  );
}
