'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Hero — fills the viewport, reveals its headline word-by-word after the
 * loader completes, and parallaxes the background image at scrub=true for a
 * quiet depth cue. Headline is structured as three masked lines, each wrapping
 * one `.mask > .mask-inner` so the reveal composes cleanly with GSAP.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax the background image slowly as the hero scrolls out
      gsap.to('[data-hero-img]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade the scroll hint as we move off hero
      gsap.to('[data-hero-scroll]', {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      });

      // Headline reveal: fire on loader-done if present, else immediately
      const reveal = () => {
        gsap.to('[data-hero-word]', {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.12,
        });
        gsap.fromTo(
          '[data-hero-fade]',
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.3,
          }
        );
      };

      const onLoaderDone = () => reveal();
      window.addEventListener('inigo:loader-done', onLoaderDone, { once: true });

      // Fallback — if loader never fires (e.g. SSR test), reveal after 2.5s
      const fallback = window.setTimeout(reveal, 2600);
      return () => {
        window.removeEventListener('inigo:loader-done', onLoaderDone);
        window.clearTimeout(fallback);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pb-14 md:pb-20"
    >
      {/* Background plate — kept soft on white via 8% opacity + gradient wash */}
      <div className="absolute inset-0 -z-10">
        <Image
          data-hero-img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.11 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/20 to-paper" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/80 via-transparent to-paper/30" />
      </div>

      <div className="px-6 md:px-10 grid grid-cols-12 gap-4 md:gap-6 items-end">
        <div className="col-span-12 md:col-span-9">
          <div
            data-hero-fade
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-10 md:mb-14"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Luxe / MNL / SS · XXVI</span>
            <span className="flex-1 max-w-[8rem] h-px bg-ink/20 ml-2" />
          </div>

          <h1 className="font-display font-black leading-[0.84] tracking-tightest text-[clamp(3.25rem,13vw,15rem)] text-ink">
            <span className="block overflow-hidden">
              <span data-hero-word className="block" style={{ transform: 'translateY(110%)' }}>
                FUTURE
              </span>
            </span>
            <span className="block overflow-hidden pl-[0.25em]">
              <span
                data-hero-word
                className="block font-serif italic font-light text-accent"
                style={{ transform: 'translateY(110%)' }}
              >
                couture
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-word
                className="block text-ink/15"
                style={{ transform: 'translateY(110%)' }}
              >
                FROM&nbsp;MANILA
              </span>
            </span>
          </h1>
        </div>

        <div className="col-span-12 md:col-span-3 space-y-8 pb-2">
          <p
            data-hero-fade
            className="font-serif italic text-lg md:text-xl text-graphite max-w-sm leading-snug"
          >
            A fashion house sculpting silhouettes for a world after — hand-cut
            in Poblacion, engineered for tomorrow.
          </p>
          <div
            data-hero-fade
            className="grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <div>
              <div className="text-ash mb-1">Est.</div>
              <div className="text-ink">2019</div>
            </div>
            <div>
              <div className="text-ash mb-1">Atelier</div>
              <div className="text-ink">Poblacion</div>
            </div>
            <div>
              <div className="text-ash mb-1">Season</div>
              <div className="text-ink">XIV / XXVI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash"
      >
        <span>Scroll</span>
        <svg width="10" height="36" viewBox="0 0 10 40" fill="none" aria-hidden>
          <path
            d="M5 0V38M5 38L1 34M5 38L9 34"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Corner frames — editorial detail */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ash text-right leading-relaxed pointer-events-none">
        N 14.5995°
        <br />
        E 120.9842°
      </div>
    </section>
  );
}
