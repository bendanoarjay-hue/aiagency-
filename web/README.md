# INIGO — Luxury Fashion from Manila

A Next.js 15 / Tailwind / GSAP build of the INIGO site: a pure-white,
editorial, motion-forward presentation for a Manila luxury fashion house.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript strict)
- **Tailwind CSS 3.4** (custom palette, no plugins)
- **GSAP 3.12** + ScrollTrigger — scroll-driven reveals, parallax, count-ups
- **Lenis 1.1** — smoothscroll, synced to GSAP's ticker so ScrollTrigger
  reads the virtualised scroll position
- **next/font** — Syne (display), Cormorant Garamond (serif), Space Mono
  (editorial captions), Archivo (body)

## Project layout

```
web/
├── app/
│   ├── layout.tsx          # fonts, metadata, Loader + Cursor + SmoothScroll
│   ├── page.tsx            # section composition
│   └── globals.css         # Tailwind + mask primitives + Lenis styles
├── components/
│   ├── SmoothScroll.tsx    # Lenis ↔ GSAP bridge
│   ├── Cursor.tsx          # two-layer mix-blend-difference pointer
│   ├── Loader.tsx          # preflight + 'inigo:loader-done' event
│   ├── Nav.tsx             # fixed nav w/ mobile sheet, mix-blend
│   ├── Hero.tsx            # masked headline, parallax plate
│   ├── Marquee.tsx         # seamless dual-track drift
│   ├── Manifesto.tsx       # brand story, count-up stats, paired parallax
│   ├── Collections.tsx     # row list w/ cursor-tracked hover image
│   ├── Lookbook.tsx        # asymmetric editorial grid, frame parallax
│   ├── Journal.tsx         # card triptych
│   ├── Contact.tsx         # mailto blocks + stockist ledger
│   └── Footer.tsx          # monolithic wordmark + newsletter
├── lib/
│   └── useReveal.ts        # shared scroll-reveal hook
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Getting started

```bash
cd web
npm install
npm run dev
```

Visit <http://localhost:3000>.

### Commands

| Command         | What it does                           |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start Next dev server (Turbopack)      |
| `npm run build` | Production build                       |
| `npm run start` | Serve the production build on :3000    |
| `npm run lint`  | ESLint (next/core-web-vitals ruleset)  |

## Design system

| Token       | Hex        | Role                                    |
| ----------- | ---------- | --------------------------------------- |
| `paper`     | `#ffffff`  | Page background                         |
| `ink`       | `#0a0a0c`  | Primary text, display type              |
| `graphite`  | `#1a1a1f`  | Body copy, secondary text               |
| `ash`       | `#6b6b73`  | Captions, mono metadata, hairline rules |
| `bone`      | `#f4f2ed`  | Warm tonal fills                        |
| `silver`    | `#b8b5ac`  | Cool metallic highlight                 |
| `accent`    | `#8a7b5c`  | Burnished brass — the only hue on page  |

Depth is carried by hairline `ink/10` borders and oversized photography,
never by drop shadows or glass effects.

### Typography

| Family             | Usage                                 |
| ------------------ | ------------------------------------- |
| **Syne**           | All display headlines, nav, wordmark  |
| **Cormorant**      | Italic "soul" lines inside headlines  |
| **Space Mono**     | Section indices, captions, metadata   |
| **Archivo**        | Body copy                             |

## Animation principles

All motion is scroll-linked and fires **once** — the page feels deliberate,
not twitchy on rescroll.

- **Ease vocabulary:** `expo.out` (1.1–1.3s) for reveals, `power3.out`
  (0.4–1.0s) for fades, `expo.inOut` for the loader exit, `none` (scrubbed)
  for parallax.
- **Mask reveals:** every headline word sits inside `.block overflow-hidden`
  with a child translated 110% that snaps back to 0. No character-scramble
  effects — they age badly.
- **Cursor trail:** ring uses `gsap.quickTo` at 0.5s `power3.out`, dot at
  0.15s linear. `mix-blend-difference` on the wrapper keeps both legible
  on white and over imagery without per-section restyling.
- **Collections hover:** a floating image element is translated to the
  cursor position inside the section bounding box; row titles slide right
  on hover via CSS transition, not GSAP, because it's cheap and matches the
  ease.

## Accessibility

- `prefers-reduced-motion` short-circuits Lenis (duration 0) and respects
  the CSS `transition-duration: 0.01ms` override.
- Custom cursor is disabled on `pointer: coarse` devices — native touch
  interaction is preserved.
- All mailto / navigation links are real anchors; the custom cursor never
  intercepts focus or click events (`pointer-events: none` on the wrapper).
- Focus-visible rings render a 1px `ink` outline at 4px offset.
- Nav links have an aria-label'd primary region; the mobile menu toggle
  announces its expanded state.

## Deploying for iPad preview

The static `index.html` at the repo root (the existing single-file build)
is what currently renders at
<https://raw.githack.com/bendanoarjay-hue/aiagency-/claude/inigo-ipad-preview-DjdNs/index.html>
— that URL stays working; this Next.js project lives alongside it and is
not served by raw.githack (it needs a build step).

The fastest path to put *this* build on your iPad:

### Option 1: Vercel (recommended)

```bash
npm i -g vercel
cd web
vercel          # first run — link/create project
vercel --prod   # ship it
```

Vercel auto-detects Next.js 15 and zero-configs the build. You'll get a
`*.vercel.app` URL that opens perfectly on iPad Safari.

### Option 2: Local network preview

If your iPad is on the same Wi-Fi:

```bash
cd web
npm run build
npm run start -- -H 0.0.0.0
```

Then on the iPad, open `http://<your-mac-ip>:3000`.

### Option 3: Static export

For a fully static host (Cloudflare Pages, Netlify, GitHub Pages):

1. Add `output: 'export'` to `next.config.ts`
2. Swap `next/image` with `<img>` for remote Unsplash sources (or set
   `images: { unoptimized: true }`)
3. `npm run build` produces `out/` — deploy that directory.

## GSAP licensing

This project uses only GSAP's free core (`gsap` and `ScrollTrigger`).
SplitText is available from GSAP's Club plugins and is **not** used here
— all text reveals are DOM-based with `.mask > .mask-inner` primitives,
which means no licensing concern and better hydration behavior.

## Content notes

- All imagery is sourced from Unsplash as placeholders. Replace
  `https://images.unsplash.com/...` URLs in the section components with
  real INIGO lookbook assets when available.
- Copy is original, written for an INIGO brand direction: elevated
  streetwear × futuristic couture, Manila-rooted, confident but quiet.
- Stockist list is illustrative and should be replaced with real partners
  before launch.
