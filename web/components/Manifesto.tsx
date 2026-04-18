'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Manifesto — brand story. Kinetic headline reveals line-by-line; body and
 * stats fade up on enter; twin images parallax at opposing rates for depth.
 * The stats are count-up animated with gsap on enter.
 */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Headline lines
      gsap.to('[data-man-line]', {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });

      // Fade-ups
      gsap.fromTo(
        '[data-man-fade]',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
        }
      );

      // Parallax images
      gsap.to('[data-man-img-a]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-man-img-b]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Count-up stats
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count || '0');
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.floor(obj.n)).padStart(2, '0');
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative px-6 md:px-10 py-28 md:py-40"
    >
      {/* Section label */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-16 md:mb-24">
        <span>( 01 ) &nbsp; A Brand Study</span>
        <span className="hidden md:inline">Manifesto</span>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Headline + body */}
        <div className="col-span-12 md:col-span-7">
          <h2 className="font-display font-bold leading-[0.92] tracking-tighter text-[clamp(2.25rem,6vw,5.5rem)] text-ink">
            <span className="block overflow-hidden">
              <span data-man-line className="block" style={{ transform: 'translateY(110%)' }}>
                A house of quiet
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-man-line
                className="block font-serif italic font-light text-accent"
                style={{ transform: 'translateY(110%)' }}
              >
                rebellion, rooted
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-man-line className="block" style={{ transform: 'translateY(110%)' }}>
                in the archipelago.
              </span>
            </span>
          </h2>

          <div className="mt-12 md:mt-16 max-w-xl space-y-6 text-graphite text-base md:text-lg leading-relaxed">
            <p data-man-fade>
              Founded in 2019 by a collective of Manila-based designers, INIGO
              stitches the grammar of Filipino craft into silhouettes
              engineered for a future that hasn't arrived yet. Each piece is
              treated as architecture — cut once, considered twice, worn
              forever.
            </p>
            <p data-man-fade>
              We build slow. We ship considered. A garment is a document of
              its maker. INIGO shows at Manila Fashion Week and is carried by
              a small, trusted network of boutiques across Southeast Asia and
              beyond.
            </p>
          </div>

          <div className="mt-16 md:mt-20 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { n: 47, label: 'Atelier Silhouettes' },
              { n: 12, label: 'Global Stockists' },
              { n: 6, label: 'Runway Seasons' },
            ].map((s) => (
              <div key={s.label} data-man-fade className="border-t border-ink/15 pt-4">
                <div
                  data-count={s.n}
                  className="font-display font-black text-4xl md:text-5xl tabular-nums tracking-tighter text-ink"
                >
                  00
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image pair */}
        <div className="col-span-12 md:col-span-5 relative min-h-[60vh]">
          <div
            data-man-img-a
            className="absolute top-0 right-0 w-[78%] aspect-[3/4] overflow-hidden ring-1 ring-ink/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="INIGO atelier — a model in a draped silhouette"
              fill
              sizes="(min-width: 768px) 35vw, 78vw"
              className="object-cover"
            />
          </div>
          <div
            data-man-img-b
            className="absolute bottom-0 left-0 w-[55%] aspect-[4/5] overflow-hidden ring-1 ring-ink/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1000&q=80"
              alt="INIGO detail — fabric and stitch study"
              fill
              sizes="(min-width: 768px) 25vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ash text-right leading-relaxed">
            01 / 02
            <br />
            Poblacion MNL
          </div>
        </div>
      </div>
    </section>
  );
}
