'use client';

import { useState, FormEvent } from 'react';

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="relative border-t border-ink/10 px-6 md:px-10 pt-20 pb-8 overflow-hidden">
      {/* Monolithic wordmark — clipped by overflow-hidden */}
      <div className="mb-20 md:mb-28 select-none">
        <div className="font-display font-black leading-[0.82] tracking-[-0.05em] text-[clamp(6rem,28vw,28rem)] text-ink">
          INIGO
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-16 border-b border-ink/15">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash mb-3">
            Atelier
          </div>
          <p className="text-sm text-graphite leading-relaxed">
            28 Don Pedro St.
            <br />
            Poblacion, Makati
            <br />
            Metro Manila 1210, PH
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash mb-3">
            Contact
          </div>
          <p className="text-sm text-graphite leading-relaxed">
            studio@inigo.mnl
            <br />
            +63 2 8822 4421
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash mb-3">
            Social
          </div>
          <ul className="text-sm text-graphite space-y-1">
            <li>
              <a data-cursor="hover" href="#" className="hover:text-ink">
                Instagram ↗
              </a>
            </li>
            <li>
              <a data-cursor="hover" href="#" className="hover:text-ink">
                TikTok ↗
              </a>
            </li>
            <li>
              <a data-cursor="hover" href="#" className="hover:text-ink">
                Vimeo ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash mb-3">
            Newsletter
          </div>
          <form onSubmit={onSubmit} className="relative">
            <label htmlFor="nl" className="sr-only">
              Email address
            </label>
            <input
              id="nl"
              type="email"
              required
              placeholder="your@email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink/30 py-2 pr-10 font-sans text-sm text-ink placeholder:text-ash focus:border-ink focus:outline-none transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              data-cursor="hover"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-ink font-mono text-sm"
            >
              →
            </button>
            <span
              className={`block mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent transition-opacity duration-500 ${
                submitted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Subscribed.
            </span>
          </form>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
        <span>© MMXXVI INIGO Atelier, Inc.</span>
        <span>Crafted in Manila</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
