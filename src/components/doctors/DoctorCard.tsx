import Image from 'next/image';

import { Icon } from '@/components/ui/Icons';
import type { DoctorRecord } from '@/lib/wp/parse';
import { cn, initials } from '@/lib/utils';

export function DoctorCard({
  doctor,
  onSelect,
  className,
}: {
  doctor: DoctorRecord;
  /** When provided the card becomes an interactive button opening the profile. */
  onSelect?: () => void;
  className?: string;
}) {
  const Wrapper = onSelect ? 'button' : 'div';

  return (
    <Wrapper
      {...(onSelect
        ? { type: 'button' as const, onClick: onSelect, 'aria-label': `View profile of ${doctor.name}` }
        : {})}
      className={cn(
        'group relative flex w-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white text-left transition-all duration-400',
        onSelect && 'hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-jade-50">
        {doctor.image ? (
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            sizes="(min-width: 1280px) 18rem, (min-width: 768px) 30vw, 45vw"
            /* Source portraits are already over-compressed — don't re-crush them. */
            quality={90}
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-display text-4xl text-jade-300">
            {initials(doctor.name)}
          </span>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-jade-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="absolute left-3 top-3 rounded-full bg-sand-50/92 px-2.5 py-1 text-[0.6875rem] font-semibold text-jade-800 backdrop-blur">
          {doctor.department}
        </span>

        {doctor.experience ? (
          <span className="absolute right-3 top-3 rounded-full bg-turmeric-400/95 px-2.5 py-1 text-[0.6875rem] font-bold text-jade-950">
            {doctor.experience}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.0625rem] leading-snug">{doctor.name}</h3>
        {doctor.qualification ? (
          <p className="mt-1 text-[0.8125rem] font-medium tracking-wide text-turmeric-700">
            {doctor.qualification}
          </p>
        ) : null}
        {doctor.designation ? (
          <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">
            {doctor.designation}
          </p>
        ) : null}

        {onSelect ? (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8125rem] font-semibold text-jade-700 transition-colors group-hover:text-turmeric-700">
            View profile
            <Icon.arrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
