import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { consultOptions } from '@/content/home';
import { contact } from '@/lib/site';

const actions = {
  direct: { label: 'Get directions', href: contact.mapsUrl, external: true },
  online: { label: 'How to book', href: '/online-consultation', external: false },
  email: { label: 'Write to us', href: `mailto:${contact.email}`, external: false },
} as const;

export function ConsultOptions({ tone = 'white' }: { tone?: 'white' | 'cream' }) {
  return (
    <Section tone={tone} compact>
      <div className="container-page">
        <SectionHeading
          eyebrow="Ways to consult"
          title="Three ways to reach our doctors"
          intro="Visit us in person, consult online from home, or send your questions and reports by email. Consultants are also available on prior appointment."
          align="center"
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {consultOptions.map((option, index) => {
            const Glyph = Icon[option.icon];
            const action = actions[option.key];
            return (
              <Reveal as="li" key={option.key} delay={index * 90}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-sand-50 p-7 transition-all duration-400 hover:-translate-y-1 hover:border-jade-200 hover:bg-white hover:shadow-lift">
                  <span
                    aria-hidden
                    className="absolute right-6 top-5 font-display text-5xl leading-none text-sand-200 transition-colors duration-400 group-hover:text-turmeric-200"
                  >
                    {index + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-800 text-sand-50">
                    <Glyph className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.125rem] leading-snug">{option.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{option.body}</p>
                  <p className="mt-4 text-[0.8125rem] font-medium text-jade-800">{option.detail}</p>
                  <a
                    href={action.href}
                    {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.875rem] font-semibold text-jade-700 transition-colors hover:text-turmeric-700"
                  >
                    {action.label}
                    <Icon.arrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
