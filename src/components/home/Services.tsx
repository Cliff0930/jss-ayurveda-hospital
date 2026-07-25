import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { services } from '@/content/home';

export function Services() {
  return (
    <Section tone="white" id="services">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Offer"
          title="A Complete Range of Ayurvedic Services"
          intro="From your first consultation to your last therapy session — JSS Ayurveda Hospital provides a full spectrum of authentic Ayurvedic care, all under one roof on our peaceful 15-acre campus."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Glyph = Icon[service.icon];
            return (
              <Reveal key={service.title} delay={(index % 4) * 70}>
                <article className="group relative h-full overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-jade-900">
                  {/* Hover wash */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-jade-800 to-jade-950 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                  />

                  <div className="relative">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-50 text-jade-700 transition-colors duration-500 group-hover:bg-turmeric-400 group-hover:text-jade-950">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>

                    <h3 className="mt-5 text-[1.0625rem] leading-snug transition-colors duration-500 group-hover:text-sand-50">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-500 transition-colors duration-500 group-hover:text-sand-300/85">
                      {service.body}
                    </p>

                    <span
                      aria-hidden
                      className="mt-5 inline-block font-mono text-[0.7rem] tracking-widest text-sand-400 transition-colors duration-500 group-hover:text-turmeric-300"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
