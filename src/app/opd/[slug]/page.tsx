import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/shared/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Orb, Section, SectionHeading } from '@/components/ui/Section';
import { departments } from '@/content/clinical';
import { departmentDetails } from '@/content/departments';
import { contact } from '@/lib/site';

type Params = { slug: string };

const withPages = departments.filter((department) => department.slug in departmentDetails);

export function generateStaticParams(): Params[] {
  return withPages.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const department = departments.find((entry) => entry.slug === slug);
  const detail = departmentDetails[slug];
  if (!department || !detail) return {};

  return {
    title: `${department.name} — ${department.english}`,
    description: `${detail.formalName} at JSS Ayurveda Hospital, Mysuru. ${department.body}`,
  };
}

const numeral = (index: number) => String(index + 1).padStart(2, '0');

export default async function DepartmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const department = departments.find((entry) => entry.slug === slug);
  const detail = departmentDetails[slug];
  if (!department || !detail) notFound();

  const Glyph = Icon[department.icon];
  const namesOnly = detail.groups.every((group) => group.items.length === 0);
  const others = withPages.filter((entry) => entry.slug !== slug);

  const contents = [
    { id: 'services', label: detail.groupsEyebrow },
    detail.procedures ? { id: 'procedures', label: detail.procedures.title } : null,
    detail.clinics ? { id: 'clinics', label: detail.clinics.title } : null,
  ].filter((entry): entry is { id: string; label: string } => entry !== null);

  return (
    <>
      <PageHero
        eyebrow={detail.formalName}
        title={detail.headline}
        crumbs={[{ label: 'OPD & Departments', href: '/opd' }, { label: department.name }]}
        image={detail.image}
        intro={`${department.name} · ${department.english}`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="secondary" arrow>
            Book a consultation
          </ButtonLink>
          <ButtonLink href={contact.phones[0].href} variant="outline-light">
            Call {contact.phones[0].display}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Overview */}
      <Section tone="cream">
        <Orb className="-right-40 top-10 h-96 w-96" color="jade" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">About the department</p>
                <h2 className="mt-4 text-[clamp(1.75rem,1.15rem+2.1vw,2.85rem)] leading-[1.15]">
                  {department.name}
                  <span className="block font-display text-[0.55em] italic text-turmeric-700">
                    {department.english}
                  </span>
                </h2>
              </Reveal>

              <div className="mt-8 space-y-5">
                {detail.intro.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={index * 80}>
                    <p
                      className={
                        index === 0
                          ? 'font-display text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-jade-900'
                          : 'text-[1rem] leading-[1.8] text-ink-500'
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={160}>
              <aside className="relative overflow-hidden rounded-[2rem] bg-jade-950 p-8 text-sand-100 shadow-lift lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                <Glyph aria-hidden className="absolute -right-6 -top-6 h-40 w-40 text-jade-800/60" />
                <p className="relative text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-turmeric-300">
                  On this page
                </p>
                <ol className="relative mt-5 space-y-1">
                  {contents.map((entry, index) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="group flex items-baseline gap-4 border-b border-sand-50/10 py-3 transition-colors hover:text-turmeric-300"
                      >
                        <span className="font-display text-[0.9375rem] text-turmeric-400">{numeral(index)}</span>
                        <span className="flex-1 text-[0.9375rem]">{entry.label}</span>
                        <Icon.arrowRight
                          aria-hidden
                          className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ol>

                <dl className="relative mt-8 space-y-3">
                  {contact.hours.map((entry) => (
                    <div key={entry.days} className="flex flex-col">
                      <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-sand-300">{entry.days}</dt>
                      <dd className="font-display text-[1.125rem] text-sand-50">{entry.time}</dd>
                    </div>
                  ))}
                </dl>

                <ButtonLink href="/contact" variant="secondary" size="sm" arrow className="relative mt-8">
                  Book a consultation
                </ButtonLink>
              </aside>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Services / conditions */}
      <Section tone="white" id="services">
        <div className="container-page">
          <SectionHeading eyebrow={detail.groupsEyebrow} title={detail.groupsTitle} />

          {namesOnly ? (
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-5">
              {detail.groups.map((group, index) => (
                <Reveal as="li" key={group.title} delay={index * 80} className="bg-sand-50">
                  <div className="flex h-full flex-col justify-between gap-12 p-7 transition-colors duration-400 hover:bg-white">
                    <span className="font-display text-[2.75rem] leading-none text-turmeric-400">{numeral(index)}</span>
                    <div>
                      <h3 className="text-[1.375rem] leading-tight">{group.title}</h3>
                      {group.classical ? (
                        <p className="mt-1.5 text-[0.875rem] text-ink-500">{group.classical}</p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          ) : (
            <ol className="mt-14 grid gap-x-14 lg:grid-cols-2">
              {detail.groups.map((group, index) => (
                <Reveal as="li" key={group.title} delay={(index % 2) * 90}>
                  <div className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-sand-200 py-8">
                    <span className="font-display text-[1.75rem] leading-none text-turmeric-500">{numeral(index)}</span>
                    <div>
                      <h3 className="text-[1.1875rem] leading-snug">
                        {group.title}
                        {group.classical ? (
                          <span className="ml-2 font-display text-[0.9375rem] font-normal italic text-turmeric-700">
                            {group.classical}
                          </span>
                        ) : null}
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-sand-200 bg-sand-50 px-3.5 py-1.5 text-[0.8125rem] leading-snug text-ink-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      {group.note ? (
                        <p className="mt-4 border-l-2 border-turmeric-300 pl-4 text-[0.8125rem] leading-relaxed text-ink-500">
                          {group.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </Section>

      {/* Procedures */}
      {detail.procedures ? (
        <Section tone="sand" id="procedures">
          <div className="container-page">
            <div
              className={
                detail.procedures.image ? 'grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16' : undefined
              }
            >
              <div>
                <SectionHeading eyebrow="Procedures" title={detail.procedures.title} intro={detail.procedures.intro} />
                {detail.procedures.image ? (
                  <Reveal delay={120}>
                    <div className="relative mt-10 aspect-3/2 overflow-hidden rounded-[2rem] shadow-lift lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                      <Image
                        src={detail.procedures.image.src}
                        alt={detail.procedures.image.alt}
                        fill
                        sizes="(min-width: 1024px) 30rem, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ) : null}
              </div>

              <ul
                className={
                  detail.procedures.image
                    ? 'grid gap-4 sm:grid-cols-2'
                    : 'mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                }
              >
                {detail.procedures.items.map((item, index) => (
                  <Reveal as="li" key={item.name} delay={(index % 3) * 70}>
                    <div className="group h-full rounded-card border border-sand-200 bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-jade-200 hover:shadow-soft">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="h-2 w-2 rotate-45 bg-turmeric-400 transition-transform duration-400 group-hover:rotate-[135deg]"
                        />
                        <h3 className="text-[1.0625rem] leading-snug">{item.name}</h3>
                      </div>
                      {item.body ? (
                        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-500">{item.body}</p>
                      ) : null}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      {/* Clinics */}
      {detail.clinics ? (
        <Section tone="jade-deep" id="clinics">
          <Orb className="-left-40 bottom-0 h-[28rem] w-[28rem]" color="turmeric" />
          <div className="container-page">
            <SectionHeading
              eyebrow="Clinics & OPDs"
              title={detail.clinics.title}
              intro={detail.clinics.intro}
              tone="light"
            />

            <div
              className={
                detail.clinics.items.length === 1
                  ? 'mt-12'
                  : detail.clinics.items.length === 3
                    ? 'mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3'
                    : 'mt-12 grid gap-5 md:grid-cols-2'
              }
            >
              {detail.clinics.items.map((clinic, index) => (
                <Reveal key={clinic.name} delay={index * 90}>
                  <article className="flex h-full flex-col rounded-[1.75rem] border border-sand-50/10 bg-jade-900/60 p-7 backdrop-blur md:p-8">
                    <h3 className="text-[1.25rem] leading-snug text-sand-50">{clinic.name}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-sand-300">{clinic.body}</p>

                    {clinic.items ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {clinic.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-sand-50/15 px-3.5 py-1.5 text-[0.8125rem] text-sand-100"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {clinic.facts ? (
                      <dl className="mt-auto grid gap-3 border-t border-sand-50/10 pt-5 [&:not(:first-child)]:mt-6">
                        {clinic.facts.map((fact) => (
                          <div key={fact.label} className="flex items-baseline justify-between gap-4">
                            <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-turmeric-300">{fact.label}</dt>
                            <dd className="text-right text-[0.9375rem] text-sand-50">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* Closing */}
      {detail.closing ? (
        <Section tone="cream" compact>
          <div className="container-page">
            <Reveal>
              <figure className="mx-auto max-w-3xl text-center">
                <Icon.lotus aria-hidden className="mx-auto h-9 w-9 text-turmeric-500" />
                <blockquote className="mt-6 font-display text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] italic leading-snug text-jade-900">
                  {detail.closing.quote}
                </blockquote>
                {detail.closing.translation ? (
                  <figcaption className="mt-4 text-[1rem] text-ink-500">{detail.closing.translation}</figcaption>
                ) : (
                  <figcaption className="mt-4 text-[0.8125rem] uppercase tracking-[0.14em] text-sand-700">
                    Our commitment
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* Other departments */}
      <Section tone="white" compact>
        <div className="container-page">
          <SectionHeading eyebrow="Other departments" title="Explore the rest of the OPD" align="center" />
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {others.map((entry) => {
              const OtherGlyph = Icon[entry.icon];
              return (
                <li key={entry.slug}>
                  <Link
                    href={`/opd/${entry.slug}`}
                    className="flex items-center gap-3 rounded-card border border-sand-200 bg-sand-50 px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-jade-200 hover:bg-white hover:shadow-soft"
                  >
                    <OtherGlyph aria-hidden className="h-5 w-5 text-turmeric-600" />
                    <span className="flex flex-col">
                      <span className="text-[0.9375rem] font-semibold text-jade-900">{entry.name}</span>
                      <span className="text-[0.75rem] text-ink-500">{entry.english}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <CtaBand
        title={`Consult the ${department.name} department`}
        intro="Walk in during OPD hours or call ahead to confirm your consultant's day. Every treatment is prescribed after a personal assessment."
        primary={{ label: 'Book an appointment', href: '/contact' }}
        secondary={{ label: 'All departments', href: '/opd' }}
      />
    </>
  );
}
