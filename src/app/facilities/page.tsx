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
import { additionalFacilities, campusFacilities, campusIntro, careUnits, laboratory, rooms } from '@/content/facilities';
import { imageSlotsById } from '@/lib/image-prompts';
import { media, photo } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Facilities & Rooms',
  description:
    'Accommodation and facilities at JSS Ayurveda Hospital, Mysuru — general, semi-special and special wards and Ultra Deluxe rooms, 26 therapy rooms, yoga hall, 15-acre herbal garden, pharmacy, in-house clinical laboratory, ECG and two operation theatres.',
};

/**
 * Not every room category has been photographed. Splitting on the slot's `src`
 * rather than on a hard-coded list means the page corrects itself the moment a
 * missing photograph is supplied.
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
        image={photo.heroWardRound}
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

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* Photographed rooms lead as full-bleed photo cards. */}
            {photographed.length > 0 ? (
              <div className="grid gap-6">
                {photographed.map((room) => (
                  <Reveal key={room.slug} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-jade-950 text-sand-50 shadow-lift">
                      <div className="overflow-hidden">
                        <AiImage
                          slot={room.imageSlot}
                          className="aspect-3/2 w-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          sizes="(min-width: 1280px) 42rem, (min-width: 1024px) 54vw, 92vw"
                          showPrompt={false}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-center p-7 md:p-9">
                        <p className="eyebrow text-turmeric-300">Single occupancy · Air conditioned</p>
                        <h3 className="mt-3 text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-tight text-sand-50">
                          {room.name}
                        </h3>
                        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-sand-200">{room.body}</p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {room.features.map((feature) => (
                            <li
                              key={feature}
                              className="rounded-full border border-sand-50/20 bg-sand-50/10 px-3 py-1 text-[0.75rem] text-sand-100"
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
              Rooms without a photograph get no image frame (an empty placeholder
              reads as broken). They stack as numbered rows, most affordable first.
              The split is read from the image slots: supply a photograph and the
              room moves into the photo column on its own.
            */}
            {listed.length > 0 ? (
              <ol className="grid gap-4">
                {listed.map((room, index) => (
                  <Reveal key={room.slug} as="li" delay={index * 90} className="h-full">
                    <article className="flex h-full gap-5 rounded-card border border-sand-200 bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-jade-200 hover:shadow-soft md:p-7">
                      <span
                        aria-hidden
                        className="w-11 shrink-0 font-display text-[2rem] leading-none text-turmeric-500 tabular-nums"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.125rem] leading-snug">{room.name}</h3>
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{room.body}</p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {room.features.map((feature) => (
                            <li
                              key={feature}
                              className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[0.75rem] text-ink-700"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ol>
            ) : null}
          </div>

          <Reveal delay={280}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 rounded-card border border-jade-100 bg-jade-50 p-7 text-center">
              <p className="text-[0.9375rem] text-ink-500">
                All tariffs include accommodation, meals, therapies, medicines and daily consultations.
              </p>
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
                  <AiImage slot="yoga-hall" className="aspect-4/3 w-full" sizes="(min-width: 640px) 22rem, 90vw" showPrompt={false} />
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="relative aspect-4/3 overflow-hidden rounded-card border border-sand-200">
                  <Image
                    src={photo.campusPortrait}
                    alt="Medicinal plants in the hospital's herbal garden"
                    fill
                    sizes="(min-width: 640px) 22rem, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Clinical care units */}
      <Section tone="white" id="care-units">
        <div className="container-page">
          <SectionHeading
            eyebrow="Clinical care units"
            title="Equipped for urgent and specialised care"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careUnits.map((unit, index) => (
              <Reveal key={unit.title} delay={index * 90}>
                <figure className="overflow-hidden rounded-card border border-sand-200 bg-sand-50">
                  <div className="relative aspect-4/3">
                    <Image
                      src={unit.image}
                      alt={unit.alt}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-4 font-display text-[1.125rem] text-jade-900">
                    {unit.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Laboratory */}
      <Section tone="cream" id="laboratory">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Laboratory services"
                title="Investigations on campus, results without the wait"
                intro={laboratory.intro}
              />
              <Reveal delay={160}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['ECG', 'X-Ray & radiology'].map((extra) => (
                    <span
                      key={extra}
                      className="inline-flex items-center gap-2 rounded-full border border-jade-200 bg-jade-50 px-4 py-2 text-[0.8125rem] font-semibold text-jade-800"
                    >
                      <Icon.pulse className="h-4 w-4 text-turmeric-600" aria-hidden />
                      {extra} also on campus
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="grid gap-5">
              {laboratory.groups.map((group, index) => (
                <Reveal key={group.title} delay={index * 120}>
                  <article className="rounded-card border border-sand-200 bg-white p-6 md:p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[1.125rem]">{group.title}</h3>
                      <span className="font-mono text-[0.75rem] tracking-widest text-sand-700">
                        {group.tests.length} TESTS
                      </span>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {group.tests.map((test) => (
                        <li
                          key={test}
                          className="rounded-lg border border-sand-200 bg-white px-3 py-1.5 text-[0.8125rem] text-ink-700"
                        >
                          {test}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
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
