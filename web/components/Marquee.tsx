'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Marquee — infinite horizontal drift using two duplicated tracks so the loop
 * is seamless. Direction flips `direction` prop; speed is px/sec.
 */
export default function Marquee({
  items,
  speed = 60,
  direction = 'left',
}: {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}) {
  const trackA = useRef<HTMLDivElement>(null);
  const trackB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackA.current || !trackB.current) return;

    const width = trackA.current.offsetWidth;
    const duration = width / speed;
    const sign = direction === 'left' ? -1 : 1;

    gsap.set([trackA.current, trackB.current], { xPercent: 0 });

    const tween = gsap.to([trackA.current, trackB.current], {
      xPercent: sign * 100,
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.unitize((v) => {
          const n = parseFloat(v);
          return direction === 'left'
            ? ((n % 100) + 100) % 100 * -1
            : ((n % 100) + 100) % 100;
        }, '%'),
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 px-10">
          <span>{item}</span>
          <span className="text-accent font-serif text-2xl leading-none">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <section
      aria-hidden
      className="border-y border-ink/10 py-6 md:py-8 overflow-hidden"
    >
      <div className="flex whitespace-nowrap font-display font-black text-[clamp(2.5rem,8vw,8rem)] leading-none tracking-tighter uppercase text-ink">
        <div ref={trackA} className="flex shrink-0">
          {row}
        </div>
        <div ref={trackB} className="flex shrink-0" aria-hidden>
          {row}
        </div>
      </div>
    </section>
  );
}
