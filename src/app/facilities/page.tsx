import Image from 'next/image';
import type { Metadata } from 'next';

import { Achievements } from '@/components/home/Achievements';
import { CtaBand } from '@/components/shared/CtaBand';
import { AiImage } from '@/components/ui/AiImage';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { additionalFacilities, campusFacilities, campusIntro, rooms } from '@/content/facilities';
import { imageSlotsById } from '@/lib/image-prompts';
import { media } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Facilities & Rooms',
  description:
    'Accommodation and facilities at JSS Ayurveda Hospital, Mysuru — general, semi-special, special, deluxe and ultra deluxe wards, 26 therapy rooms, yoga hall, 15-acre herbal garden, pharmacy, lab and two operation theatres.',
};

/**
 * Only three of the five room categories have been photographed. Splitting on
 * the slot's `src` rather than on a hard-coded list means the page corrects
 * itself the moment a missing photograph is supplied.
 */
const hasPhotograph = (slot: string) => Boolean(imageSlotsById[slot]?.src);
const photographed = rooms.filter((room) => hasPhotograph(room.imageSlot));
const listed = rooms.filter((room) => !hasPhotograph(room.imageSlot));

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities & Rooms"
        title="Everything you need for a complete, healing stay"
        crumbs={[{ label: 'Facilities & Rooms' }]}
        image={media.campusWard}
        intro="Every room at JSS Ayurveda Hospital is designed for quiet, comfort and healing — with natural light, fresh air and a view of the green campus around you."
      >
        <ButtonLink href="/contact" variant="secondary" arrow>
          Enquire about rooms
        </ButtonLink>
      </PageHero>

      {/* Accommodation */}
      <Section tone="cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Accommodation"
            title="Rest well. Heal better."
            intro="We offer a range of accommodation options to suit every patient and every budget — from spacious general wards to beautifully appointed Ultra Deluxe rooms with views of the Chamundi Hills. Every room is clean, calm and thoughtfully maintained."
            align="center"
          />

          {/* Photographed rooms lead, at full card size. */}
          {photographed.length > 0 ? (
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {photographed.map((room, index) => (
                <Reveal key={room.slug} delay={index * 90}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:shadow-lift">
                    <AiImage
                      slot={room.imageSlot}
                      className="aspect-16/10 w-full"
                      sizes="(min-width: 1024px) 34rem, 90vw"
                      showPrompt={false}
                    />

                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <h3 className="text-[1.25rem] leading-snug">{room.name}</h3>
                      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                        {room.body}
                      </p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {room.features.map((feature) => (
                          <li
                            key={feature}
                            className="rounded-full bg-sand-100 px-3 py-1 text-[0.75rem] text-ink-700"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}

          {/*
            Rooms we have no photograph of carry no image frame at all — an empty
            placeholder reads as a broken page, and a stand-in photograph of the
            wrong room would be worse. They keep every word of their description
            and simply sit in a tighter, text-led row.

            The split is read from the image slots, not hard-coded: supply a
            photograph for one of these rooms and it moves up into the row above
            on its own.
          */}
          {listed.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {listed.map((room, index) => (
                <Reveal key={room.slug} delay={(index % 3) * 80}>
                  <article className="flex h-full flex-col rounded-card border border-sand-200 bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-jade-200 hover:shadow-soft">
                    <h3 className="text-[1.0625rem] leading-snug">{room.name}</h3>
                    <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-500">
                      {room.body}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {room.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full bg-sand-100 px-3 py-1 text-[0.75rem] text-ink-700"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}

          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-card border border-jade-100 bg-jade-50 p-7 text-center">
              <p className="text-[0.9375rem] text-ink-500">
                All tariffs include accommodation, meals, therapies, medicines and daily consultations.
              </p>
              <ButtonLink href="/pricing" size="sm" arrow>
                View pricing plans
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Achievements />

      {/* Campus */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src={media.environment2}
                  alt="The green campus environment at JSS Ayurveda Hospital"
                  fill
                  sizes="(min-width: 1024px) 34rem, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <SectionHeading eyebrow={campusIntro.eyebrow} title={campusIntro.title} intro={campusIntro.body} />
            </div>
          </div>

          {/* Campus facilities */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {campusFacilities.map((facility, index) => {
              const Glyph = Icon[facility.icon];
              return (
                <Reveal key={facility.title} delay={index * 100}>
                  <article className="relative h-full overflow-hidden rounded-card border border-sand-200 bg-sand-50 p-7">
                    <span
                      aria-hidden
                      className="absolute right-5 top-4 font-display text-4xl text-sand-200"
                    >
                      {facility.stat}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-jade-800 text-sand-50">
                      <Glyph className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] leading-snug">{facility.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">{facility.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Additional facilities + supporting imagery */}
      <Section tone="cream">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Everything under one roof"
                title="You never need to leave the campus"
                intro="All aspects of your healing — diagnosis, treatment, medicine preparation, food, yoga and rest — are available in one serene, fully equipped space."
              />

              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {additionalFacilities.map((facility, index) => (
                  <Reveal as="li" key={facility} delay={index * 50}>
                    <div className="flex items-start gap-3 rounded-xl border border-sand-200 bg-white px-4 py-3.5">
                      <Icon.check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-turmeric-600" aria-hidden />
                      <span className="text-[0.875rem] leading-snug text-ink-700">{facility}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/*
              The Sattvic kitchen has never been photographed, so it is not
              given a frame here — the two real photographs pair up instead,
              matched at the same ratio rather than leaving a short tile beside
              a tall one. The kitchen is still listed in the facilities column
              on the left, so nothing is lost but the empty box.
            */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={120}>
                <div className="overflow-hidden rounded-card border border-sand-200">
                  <AiImage slot="yoga-hall" className="aspect-3/4 w-full" sizes="22rem" showPrompt={false} />
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="relative aspect-3/4 overflow-hidden rounded-card border border-sand-200">
                  <Image
                    src={media.garden4}
                    alt="Medicinal plants in the hospital's herbal garden"
                    fill
                    sizes="22rem"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Plan a stay that actually feels restful"
        intro="Tell us your dates and your condition — our team will recommend the right room, the right program and prepare everything before you arrive."
        primary={{ label: 'Enquire about rooms', href: '/contact' }}
        secondary={{ label: 'See the gallery', href: '/gallery' }}
      />
    </>
  );
}
