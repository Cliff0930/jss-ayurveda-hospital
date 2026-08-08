'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { videoStories, type VideoStory } from '@/content/home';

/**
 * "Watch Our Stories" — patients describing their treatment in their own words.
 *
 * Nothing is fetched or embedded until a card is clicked: the grid is four
 * poster images, and only then does a player mount in a dialog. That keeps the
 * homepage free of third-party video weight (and, for YouTube, of third-party
 * cookies) for the large majority of visitors who never press play.
 */

/** A story is only shown if it actually has something to play. */
const playable = videoStories.filter((story) => story.youtubeId || story.src);

export function VideoStories() {
  const [active, setActive] = useState<VideoStory | null>(null);

  if (playable.length === 0) return null;

  return (
    <Section tone="jade-deep">
      <div className="container-page">
        <SectionHeading
          eyebrow="Watch Our Stories"
          title="Patients, in their own words"
          intro="Short, unscripted films recorded at the hospital — no actors and no script, just patients describing what they came in with and what changed."
          align="center"
          tone="light"
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {playable.map((story, index) => (
            <Reveal as="li" key={story.name} delay={index * 90}>
              <button
                type="button"
                onClick={() => setActive(story)}
                className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-sand-100/15 bg-jade-900 text-left transition duration-500 hover:border-turmeric-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turmeric-400"
              >
                <span className="relative block aspect-9/16 w-full">
                  <Image
                    src={story.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20rem, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_31_24/0.15)_35%,rgb(10_31_24/0.9)_100%)]"
                  />

                  {/* Play affordance */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sand-50/95 text-jade-900 shadow-lift transition duration-500 group-hover:scale-110 group-hover:bg-turmeric-400"
                  >
                    <Icon.play className="ml-0.5 h-6 w-6" />
                  </span>

                  <span
                    aria-hidden
                    className="absolute right-3 top-3 rounded-full bg-jade-950/70 px-2.5 py-1 font-mono text-[0.6875rem] text-sand-100"
                  >
                    {story.duration}
                  </span>
                </span>

                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-[1.0625rem] leading-snug text-sand-50">
                    {story.name}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-sand-200/80">
                    {story.context}
                  </span>
                </span>

                <span className="sr-only">Play the video testimonial from {story.name}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {active ? <StoryDialog story={active} onClose={() => setActive(null)} /> : null}
    </Section>
  );
}

/**
 * The player itself, in a modal dialog. Mounted only while a story is open, so
 * closing it stops playback by unmounting rather than by pausing.
 *
 * Rendered through a portal on `document.body`: every `Section` sets `isolate`,
 * which would otherwise trap this inside the section's stacking context and let
 * the fixed header paint over the video.
 */
function StoryDialog({ story, onClose }: { story: VideoStory; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
    document.addEventListener('keydown', handleKey);
    // The page behind must not scroll while the dialog owns the screen.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = overflow;
    };
  }, [handleKey]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonial from ${story.name}`}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-jade-950/92 p-4 animate-[jss-fade_0.25s_ease-out] md:p-6"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-sand-100/25 text-sand-100 transition hover:border-turmeric-400 hover:text-turmeric-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric-400 md:right-6 md:top-6"
      >
        <Icon.close className="h-5 w-5" aria-hidden />
      </button>

      {/*
        Height-led sizing: the clip is portrait, so the viewport's height is
        what runs out first. Width follows from the 9:16 ratio, and the second
        term keeps it inside narrow screens where width runs out instead.
      */}
      <div
        className="relative aspect-9/16 h-[min(76dvh,calc((100vw-2rem)*16/9))] overflow-hidden rounded-[1.5rem] bg-black shadow-lift"
        onClick={(event) => event.stopPropagation()}
      >
        {story.youtubeId ? (
          <iframe
            // youtube-nocookie keeps the visitor out of YouTube's ad cookies
            // until they actually watch something.
            src={`https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`Video testimonial from ${story.name}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <video
            src={story.src}
            poster={story.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-contain"
          />
        )}
      </div>

      <p className="text-center text-[0.9375rem] text-sand-200/85">
        <span className="font-semibold text-sand-50">{story.name}</span> · {story.context}
      </p>
    </div>,
    document.body,
  );
}
