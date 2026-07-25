import Image from 'next/image';
import type { Metadata } from 'next';

import { Testimonials } from '@/components/home/Testimonials';
import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { products, productsPurity } from '@/content/misc';
import { media } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Authentic Ayurvedic products from JSS Ayurveda Hospital, Mysuru — Immune Booster Kit, Hitayu Kit for post-Covid recovery and Immuno Kidz, prepared in our own GACP-compliant Ayur-Drug Manufacturing Unit.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Take the healing home"
        crumbs={[{ label: 'Our Products' }]}
        imageSlot="products-range"
        intro="All products from JSS Ayurveda Hospital are formulated by our in-house Ayurvedic doctors using the same authentic ingredients and classical formulations used in our hospital treatments. Safe, natural and genuinely effective."
      >
        <ButtonLink href="/contact" variant="secondary" arrow>
          Enquire about products
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="The range"
            title="Doctor-formulated, organically prepared"
            align="center"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {products.map((product, index) => {
              const Glyph = Icon[product.icon];
              return (
                <Reveal key={product.name} delay={(index % 2) * 90}>
                  <article className="group flex h-full gap-5 rounded-card border border-sand-200 bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:border-turmeric-300 hover:shadow-soft md:p-8">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-jade-50 text-jade-700 transition-colors duration-400 group-hover:bg-turmeric-100 group-hover:text-turmeric-800">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[1.125rem] leading-snug">{product.name}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{product.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Purity */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-4/5 w-[78%] overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={media.chyawanprash}
                    alt="Classical Ayurvedic preparation made in the hospital's own unit"
                    fill
                    sizes="(min-width: 1024px) 26rem, 70vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-6 right-0 aspect-square w-[52%] overflow-hidden rounded-[1.5rem] border-[6px] border-white shadow-lift">
                  <AiImage
                    slot="herbal-garden-macro"
                    className="h-full w-full"
                    sizes="18rem"
                    showPrompt={false}
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow={productsPurity.eyebrow}
                title={productsPurity.title}
                intro={productsPurity.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              />

              <Reveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" arrow>
                    Enquire about products
                  </ButtonLink>
                  <ButtonLink href="/ayur-pharma" variant="ghost">
                    About JSS Ayur Pharma
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Manufacturing */}
      <Section tone="cream" compact>
        <div className="container-page">
          <SectionHeading
            eyebrow="Where it is made"
            title="Our own GACP-compliant manufacturing unit"
            intro="Nothing is outsourced. Every Churna, Kashayam, Ghritam, Taila and Avaleha is prepared on our campus, from herbs grown on our campus."
            align="center"
          />

          <Reveal delay={120}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-sand-200">
              <AiImage slot="pharmacy-unit" className="aspect-2/1 w-full" sizes="100vw" showPrompt={false} />
            </div>
          </Reveal>
        </div>
      </Section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
