import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { mainNav } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-jade-950 pt-[calc(var(--header-height)+4rem)] pb-24 text-sand-100">
      <div aria-hidden className="grain absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-jade-700/30 blur-3xl"
      />

      <div className="container-page relative text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-turmeric-400/40 bg-turmeric-400/10 text-turmeric-300">
          <Icon.lotus className="h-8 w-8" aria-hidden />
        </span>

        <p className="mt-8 font-mono text-[0.8125rem] tracking-[0.3em] text-turmeric-300">ERROR 404</p>

        <h1 className="mx-auto mt-4 max-w-2xl text-[clamp(2rem,1.3rem+3vw,3.5rem)] leading-tight text-sand-50">
          This page seems to have wandered off the path
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-sand-200/80">
          The page you are looking for does not exist, or has moved. Let us help you find your way
          back.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="secondary" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">
            Contact the hospital
          </ButtonLink>
        </div>

        <nav aria-label="Popular pages" className="mt-14">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-sand-400/70">
            Or try one of these
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {mainNav
              .flatMap((item) => (item.children?.length ? item.children : [{ label: item.label, href: item.href }]))
              .slice(0, 10)
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full border border-sand-50/15 px-4 py-2 text-[0.8125rem] text-sand-200 transition hover:border-turmeric-400 hover:text-turmeric-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
