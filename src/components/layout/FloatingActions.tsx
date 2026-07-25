'use client';

import { useEffect, useState } from 'react';

import { contact } from '@/lib/site';
import { cn } from '@/lib/utils';

import { Icon } from '../ui/Icons';

/**
 * Persistent quick-contact dock.
 *
 * Appears after the first viewport so it never competes with the hero, and
 * collapses to icons on small screens where horizontal space is scarce.
 */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'no-print fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] py-3 pl-3.5 pr-3.5 text-white shadow-lift transition-all hover:pr-5 hover:shadow-glow"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon.whatsapp className="h-5 w-5 shrink-0" aria-hidden />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8125rem] font-semibold transition-all duration-300 group-hover:max-w-[9rem]">
          Chat with us
        </span>
      </a>

      <a
        href={contact.phones[0].href}
        className="group flex items-center gap-2.5 rounded-full bg-jade-800 py-3 pl-3.5 pr-3.5 text-sand-50 shadow-lift transition-all hover:bg-jade-900 hover:pr-5"
        aria-label={`Call the hospital on ${contact.phones[0].display}`}
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon.phone className="h-5 w-5" aria-hidden />
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turmeric-400/40" aria-hidden />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8125rem] font-semibold transition-all duration-300 group-hover:max-w-[9rem]">
          {contact.phones[0].display}
        </span>
      </a>
    </div>
  );
}
