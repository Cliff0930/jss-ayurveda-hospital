import type { Metadata } from 'next';

import { CopyButton } from '@/components/ui/CopyButton';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { imageSlots } from '@/lib/image-prompts';

export const metadata: Metadata = {
  title: 'AI Image Brief',
  description: 'Internal production brief: every AI image slot on the site, with size and prompt.',
  robots: { index: false, follow: false },
};

/**
 * Internal production page listing every AI image slot with its exact size and
 * prompt. Not linked from the site navigation and excluded in robots.ts.
 */
export default function ImageBriefPage() {
  const filled = imageSlots.filter((slot) => slot.src).length;

  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="AI Image Brief"
        crumbs={[{ label: 'Image Brief' }]}
        intro={`${imageSlots.length} image slots across the site — ${filled} filled, ${imageSlots.length - filled} still to generate. Generate at the stated size, save to /public/ai/<id>.webp, then set src on the slot in src/lib/image-prompts.ts.`}
      />

      <Section tone="cream">
        <div className="container-page">
          <div className="space-y-4">
            {imageSlots.map((slot, index) => (
              <article
                key={slot.id}
                className="rounded-card border border-sand-200 bg-white p-6 md:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[0.7rem] tracking-widest text-sand-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-[1.0625rem] leading-snug">{slot.label}</h2>
                      {slot.src ? (
                        <span className="rounded-full bg-jade-100 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-jade-800">
                          {slot.source ? 'Real photo' : 'Filled'}
                        </span>
                      ) : (
                        <span className="rounded-full bg-turmeric-100 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-turmeric-800">
                          To generate
                        </span>
                      )}
                    </div>

                    <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[0.8125rem] text-ink-500">
                      <div className="flex gap-1.5">
                        <dt className="text-sand-600">Slot id:</dt>
                        <dd className="font-mono text-jade-800">{slot.id}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-sand-600">Size:</dt>
                        <dd className="font-mono text-jade-800">
                          {slot.width} × {slot.height} px
                        </dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-sand-600">Save to:</dt>
                        <dd className="font-mono text-jade-800">/public/ai/{slot.id}.webp</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-sand-600">Used on:</dt>
                        <dd>{slot.usedOn}</dd>
                      </div>
                    </dl>

                    {slot.source ? (
                      <p className="mt-2 text-[0.8125rem] text-jade-800">
                        <span className="text-sand-600">Source: </span>
                        {slot.source}
                      </p>
                    ) : null}
                  </div>

                  <CopyButton text={slot.prompt} />
                </div>

                <p className="mt-4 rounded-xl bg-sand-50 p-4 text-[0.8125rem] leading-relaxed text-ink-700">
                  {slot.prompt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
