import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { process } from '@/content/home';
import { contact } from '@/lib/site';

export function Process() {
  return (
    <Section tone="white">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How It Works"
              title="Treat Your Body with the Care of Nature"
              intro="Every patient at JSS Ayurveda Hospital receives daily personal attention from their assigned doctor — from the first consultation to the last session. You are never alone in this process."
            />

            <Reveal delay={200}>
              <div className="mt-10 overflow-hidden rounded-card border border-sand-200">
                <AiImage
                  slot="consultation-room"
                  className="aspect-4/3 w-full"
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  showPrompt={false}
                />
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card border border-jade-100 bg-jade-50 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-jade-800 text-sand-50">
                  <Icon.phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-jade-600">
                    Need help? We&apos;re online
                  </p>
                  <a
                    href={contact.phones[0].href}
                    className="font-display text-xl text-jade-900 transition hover:text-turmeric-700"
                  >
                    {contact.phones[0].display}
                  </a>
                </div>
                <ButtonLink href="/contact" size="sm" className="ml-auto" arrow>
                  Book now
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Steps */}
          <ol className="relative space-y-6">
            <span
              aria-hidden
              className="absolute left-[2.1rem] top-6 hidden h-[calc(100%-6rem)] w-px bg-gradient-to-b from-turmeric-300 via-sand-300 to-transparent sm:block"
            />

            {process.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 110}>
                <div className="group relative flex gap-6 rounded-card border border-sand-200 bg-sand-50 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-turmeric-300 hover:bg-white hover:shadow-soft md:p-8">
                  <span className="relative z-10 grid h-[4.25rem] w-[4.25rem] shrink-0 place-items-center rounded-full border-4 border-sand-50 bg-jade-900 font-display text-2xl text-turmeric-300 transition-colors duration-400 group-hover:bg-turmeric-400 group-hover:text-jade-950">
                    {step.step}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-[1.125rem] leading-snug">{step.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
