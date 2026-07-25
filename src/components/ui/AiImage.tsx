import Image from 'next/image';

import { imageSlotsById } from '@/lib/image-prompts';
import { cn } from '@/lib/utils';

/**
 * Renders an AI-image slot.
 *
 * If the slot has a `src` (i.e. the generated file has been dropped into
 * /public/ai and registered in lib/image-prompts.ts) it renders the real
 * photograph. Otherwise it renders a designed placeholder that states the slot
 * id, the exact pixel size to generate, and the prompt — so the page still
 * looks intentional and the outstanding work is self-documenting.
 */
export function AiImage({
  slot,
  className,
  imageClassName,
  sizes = '100vw',
  priority = false,
  showPrompt = true,
  overlay,
}: {
  slot: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the prompt text in tight layouts (still shows id + dimensions). */
  showPrompt?: boolean;
  /** Optional scrim rendered above the image, e.g. for text legibility. */
  overlay?: string;
}) {
  const config = imageSlotsById[slot];

  if (!config) {
    return (
      <div className={cn('grid place-items-center bg-clay-400/20 text-xs text-clay-600', className)}>
        Unknown image slot “{slot}”
      </div>
    );
  }

  if (config.src) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={config.src}
          alt={config.label}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
        {overlay ? <div aria-hidden className={cn('absolute inset-0', overlay)} /> : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-jade-900',
        className,
      )}
      role="img"
      aria-label={`Placeholder for ${config.label}`}
    >
      {/* Layered botanical gradient so the placeholder still reads as design */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,var(--color-jade-700)_0%,var(--color-jade-900)_45%,var(--color-jade-950)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(135deg,transparent_0_14px,var(--color-turmeric-300)_14px_15px)]"
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative flex h-full w-full flex-col justify-between gap-4 p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-turmeric-400/90 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-jade-950">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3 w-3" aria-hidden>
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
            </svg>
            AI image
          </span>
          <span className="rounded-full border border-sand-50/25 px-2.5 py-1 font-mono text-[0.6875rem] text-sand-200/90">
            {config.width} × {config.height}
          </span>
        </div>

        <div className="min-h-0">
          <p className="font-display text-lg leading-tight text-sand-50 md:text-xl">{config.label}</p>
          <p className="mt-1 font-mono text-[0.6875rem] text-turmeric-300">{config.id}</p>

          {showPrompt ? (
            <p className="mt-3 line-clamp-4 max-w-prose text-[0.75rem] leading-relaxed text-sand-200/70">
              {config.prompt}
            </p>
          ) : null}
        </div>
      </div>

      {overlay ? <div aria-hidden className={cn('absolute inset-0', overlay)} /> : null}
    </div>
  );
}
