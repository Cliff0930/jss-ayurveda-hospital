import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { signatureProcedures } from '@/content/clinical';

export function SignatureProcedures({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-5 lg:grid-cols-2">
        {signatureProcedures.map((procedure, index) => {
          const Glyph = Icon[procedure.icon];
          return (
            <Reveal key={procedure.slug} delay={index * 100}>
              <article
                id={procedure.slug}
                className="relative isolate flex h-full flex-col overflow-hidden rounded-card bg-jade-900 p-7 text-sand-100 shadow-lift md:p-9"
              >
                <div aria-hidden className="grain absolute inset-0 -z-10" />
                <div
                  aria-hidden
                  className="absolute -bottom-20 -right-16 -z-10 h-64 w-64 rounded-full bg-turmeric-400/15 blur-3xl"
                />

                <div className="flex items-start gap-4">
                  <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-turmeric-400 text-jade-950">
                    <Glyph className="h-6.5 w-6.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-turmeric-300">
                      {procedure.tagline}
                    </p>
                    <h3 className="mt-1 text-[1.5rem] leading-tight text-sand-50">{procedure.name}</h3>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-sand-200/85">{procedure.body}</p>

                <dl
                  className={`mt-6 grid gap-3 border-t border-sand-50/10 pt-6 ${
                    procedure.facts.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
                  }`}
                >
                  {procedure.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[0.875rem] leading-snug text-sand-50">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                {'calendar' in procedure ? (
                  <details className="group mt-6 rounded-xl border border-sand-50/15">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[0.875rem] font-semibold text-sand-50 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-2">
                        <Icon.calendar className="h-4 w-4 text-turmeric-300" aria-hidden />
                        {procedure.calendar.title}
                      </span>
                      <Icon.chevronRight
                        className="h-4 w-4 shrink-0 text-turmeric-300 transition-transform duration-300 group-open:rotate-90"
                        aria-hidden
                      />
                    </summary>
                    <ol className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 pb-4 pt-1 text-[0.8125rem] text-sand-200 sm:grid-cols-3">
                      {procedure.calendar.dates.map((date) => (
                        <li key={date}>{date}</li>
                      ))}
                    </ol>
                  </details>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
