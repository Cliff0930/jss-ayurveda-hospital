import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { insuranceInfo, nabhHighlight } from '@/content/home';
import { media } from '@/lib/media';
import { contact } from '@/lib/site';

/**
 * NABH accreditation and insurance, side by side directly under the hero.
 * Both panels carry the anchors the header's priority buttons point at.
 */
export function TrustBand() {
  return (
    <section className="relative bg-sand-50 pb-16 pt-4 md:pb-24">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <article
              id="nabh"
              className="relative isolate h-full overflow-hidden rounded-[2rem] bg-jade-900 p-8 text-sand-100 shadow-lift md:p-10"
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-turmeric-400/15 blur-3xl"
              />

              <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                <div className="shrink-0 rounded-[1.25rem] bg-white p-3 shadow-soft ring-4 ring-turmeric-400/30">
                  <Image
                    src={media.nabh}
                    alt="NABH accreditation mark"
                    width={400}
                    height={396}
                    quality={90}
                    className="h-24 w-24 object-contain md:h-28 md:w-28"
                  />
                </div>

                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-turmeric-300">
                    Quality you can trust
                  </p>
                  <h2 className="mt-2 text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] leading-tight text-sand-50">
                    {nabhHighlight.title}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-sand-200/85">{nabhHighlight.body}</p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 border-t border-sand-50/10 pt-7">
                {nabhHighlight.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-sand-100">
                    <Icon.check className="mt-0.5 h-5 w-5 shrink-0 text-turmeric-400" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article
              id="insurance"
              className="relative flex h-full flex-col rounded-[2rem] border border-sand-200 bg-white p-8 shadow-soft md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-turmeric-100 text-turmeric-800">
                  <Icon.shield className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-turmeric-700">
                    Insurance
                  </p>
                  <h2 className="mt-1 text-[clamp(1.4rem,1.1rem+0.9vw,1.9rem)] leading-tight">
                    {insuranceInfo.title}
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-500">{insuranceInfo.body}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-jade-800 px-4 py-2 text-[0.8125rem] font-semibold text-sand-50">
                  <Icon.check className="h-4 w-4 shrink-0 text-turmeric-300" aria-hidden />
                  Cashless: {insuranceInfo.cashless}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-turmeric-200 bg-turmeric-50 px-4 py-2 text-[0.8125rem] font-semibold text-jade-900">
                  <Icon.shield className="h-4 w-4 shrink-0 text-turmeric-700" aria-hidden />
                  {insuranceInfo.approval}
                </span>
              </div>

              <ul className="mt-6 grid gap-2.5">
                {insuranceInfo.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 rounded-xl bg-sand-50 px-4 py-3 text-[0.9375rem] text-ink-700"
                  >
                    <Icon.check className="h-4.5 w-4.5 shrink-0 text-jade-700" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 divide-y divide-sand-200 rounded-xl border border-sand-200">
                {insuranceInfo.lists.map((list) => (
                  <details key={list.title} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[0.9375rem] font-semibold text-jade-900 transition-colors hover:bg-sand-50 [&::-webkit-details-marker]:hidden">
                      <span>
                        {list.title}{' '}
                        <span className="font-normal text-ink-500">
                          ({list.items.length}{list.note ? ` · ${list.note.toLowerCase()}` : ''})
                        </span>
                      </span>
                      <Icon.chevronRight
                        className="h-4 w-4 shrink-0 text-jade-700 transition-transform duration-300 group-open:rotate-90"
                        aria-hidden
                      />
                    </summary>
                    <ul className="flex flex-wrap gap-2 px-4 pb-4 pt-1">
                      {list.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-sand-50 px-3 py-1.5 text-[0.8125rem] text-ink-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>

              <p className="mt-5 text-[0.8125rem] leading-relaxed text-sand-700">{insuranceInfo.note}</p>

              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <ButtonLink href={contact.phones[0].href} arrow>
                  Ask about your policy
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Send an enquiry
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
