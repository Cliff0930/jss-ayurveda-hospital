import Image from 'next/image';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { whyUs } from '@/content/home';
import { photo } from '@/lib/media';
import { site } from '@/lib/site';

export function WhyUs() {
  return (
    <Section tone="cream">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Nature's Gift for Your True Health — Prepared with Skill and Care"
              intro="At JSS Ayurveda Hospital, every aspect of your care is rooted in authenticity. Our medicines are grown in our own herbal garden, prepared in our own manufacturing unit and prescribed by doctors trained in classical Ayurvedic science. There are no shortcuts here."
            />

            <ol className="mt-12 space-y-px overflow-hidden rounded-card border border-sand-200 bg-sand-200">
              {whyUs.map((reason, index) => (
                <Reveal as="li" key={reason.title} delay={index * 90}>
                  <div className="flex gap-5 bg-white p-6 transition-colors hover:bg-sand-50 md:p-7">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-turmeric-300 font-display text-lg text-turmeric-700">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] leading-snug">{reason.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{reason.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Quote panel */}
          <Reveal delay={160}>
            <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={photo.whyChooseUs}
                alt="A therapist performing Shirodhara, a warm medicated oil stream over the forehead"
                fill
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_31_24/0.25)_30%,rgb(10_31_24/0.92)_100%)]"
              />
              <div aria-hidden className="grain absolute inset-0" />

              <figure className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <Icon.quote className="h-9 w-9 text-turmeric-400" aria-hidden />
                <blockquote className="mt-4">
                  <p className="font-display text-[1.5rem] leading-snug text-sand-50 md:text-[1.75rem]">
                    We heal you — and we teach you how to stay healthy.
                  </p>
                </blockquote>
                <figcaption className="mt-4 text-[0.875rem] text-turmeric-300">
                  {site.name}, {site.city}
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
