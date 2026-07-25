'use client';

import Image from 'next/image';

import { Lightbox, useLightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import type { ParsedImage } from '@/lib/wp/parse';

/**
 * Department treatment posters, read from the WordPress Packages page.
 * Click any poster to view it full size.
 */
export function PosterGrid({ posters }: { posters: ParsedImage[] }) {
  const lightbox = useLightbox();

  if (posters.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
        <p className="font-display text-xl text-jade-900">Department packages are not available right now</p>
        <p className="mt-2 text-[0.9375rem] text-ink-500">
          Please try again shortly, or contact us for current tariffs and availability.
        </p>
      </div>
    );
  }

  const images = posters.map((poster, index) => ({
    src: poster.src,
    alt: poster.alt || `Department treatment package poster ${index + 1}`,
    caption: poster.alt || undefined,
  }));

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {posters.map((poster, index) => (
          <Reveal key={poster.src} delay={(index % 4) * 80}>
            <button
              type="button"
              onClick={() => lightbox.open(index)}
              aria-label={`View package poster ${index + 1} full size`}
              className="group relative block w-full overflow-hidden rounded-card border border-sand-200 bg-white shadow-soft transition-all duration-400 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[991/1400]">
                <Image
                  src={poster.src}
                  alt={poster.alt || `Department treatment package ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
              <span
                aria-hidden
                className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-jade-950/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <span className="rounded-full bg-sand-50 px-4 py-2 text-[0.75rem] font-semibold text-jade-900">
                  View full size
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightbox.index}
        onClose={lightbox.close}
        onNavigate={lightbox.navigate}
      />
    </>
  );
}
