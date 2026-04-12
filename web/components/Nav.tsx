'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#collections', label: 'Collections' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#journal', label: 'Journal' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 mix-blend-difference text-white',
        'transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled ? 'py-4' : 'py-6 md:py-7'
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          data-cursor="hover"
          className="flex items-baseline gap-2 font-display font-bold text-lg tracking-tight"
        >
          <span>INIGO</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 hidden sm:inline">
            MNL · 2019
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="relative h-4 overflow-hidden inline-block group"
            >
              <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:-translate-y-full">
                {l.label}
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-y-0">
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor="hover"
          data-cursor-label="Stockists"
          className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          <span>Stockists</span>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden relative w-9 h-9 flex flex-col items-end justify-center gap-[5px]"
        >
          <span
            className={clsx(
              'h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]',
              open ? 'w-6 rotate-45 translate-y-[3px]' : 'w-6'
            )}
          />
          <span
            className={clsx(
              'h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]',
              open ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-4'
            )}
          />
        </button>
      </div>

      {/* Mobile sheet — breaks the mix-blend so we render a real white panel */}
      <div
        className={clsx(
          'md:hidden fixed inset-x-0 top-0 bg-paper text-ink mix-blend-normal',
          'transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]',
          open ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-display font-bold text-lg">INIGO</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
          >
            Close
          </button>
        </div>
        <nav className="px-6 py-8 border-t border-ink/10">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block font-display font-bold text-4xl tracking-tight py-3 border-b border-ink/10"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash mr-4 align-middle">
                0{i + 1}
              </span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="px-6 py-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ash flex justify-between">
          <span>Manila, PH</span>
          <span>@inigo_____</span>
        </div>
      </div>
    </header>
  );
}
