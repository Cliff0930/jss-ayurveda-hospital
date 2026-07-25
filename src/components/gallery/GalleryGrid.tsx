'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Lightbox, useLightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import type { GalleryGroup } from '@/lib/wp/queries';

/**
 * Album-filtered gallery with a lightbox.
 *
 * Albums come from the WordPress Gallery page (each heading becomes an album),
 * so adding a new album there adds a new filter pill here.
 */
export function GalleryGrid({ groups }: { groups: GalleryGroup[] }) {
  const [album, setAlbum] = useState('all');
  const lightbox = useLightbox();

  const images = useMemo(() => {
    const source = album === 'all' ? groups : groups.filter((group) => group.slug === album);
    return source.flatMap((group) =>
      group.images.map((image) => ({
        src: image.src,
        alt: image.alt || group.title,
        caption: group.title,
        width: image.width,
        height: image.height,
      })),
    );
  }, [groups, album]);

  if (groups.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-sand-300 bg-white/60 px-6 py-20 text-center">
        <p className="font-display text-xl text-jade-900">The gallery is not available right now</p>
        <p className="mt-2 text-[0.9375rem] text-ink-500">Please try again shortly.</p>
      </div>
    );
  }

  return (
    <>
      <div className="scroll-slim mb-10 flex gap-2 overflow-x-auto pb-2">
        <Pill active={album === 'all'} onClick={() => setAlbum('all')}>
          All
          <span className="ml-1.5 opacity-60">
            {groups.reduce((sum, group) => sum + group.images.length, 0)}
          </span>
        </Pill>
        {groups.map((group) => (
          <Pill key={group.slug} active={album === group.slug} onClick={() => setAlbum(group.slug)}>
            {group.title}
            <span className="ml-1.5 opacity-60">{group.images.length}</span>
          </Pill>
        ))}
      </div>

      {/* Masonry-style columns keep mixed aspect ratios from cropping awkwardly */}
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={Math.min(index, 10) * 40} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => lightbox.open(index)}
              className="group relative block w-full overflow-hidden rounded-xl border border-sand-200 bg-sand-100"
              aria-label={`Open image: ${image.caption}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1000}
                height={image.height ?? 750}
                sizes="(min-width: 1024px) 20rem, (min-width: 768px) 30vw, 45vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-jade-950/0 transition-colors duration-400 group-hover:bg-jade-950/25"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-jade-950/90 to-transparent p-3 text-left text-[0.75rem] font-medium text-sand-100 transition-transform duration-400 group-hover:translate-y-0">
                {image.caption}
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

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300',
        active
          ? 'border-jade-800 bg-jade-800 text-sand-50'
          : 'border-sand-200 bg-white text-ink-500 hover:border-jade-200 hover:text-jade-800',
      )}
    >
      {children}
    </button>
  );
}
