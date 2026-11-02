import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Section';
import { contact, site } from '@/lib/site';

export function LocationMap() {
  return (
    <section className="relative bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Find us"
            title={`${site.name} on the map`}
            intro={contact.addressOneLine}
            className="max-w-2xl"
          />
          <Reveal delay={120}>
            <ButtonLink href={contact.mapsUrl} arrow className="shrink-0">
              Open in Google Maps
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-sand-200 bg-sand-200 shadow-lift">
            <iframe
              src={contact.mapsEmbed}
              title={`Map showing the location of ${site.name}, ${site.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[28rem] w-full border-0 md:h-[36rem] lg:h-[40rem]"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto">
              <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-jade-950/90 px-5 py-4 text-sand-50 shadow-lift backdrop-blur">
                <Icon.pin className="h-6 w-6 shrink-0 text-turmeric-400" aria-hidden />
                <div className="text-[0.875rem] leading-snug">
                  <p className="font-display text-[1.0625rem]">{site.name}</p>
                  <p className="text-sand-300">Lalithadripura Road, Alanahalli, Mysuru</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
