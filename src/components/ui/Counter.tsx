'use client';

import { useEffect, useRef, useState } from 'react';

import { formatNumber } from '@/lib/utils';

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Uses requestAnimationFrame with an ease-out curve rather than a timer, so the
 * number lands exactly on `value` regardless of frame rate, and respects
 * `prefers-reduced-motion` by rendering the final value immediately.
 */
export function Counter({
  value,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
