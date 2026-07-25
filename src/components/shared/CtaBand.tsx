import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { contact } from '@/lib/site';

/**
 * The closing call-to-action that sits above the footer on every page.
 */
export function CtaBand({
  title = 'Discover the Power of Ayurveda for Optimal Health and Well-being',
  intro = 'JSS Ayurveda Hospital, Mysuru — where authentic healing has been our purpose since 1992. Take the first step today.',
  primary = { label: 'Book a Consultation', href: '/contact' },
  secondary,
}: {
  title?: string;
  intro?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-jade-950 py-20 text-sand-100 md:py-28">
      <AiImage slot="cta-band" className="absolute inset-0 -z-20 h-full w-full" showPrompt={false} sizes="100vw" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_140%_at_50%_0%,rgb(10_31_24/0.72)_0%,var(--color-jade-950)_75%)]"
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="container-page relative text-center">
        <Reveal>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-turmeric-400/40 bg-turmeric-400/10 text-turmeric-300 backdrop-blur">
            <Icon.lotus className="h-7 w-7" aria-hidden />
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mx-auto mt-7 max-w-3xl text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.12] text-sand-50">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-sand-200/80">{intro}</p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={primary.href} variant="secondary" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary?.href ?? contact.phones[0].href} variant="outline-light" size="lg">
              {secondary?.label ?? `Call ${contact.phones[0].display}`}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
