'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAMES = [
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
    caption: '01 — Noir',
    cls: 'md:col-span-4 md:row-span-2 aspect-[3/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80',
    caption: '02 — Silver',
    cls: 'md:col-span-4 aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80',
    caption: '03 — Code',
    cls: 'md:col-span-4 aspect-[4/3] md:mt-24',
  },
  {
    src: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=1000&q=80',
    caption: '04 — Chroma',
    cls: 'md:col-span-4 aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    caption: '05 — Burnt',
    cls: 'md:col-span-4 md:row-span-2 aspect-[3/4] md:-mt-16',
  },
  {
    src: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&w=1000&q=80',
    caption: '06 — Zero',
    cls: 'md:col-span-4 aspect-[4/3]',
  },
];

/**
 * Lookbook — asymmetric editorial grid with staggered mt/-mt offsets. Each
 * frame parallaxes on a slightly different rate so the grid "breathes" as you
 * scroll past. Captions sit beneath each frame in tiny mono type.
 */
export default function Lookbook() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to('[data-lb-line]', {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });

      gsap.fromTo(
        '[data-lb-frame]',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        }
      );

      // Parallax individual frames
      document.querySelectorAll<HTMLElement>('[data-lb-frame]').forEach((el, i) => {
        const rate = (i % 2 === 0 ? -1 : 1) * (6 + i * 1.5);
        gsap.to(el, {
          yPercent: rate,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={root}
      className="relative px-6 md:px-10 py-28 md:py-40 border-t border-ink/10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-16 md:mb-20">
        <span>( 03 ) &nbsp; Lookbook / Editorial</span>
        <span className="hidden md:inline">Archive</span>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10 items-end mb-20 md:mb-28">
        <h2 className="col-span-12 md:col-span-8 font-display font-bold leading-[0.92] tracking-tighter text-[clamp(2.5rem,9vw,10rem)] text-ink">
          <span className="block overflow-hidden">
            <span data-lb-line className="block" style={{ transform: 'translateY(110%)' }}>
              EDITORIAL
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-lb-line
              className="block font-serif italic font-light text-accent"
              style={{ transform: 'translateY(110%)' }}
            >
              archive
            </span>
          </span>
        </h2>
        <p className="col-span-12 md:col-span-4 text-graphite text-base md:text-lg leading-relaxed max-w-sm">
          Shot across Manila, Batanes, and Kyoto — captured in analog 35mm and
          medium-format digital. A visual ledger of each season.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {FRAMES.map((f, i) => (
          <figure
            key={i}
            data-lb-frame
            data-cursor="hover"
            className={`group relative ${f.cls}`}
          >
            <div className="relative w-full h-full overflow-hidden ring-1 ring-ink/10">
              <Image
                src={f.src}
                alt={f.caption}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
              <span>{f.caption}</span>
              <span>INIGO / MNL</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
