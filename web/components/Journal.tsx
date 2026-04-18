'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const POSTS = [
  {
    kind: 'Essay · 08 min',
    date: 'Mar XXVI',
    title: 'On making clothes that outlive the season.',
    cta: 'Read',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    kind: 'Film · 02 min',
    date: 'Feb XXVI',
    title: 'Inside ANTIPOLO noir — behind the runway.',
    cta: 'Watch',
    image:
      'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    kind: 'Interview · 12 min',
    date: 'Jan XXVI',
    title: 'The quiet weavers of Ilocos — a visit.',
    cta: 'Read',
    image:
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Journal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to('[data-jr-line]', {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });
      gsap.fromTo(
        '[data-jr-card]',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journal"
      ref={root}
      className="relative px-6 md:px-10 py-28 md:py-40 border-t border-ink/10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ash mb-16 md:mb-20">
        <span>( 04 ) &nbsp; The Journal</span>
        <span className="hidden md:inline">Stories from the atelier</span>
      </div>

      <h2 className="font-display font-bold leading-[0.92] tracking-tighter text-[clamp(2.5rem,7vw,7rem)] text-ink mb-16 md:mb-24">
        <span className="block overflow-hidden">
          <span data-jr-line className="block" style={{ transform: 'translateY(110%)' }}>
            Stories
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-jr-line
            className="block font-serif italic font-light text-accent"
            style={{ transform: 'translateY(110%)' }}
          >
            from the atelier.
          </span>
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {POSTS.map((p, i) => (
          <article
            key={i}
            data-jr-card
            data-cursor="hover"
            data-cursor-label={p.cta}
            className="group flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-ink/10">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
              <span>{p.kind}</span>
              <time>{p.date}</time>
            </div>
            <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl leading-[1.05] tracking-tight text-ink">
              {p.title}
            </h3>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
              <span className="group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {p.cta} →
              </span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
