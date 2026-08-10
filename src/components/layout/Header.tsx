'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { media } from '@/lib/media';
import { contact, mainNav, site, social } from '@/lib/site';
import { cn } from '@/lib/utils';

import { ButtonLink } from '../ui/Button';
import { Icon, type IconName } from '../ui/Icons';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes every menu.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /** Small grace period so the pointer can travel into the dropdown. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isBranchActive = (item: (typeof mainNav)[number]) =>
    isActive(item.href) || (item.children?.some((child) => isActive(child.href)) ?? false);

  return (
    <>
      {/* Utility bar — hidden once the user starts scrolling to reclaim height */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-50 hidden overflow-hidden border-b border-sand-50/10 bg-jade-950 text-sand-300 transition-[height,opacity] duration-400 xl:block',
          scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100',
        )}
      >
        <div className="container-page flex h-10 items-center justify-between gap-6 text-[0.78rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Icon.pin className="h-3.5 w-3.5 text-turmeric-400" aria-hidden />
              {contact.addressOneLine}
            </span>
            <a href={contact.phones[0].href} className="inline-flex items-center gap-2 transition hover:text-turmeric-300">
              <Icon.phone className="h-3.5 w-3.5 text-turmeric-400" aria-hidden />
              {contact.phones[0].display}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition hover:text-turmeric-300">
              <Icon.mail className="h-3.5 w-3.5 text-turmeric-400" aria-hidden />
              {contact.email}
            </a>
            <span className="h-3.5 w-px bg-sand-50/20" aria-hidden />
            <div className="flex items-center gap-2.5">
              {social.map((item) => {
                const Glyph = Icon[item.icon as IconName];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="transition hover:text-turmeric-300"
                  >
                    <Glyph className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'fixed inset-x-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'top-0 border-b border-sand-200/70 bg-sand-50/88 backdrop-blur-xl shadow-[0_10px_30px_-24px_rgb(18_53_41/0.6)]'
            : 'top-0 border-b border-transparent bg-transparent xl:top-10',
        )}
      >
        <div
          className={cn(
            'container-page flex items-center justify-between gap-4 transition-[height] duration-400 md:gap-6',
            scrolled ? 'h-24' : 'h-28',
          )}
        >
          <Link href="/" className="flex min-w-0 shrink items-center gap-3" aria-label={`${site.name} — home`}>
            {/*
              The mobile panel is cream, and the header sits above it — so while
              the panel is open the logo must switch to its dark variant or it
              disappears against the panel.
            */}
            <Image
              src={scrolled || mobileOpen ? media.logo : media.logoWhite}
              alt={site.name}
              width={455}
              height={113}
              priority
              /*
                `object-contain` + a viewport-relative cap means the very
                narrowest phones scale the mark down proportionally instead of
                squashing it or pushing the burger off-screen.
              */
              className={cn(
                'w-auto max-w-[62vw] object-contain object-left transition-[height] duration-400 sm:max-w-none',
                /*
                  The client asked for the mark larger than the 80 px the image
                  spec sets for it (G-02), so the bar grew with it: 112 px at
                  rest holds a 96 px mark with the same breathing room the 96 px
                  bar gave the old 80 px one. The scrolled bar steps down to
                  96 px and the mark to 80 px, keeping that ratio.
                */
                scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24',
              )}
            />
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {/*
              Desktop only. Below `xl` the burger owns the right-hand side so the
              logo gets the room it needs, and the same call to action sits at the
              bottom of the mobile panel.

              The visibility lives on this wrapper, not on the button: ButtonLink's
              base class already sets `inline-flex`, and Tailwind emits
              `.inline-flex` after `.hidden`, so passing `hidden` down would lose
              the cascade and the button would stay visible on every screen.
            */}
            <div className="hidden items-center gap-2.5 xl:flex">
              <ButtonLink
                href="/contact"
                variant={scrolled ? 'primary' : 'secondary'}
                size="sm"
                arrow
              >
                Book a Consultation
              </ButtonLink>
              {/*
                The accreditation mark reads as a credential for the button beside
                it. It always carries its own white tile so it holds up over both
                the dark hero and the cream scrolled bar.
              */}
              <Image
                src={media.nabh}
                alt="NABH accredited hospital"
                width={400}
                height={396}
                className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-1 shadow-soft ring-1 ring-sand-900/5"
              />
            </div>

            {/*
              The toggle sits above the mobile panel, so its colours are driven by
              what is *behind* it: the cream panel when open, the scrolled header
              bar, or the dark hero. It always carries its own background so it
              never washes out against a light section.
            */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((value) => !value)}
              className={cn(
                'grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors xl:hidden',
                scrolled || mobileOpen
                  ? 'border-sand-300 bg-white text-jade-900 shadow-soft'
                  : 'border-sand-50/40 bg-jade-950/45 text-sand-50 backdrop-blur-sm',
              )}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300',
                    mobileOpen ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-200',
                    mobileOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300',
                    mobileOpen ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/*
          The menu gets a row of its own from `xl` up.

          Eight top-level entries with labels as long as "OPD & Departments"
          and "Speciality Clinics", at a comfortable reading size, simply do
          not fit beside the logo and the call to action on one line — they
          either wrap or collide. Giving the menu the full content width solves
          it without shrinking the type or abbreviating the labels.
        */}
        <div
          className={cn(
            'hidden border-t transition-colors duration-400 xl:block',
            scrolled ? 'border-sand-200/70' : 'border-sand-50/15',
          )}
        >
          <nav aria-label="Main" className="container-page flex h-12 items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isBranchActive(item);
              const hasChildren = Boolean(item.children?.length);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    if (hasChildren) setOpenMenu(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    aria-expanded={hasChildren ? openMenu === item.label : undefined}
                    aria-haspopup={hasChildren || undefined}
                    onFocus={() => hasChildren && setOpenMenu(item.label)}
                    className={cn(
                      'relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.9375rem] font-medium transition-colors duration-200',
                      scrolled ? 'text-jade-900' : 'text-sand-100',
                      active
                        ? scrolled
                          ? 'bg-jade-50 text-jade-800'
                          : 'bg-sand-50/12'
                        : scrolled
                          ? 'hover:bg-jade-50/70'
                          : 'hover:bg-sand-50/10',
                    )}
                  >
                    {item.label}
                    {hasChildren ? (
                      <Icon.chevronDown
                        className={cn(
                          'h-3.5 w-3.5 opacity-70 transition-transform duration-300',
                          openMenu === item.label && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    ) : null}
                  </Link>

                  {hasChildren ? (
                    /*
                      Anchored to the item's left edge rather than centred on
                      it: the menu is left-aligned in its row, so a centred
                      panel on the first entries would hang off the viewport.
                    */
                    <div
                      className={cn(
                        'absolute left-0 top-full w-[26rem] pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        openMenu === item.label
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-2 opacity-0',
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white p-2 shadow-lift">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors',
                              isActive(child.href) ? 'bg-jade-50' : 'hover:bg-sand-50',
                            )}
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-turmeric-400 transition-transform duration-300 group-hover:scale-150" />
                            <span>
                              <span className="block text-[0.875rem] font-semibold text-jade-900">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-500">
                                  {child.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  );
}

function MobileNav({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 xl:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 bg-jade-950/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className={cn(
          // Full-width at every size the panel is available at (below lg). A
          // partial-width sheet would leave the header logo — switched to its
          // dark variant for the cream panel — sitting on the dark hero.
          'absolute inset-y-0 right-0 flex w-full flex-col bg-sand-50 shadow-lift transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="scroll-slim flex-1 overflow-y-auto px-5 pb-6 pt-[calc(var(--header-height)+1rem)]">
          {/* Second, unmissable way out — the header toggle is the first. */}
          <button
            type="button"
            onClick={onClose}
            className="mb-4 ml-auto flex items-center gap-2 rounded-full border border-sand-300 px-4 py-2 text-[0.8125rem] font-semibold text-jade-800 transition hover:bg-sand-200"
          >
            <Icon.close className="h-4 w-4" aria-hidden />
            Close
          </button>

          <ul className="space-y-1">
            {mainNav.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = expanded === item.label;

              return (
                <li key={item.label} className="border-b border-sand-200/80 last:border-0">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex-1 py-3.5 font-display text-lg',
                        isActive(item.href) ? 'text-turmeric-700' : 'text-jade-900',
                      )}
                    >
                      {item.label}
                    </Link>

                    {hasChildren ? (
                      <button
                        type="button"
                        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="grid h-9 w-9 place-items-center rounded-full text-jade-700 transition hover:bg-sand-200"
                      >
                        <Icon.chevronDown
                          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
                        />
                      </button>
                    ) : null}
                  </div>

                  {hasChildren ? (
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <ul className="overflow-hidden">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                'block py-2.5 pl-4 text-[0.9375rem]',
                                isActive(child.href) ? 'text-turmeric-700' : 'text-ink-500',
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        <li className="h-2" />
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 space-y-3 rounded-card border border-sand-200 bg-white p-5">
            <a
              href={contact.phones[0].href}
              className="flex items-center gap-3 text-[0.9375rem] font-semibold text-jade-900"
            >
              <Icon.phone className="h-4 w-4 text-turmeric-600" aria-hidden />
              {contact.phones[0].display}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[0.9375rem] text-ink-500">
              <Icon.mail className="h-4 w-4 text-turmeric-600" aria-hidden />
              {contact.email}
            </a>
            <p className="flex items-start gap-3 text-[0.875rem] leading-snug text-ink-500">
              <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-turmeric-600" aria-hidden />
              {contact.addressOneLine}
            </p>
          </div>

          <ButtonLink href="/contact" className="mt-5 w-full" arrow onClick={onClose}>
            Book a Consultation
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
