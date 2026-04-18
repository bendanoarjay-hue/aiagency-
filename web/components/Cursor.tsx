'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Cursor — two-layer custom pointer.
 *
 *   dot:  1.5px, follows instantly (0.15s linear)
 *   ring: 32px hairline, trails with power3.out over 0.5s
 *
 * `mix-blend-difference` on the outer wrapper keeps both legible on paper
 * white AND over dark editorial imagery without re-painting per section.
 * Hover targets (any `[data-cursor="hover"]`) expand the ring and swap the
 * label text for an optional `data-cursor-label`.
 */
export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip on touch / coarse pointers entirely
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      if (wrap.current) wrap.current.style.display = 'none';
      return;
    }

    const dotEl = dot.current!;
    const ringEl = ring.current!;
    const labelEl = label.current!;

    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dotEl, 'x', { duration: 0.15, ease: 'none' });
    const yTo = gsap.quickTo(dotEl, 'y', { duration: 0.15, ease: 'none' });
    const xRing = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' });
    const yRing = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(ringEl, { scale: 2.1, duration: 0.4, ease: 'power3.out' });
      const text = el.dataset.cursorLabel;
      if (text) {
        labelEl.textContent = text;
        gsap.to(labelEl, { autoAlpha: 1, duration: 0.2 });
      }
    };
    const onLeave = () => {
      gsap.to(ringEl, { scale: 1, duration: 0.4, ease: 'power3.out' });
      gsap.to(labelEl, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const targets = document.querySelectorAll<HTMLElement>('[data-cursor="hover"]');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference"
    >
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white"
      />
      <div
        ref={dot}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white"
      />
      <span
        ref={label}
        className="fixed top-0 left-0 translate-x-4 translate-y-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-0"
      />
    </div>
  );
}
