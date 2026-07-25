'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Icon } from './Icons';

export type LightboxImage = { src: string; alt: string; caption?: string };

/**
 * Accessible image lightbox with keyboard navigation.
 *
 * Rendered as a fixed overlay rather than a <dialog> so the backdrop blur and
 * transitions work consistently across browsers. Focus is trapped by rendering
 * the close button first and returning focus on unmount.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const isOpen = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, go]);

  if (index === null) return null;
  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption ?? image.alt ?? 'Image viewer'}
      className="fixed inset-0 z-100 flex flex-col bg-jade-950/93 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-sand-200 md:px-8">
        <p className="font-mono text-xs tracking-wider">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="grid h-10 w-10 place-items-center rounded-full border border-sand-50/20 transition hover:bg-sand-50/10"
        >
          <Icon.close className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-16">
        {images.length > 1 ? (
          <NavButton side="left" onClick={() => go(-1)} />
        ) : null}

        <figure
          className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative h-full w-full">
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="90vw"
              className="animate-[jss-fade_0.35s_ease-out] object-contain"
              priority
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-4 text-center text-sm text-sand-300">{image.caption}</figcaption>
          ) : null}
        </figure>

        {images.length > 1 ? <NavButton side="right" onClick={() => go(1)} /> : null}
      </div>
    </div>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        'absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand-50/20 bg-jade-950/60 text-sand-100 transition hover:bg-jade-900 md:h-12 md:w-12',
        side === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4',
      )}
    >
      <Icon.chevronRight className={cn('h-5 w-5', side === 'left' && 'rotate-180')} />
    </button>
  );
}

/** Convenience hook wiring a grid of thumbnails to the lightbox. */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  return { index, open: setIndex, close: () => setIndex(null), navigate: setIndex };
}
