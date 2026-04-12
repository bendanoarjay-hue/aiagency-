'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Collection = {
  idx: string;
  title: string;
  emphasis: string;
  season: string;
  looks: string;
  image: string;
};

const COLLECTIONS: Collection[] = [
  {
    idx: '01',
    title: 'ANTIPOLO',
    emphasis: 'noir',
    season: 'SS · XXVI',
    looks: '24 looks',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    idx: '02',
    title: 'SALT',
    emphasis: '& silver',
    season: 'AW · XXV',
    looks: '18 looks',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    idx: '03',
    title: 'MONSOON',
    emphasis: 'code',
    season: 'SS · XXV',
    looks: '22 looks',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    idx: '04',
    title: 'NORTH',
    emphasis: 'chromatic',
    season: 'AW · XXIV',
    looks: '19 looks',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80',
  },
  {
    idx: '05',
    title: 'TAAL',
    emphasis: 'burnt',
    season: 'SS · XXIV',
    looks: '26 looks',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80',
  },
  {
    idx: '06',
    title: 'ARCHIPELAGO',
    emphasis: 'zero',
    season: 'Resort · XXIV',
    looks: '14 looks',
    image:
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1400&q=80',
  },
];

/**
 * Collections — editorial row list. Each row pins its title to the left with a
 * hover reveal: the matching image tracks the cursor inside the section, and
 * the row title slides right. This is the "centerpiece" interaction of the
 * page and is tuned carefully — 800ms ease-out for the slide, 400ms for the
 * image fade/scale.
 */
export default function Collections() {
  const root = useRef<HTMLElement>(null);
  const floater = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Section headline reveal
      gsap.to('[data-coll-line]', {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Row fade-in
      gsap.fromTo(
        '[data-collection-row]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        }
      );

      // Floating hover image — only wire up if we're on a hover-capable device
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const xTo = gsap.quickTo(floater.current, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(floater.current, 'y', { duration: 0.6, ease: 'power3.out' });

      const rows = el.querySelectorAll<HTMLElement>('[data-collection-row]');
      const imgs = floater.current?.querySelectorAll<HTMLElement>('[data-floater-img]');

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };

      rows.forEach((row, i) => {
        const enter = () => {
          gsap.to(floater.current, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
          });
          imgs?.forEach((img, j) => {
            gsap.to(img, {
              autoAlpha: j === i ? 1 : 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
        };
        const leave = () => {
          gsap.to(floater.current, {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          row.removeEventListener('mouseenter', enter);
          row.removeEventListener('mouseleave', leave);
        });
      });

      el.addEventListener('mousemove', onMove);
      cleanups.push(() => el.removeEventListener('mousemove', onMove));
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="collections"
      ref={root}
      className="relative px-6 md:px-10 py-28 md:py-40 border-t border-ink/10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-16 md:mb-20">
        <span>( 02 ) &nbsp; Collections & Campaigns</span>
        <span className="hidden md:inline">Six worlds</span>
      </div>

      <h2 className="font-display font-bold leading-[0.92] tracking-tighter text-[clamp(2.5rem,7vw,7rem)] text-ink mb-16 md:mb-24">
        <span className="block overflow-hidden">
          <span data-coll-line className="block" style={{ transform: 'translateY(110%)' }}>
            Six worlds,
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-coll-line
            className="block font-serif italic font-light text-accent"
            style={{ transform: 'translateY(110%)' }}
          >
            one silhouette.
          </span>
        </span>
      </h2>

      {/* Floating hover image — desktop only */}
      <div
        ref={floater}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[26vw] max-w-[420px] aspect-[3/4] opacity-0 hidden md:block"
        style={{ transform: 'translate(-50%, -50%) scale(0.95)' }}
      >
        {COLLECTIONS.map((c, i) => (
          <div
            key={c.idx}
            data-floater-img
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: 0 }}
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="26vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <ol className="relative">
        {COLLECTIONS.map((c) => (
          <li
            key={c.idx}
            data-collection-row
            data-cursor="hover"
            data-cursor-label="View"
            className="group grid grid-cols-12 items-center py-6 md:py-8 border-t border-ink/15 last:border-b last:border-ink/15 cursor-pointer"
          >
            <span className="col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
              {c.idx}
            </span>
            <h3 className="c-title col-span-7 md:col-span-7 font-display font-black leading-[0.92] tracking-tighter text-[clamp(2rem,6vw,5rem)] text-ink">
              {c.title}{' '}
              <em className="font-serif italic font-light text-accent">
                {c.emphasis}
              </em>
            </h3>
            <div className="col-span-3 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash flex flex-col md:flex-row md:gap-6">
              <span>{c.season}</span>
              <span>{c.looks}</span>
            </div>
            <span className="col-span-1 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
              →
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
