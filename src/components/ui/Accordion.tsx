'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Single-open accordion. Uses grid-template-rows for the open/close transition
 * so content of any height animates smoothly without measuring it in JS.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-sand-200 overflow-hidden rounded-card border border-sand-200 bg-white', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-sand-50 md:px-7 md:py-6"
              >
                <span
                  className={cn(
                    'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-45 border-turmeric-400 bg-turmeric-400 text-jade-950'
                      : 'border-sand-300 text-jade-700 group-hover:border-jade-300',
                  )}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>

                <span className="font-display text-[1.0625rem] leading-snug text-jade-900 md:text-lg">
                  {item.question}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pl-16 text-[0.9375rem] leading-relaxed text-ink-500 md:px-7 md:pl-[4.25rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
