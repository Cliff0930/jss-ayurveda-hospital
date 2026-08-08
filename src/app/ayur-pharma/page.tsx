import Image from 'next/image';
import type { Metadata } from 'next';

import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ayurPharma } from '@/content/misc';
import { photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'JSS Ayur Pharma',
  description:
    'JSS Ayur Pharma — the in-house GACP-compliant Ayur-Drug manufacturing unit of JSS Ayurveda Hospital, Mysuru. Churnas, Kashayams, Ghritams, Tailas and Avalehas prepared from our own 15-acre herbal garden.',
};

export default function AyurPharmaPage() {
  return (
    <>
      <PageHero
        eyebrow="JSS Ayur Pharma"
        title="From our garden. To your prescription."
        crumbs={[{ label: 'About', href: '/about' }, { label: 'JSS Ayur Pharma' }]}
        image={photo.ayurPharmaBanner}
        intro={ayurPharma.intro}
      >
        <ButtonLink href="/products" variant="secondary" arrow>
          See our products
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Four steps, all on one campus"
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ayurPharma.pillars.map((pillar, index) => {
              const Glyph = Icon[pillar.icon];
              return (
                <Reveal key={pillar.title} delay={index * 80}>
                  <article className="relative h-full rounded-card border border-sand-200 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:shadow-soft">
                    <span
                      aria-hidden
                      className="absolute right-5 top-5 font-mono text-[0.75rem] tracking-widest text-sand-400"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-800 text-sand-50">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{pillar.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{pillar.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift">
                <AiImage slot="pharmacy-unit" className="h-full w-full" sizes="(min-width: 1024px) 34rem, 90vw" showPrompt={false} />
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="What we prepare"
                title="Classical formulations, unchanged"
                intro="Our formulations follow the exact methods described in the Charaka Samhita, Sushruta Samhita and Ashtanga Hridaya. Nothing is substituted, nothing is shortened."
              />

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {ayurPharma.formulations.map((formulation, index) => (
                  <Reveal as="li" key={formulation} delay={index * 60}>
                    <div className="flex items-center gap-3 rounded-xl border border-sand-200 bg-sand-50 px-4 py-3.5">
                      <Icon.mortar className="h-4.5 w-4.5 shrink-0 text-turmeric-600" aria-hidden />
                      <span className="text-[0.875rem] text-ink-700">{formulation}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={340}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/products" arrow>
                    Explore our products
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="ghost">
                    Enquire about supply
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" compact>
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { src: photo.ingredients1, alt: 'Turmeric, ginger and dried herbs used in classical formulations' },
              { src: photo.ingredients2, alt: 'A prepared herbal formulation alongside its raw ingredients' },
              { src: photo.ingredients3, alt: 'Jars of churna powders and herbs from the campus garden' },
            ].map((image, index) => (
              <Reveal key={image.src} delay={index * 90}>
                <div className="relative aspect-4/3 overflow-hidden rounded-card border border-sand-200">
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
        </div>
      </Section>

      <CtaBand
        title="Medicines you can actually trace"
        intro="Every preparation used at JSS Ayurveda Hospital can be traced from the plant it came from to the patient it was prescribed for."
        primary={{ label: 'Enquire about products', href: '/contact' }}
        secondary={{ label: 'Our treatments', href: '/treatments' }}
      />
    </>
  );
}
