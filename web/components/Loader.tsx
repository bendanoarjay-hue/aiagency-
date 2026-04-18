'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Loader — a ~1.9s preflight: numeric counter to 100, a scaled hairline bar,
 * then an `expo.inOut` exit that releases the hero headline mask via a custom
 * event (SmoothScroll / Hero listen for `inigo:loader-done`).
 */
export default function Loader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('inigo:loader-done'));
      },
    });

    tl.to(obj, {
      n: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.floor(obj.n)),
    })
      .to('#loader-bar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
      .to('#loader-meta', { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, '+=0.15')
      .to('#loader', {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      id="loader"
      aria-hidden
      className="fixed inset-0 z-[100] bg-paper flex flex-col justify-between"
    >
      <div className="flex items-start justify-between px-6 md:px-10 pt-6 md:pt-8">
        <span className="font-display text-ink text-base md:text-lg font-bold tracking-tight">
          INIGO
        </span>
        <span
          id="loader-meta"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash text-right leading-relaxed"
        >
          14.5995° N&nbsp;&nbsp;120.9842° E
          <br />
          MANILA / PH
        </span>
      </div>

      <div className="flex items-end justify-between px-6 md:px-10 pb-6 md:pb-10 gap-8">
        <span className="font-serif italic text-ink text-sm md:text-base">
          A house of quiet rebellion.
        </span>
        <div className="flex-1 max-w-[50vw] h-px bg-ink/10 overflow-hidden">
          <div
            id="loader-bar"
            className="h-full bg-ink origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="font-mono text-xs md:text-sm tabular-nums text-ink">
          {count.toString().padStart(3, '0')}
          <span className="text-ash">/100</span>
        </span>
      </div>
    </div>
  );
}
