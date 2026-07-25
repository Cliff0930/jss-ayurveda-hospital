import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-jade-800 text-sand-50 shadow-[0_10px_30px_-12px_rgb(18_53_41/0.7)] hover:bg-jade-900 hover:shadow-[0_16px_40px_-14px_rgb(18_53_41/0.8)] hover:-translate-y-0.5',
  secondary:
    'bg-turmeric-400 text-jade-950 shadow-[0_10px_30px_-12px_rgb(210_140_37/0.8)] hover:bg-turmeric-300 hover:-translate-y-0.5',
  ghost: 'text-jade-800 hover:bg-jade-50 border border-transparent hover:border-jade-100',
  light: 'bg-sand-50 text-jade-900 hover:bg-white hover:-translate-y-0.5 shadow-soft',
  'outline-light': 'border border-sand-50/35 text-sand-50 hover:bg-sand-50/10 hover:border-sand-50/60',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8rem]',
  md: 'h-11 px-6 text-[0.875rem]',
  lg: 'h-13 px-8 text-[0.9375rem]',
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Renders a trailing arrow that slides on hover. */
  arrow?: boolean;
};

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M5 12h13M12 5l7 7-7 7" />
  </svg>
);

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  arrow,
  ...props
}: ButtonBaseProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  arrow,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  const isExternal = typeof href === 'string' && /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        {arrow ? <Arrow /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}
