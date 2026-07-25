import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { achievements } from '@/content/home';

export function Achievements() {
  return (
    <section className="relative isolate overflow-hidden bg-jade-900 py-16 text-sand-100 md:py-20">
      <div aria-hidden className="grain absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(var(--color-turmeric-300)_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="container-page relative">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <div className="relative sm:pl-6 lg:pl-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 hidden h-full w-px bg-gradient-to-b from-turmeric-400/70 to-transparent sm:block"
                />
                <dt className="font-display text-[clamp(2.4rem,1.6rem+2.4vw,3.4rem)] leading-none text-sand-50">
                  <Counter value={item.value} suffix={item.suffix} />
                </dt>
                <dd>
                  <p className="mt-3 font-display text-lg text-turmeric-300">{item.label}</p>
                  <p className="mt-1 text-[0.875rem] text-sand-300/70">{item.detail}</p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
