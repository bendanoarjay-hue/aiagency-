'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BLOCKS = [
  { label: 'Press & Media', value: 'press@inigo.mnl' },
  { label: 'Wholesale', value: 'wholesale@inigo.mnl' },
  { label: 'Atelier', value: 'studio@inigo.mnl' },
];

const STOCKISTS = [
  { city: 'Manila', store: 'Atelier Flagship', area: 'Poblacion' },
  { city: 'Tokyo', store: 'United Arrows & Sons', area: 'Harajuku' },
  { city: 'Seoul', store: 'Boon the Shop', area: 'Cheongdam' },
  { city: 'Singapore', store: 'Club 21', area: 'Orchard' },
  { city: 'Hong Kong', store: 'Joyce', area: 'Central' },
  { city: 'London', store: 'Machine-A', area: 'Soho' },
  { city: 'Paris', store: 'The Broken Arm', area: '3e' },
  { city: 'New York', store: 'Dover Street Market', area: 'NoMad' },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to('[data-ct-line]', {
        yPercent: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });
      gsap.fromTo(
        '[data-ct-fade]',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative px-6 md:px-10 py-28 md:py-40 border-t border-ink/10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-16 md:mb-20">
        <span>( 05 ) &nbsp; Contact / Stockists</span>
        <span className="hidden md:inline">Let&rsquo;s dress tomorrow</span>
      </div>

      <h2 className="font-display font-black leading-[0.84] tracking-tightest text-[clamp(3rem,13vw,15rem)] text-ink mb-20 md:mb-28">
        <span className="block overflow-hidden">
          <span data-ct-line className="block" style={{ transform: 'translateY(110%)' }}>
            LET&rsquo;S
          </span>
        </span>
        <span className="block overflow-hidden pl-[0.25em]">
          <span
            data-ct-line
            className="block font-serif italic font-light text-accent"
            style={{ transform: 'translateY(110%)' }}
          >
            dress&nbsp;tomorrow.
          </span>
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32">
        {BLOCKS.map((b) => (
          <a
            key={b.label}
            href={`mailto:${b.value}`}
            data-ct-fade
            data-cursor="hover"
            data-cursor-label="Write"
            className="group border-t border-ink/15 pt-6 pb-8 flex flex-col gap-4 hover:border-ink transition-colors duration-500"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
              {b.label}
            </span>
            <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {b.value}
            </span>
            <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.22em] text-ink inline-flex items-center gap-2">
              <span className="group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Write →
              </span>
            </span>
          </a>
        ))}
      </div>

      <div data-ct-fade>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-6">
          <span>Current Stockists</span>
          <span>VIII Cities</span>
        </div>
        <ul className="border-t border-ink/15">
          {STOCKISTS.map((s) => (
            <li
              key={s.city}
              className="grid grid-cols-12 items-baseline py-5 border-b border-ink/15"
            >
              <span className="col-span-3 md:col-span-2 font-display font-black text-xl md:text-2xl tracking-tight text-ink">
                {s.city}
              </span>
              <span className="col-span-6 md:col-span-7 font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-graphite">
                {s.store}
              </span>
              <span className="col-span-3 md:col-span-3 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
                {s.area}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
