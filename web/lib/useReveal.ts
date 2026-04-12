'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useReveal — scroll-triggered reveal for child elements matching a selector.
 *
 * Pairs with `.mask > .mask-inner` in globals.css: we translate the inner span
 * from `translateY(110%)` back to `0` on enter, staggered, with an expo ease.
 * One-shot by design — the page should feel deliberate, not twitchy on rescroll.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  selector = '.mask-inner',
  options: {
    y?: string;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: options.duration ?? 1.1,
          ease: 'expo.out',
          stagger: options.stagger ?? 0.08,
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: ref.current,
            start: options.start ?? 'top 82%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, options.y, options.duration, options.stagger, options.start, options.delay]);

  return ref;
}
