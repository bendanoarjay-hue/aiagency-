# INIGO — Luxury Fashion from Manila

A production-ready, single-page website for **INIGO**, a luxury fashion label from Manila, Philippines — elevated streetwear meets futuristic couture.

Dark, premium, futuristic fashion aesthetic with kinetic typography, scroll-triggered animations, parallax imagery, a custom cursor, and smooth Lenis scroll — built as a static single-page site so it deploys anywhere instantly.

## Stack

- **HTML5** — semantic, accessible, SEO-ready (Open Graph + Twitter meta)
- **Tailwind CSS** — loaded via CDN for utility classes + a small custom theme
- **Custom CSS** (`css/styles.css`) — all typography, layout, and motion primitives
- **GSAP 3** + **ScrollTrigger** — scroll reveals, parallax, kinetic text, counters
- **Lenis** — buttery smooth scroll with GSAP ticker integration
- **Google Fonts** — Syne (display), Cormorant Garamond (serif), Space Mono, Archivo

No build step required.

## Structure

```
.
├── index.html        # single-page markup
├── css/
│   └── styles.css    # core styles
├── js/
│   └── main.js       # Lenis + GSAP + cursor + menu
└── README.md
```

## Sections

1. **Loader** — animated wordmark + progress bar + coordinates
2. **Hero** — dramatic full-screen image, kinetic title, meta row
3. **Marquee** — infinite kinetic typography strip
4. **About** — kinetic heading, brand copy, animated stat counters, dual parallax imagery
5. **Collections** — hover-driven list with a cursor-following preview image
6. **Lookbook** — 12-column asymmetric editorial grid
7. **Journal** — 3-up article cards with image hover states
8. **Contact / Stockists** — mega type, contact blocks with slide-up fills, stockist ledger
9. **Footer** — oversized outline wordmark, newsletter form, legal bottom

## Run locally

Because it's a static site, just serve the directory.

```bash
# Option A — Python
python3 -m http.server 8080

# Option B — Node (any static server)
npx serve .

# Option C — open directly
open index.html
```

Then visit `http://localhost:8080`.

## Deploy

Drag-and-drop the folder into **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**. No build command. Output directory: `.` (root).

## Customization

- **Brand color** — edit `--accent` in `css/styles.css` (currently `#c8b287` warm metallic)
- **Imagery** — all images are external placeholders (Unsplash). Swap the `src` attributes in `index.html` with your production assets.
- **Copy** — every string lives in `index.html` — no templating layer.
- **Type scale** — driven by `clamp()` — adjust in the CSS custom selectors.

## Accessibility & Performance

- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`)
- Alt text on all images
- Honors `prefers-reduced-motion` (disables Lenis and heavy motion)
- Custom cursor disabled on touch devices
- Fonts preconnected
- Tailwind CDN + GSAP + Lenis served from jsDelivr with HTTP caching
- Images lazy-decoded via browser defaults; no layout shift (aspect-ratios set)

## Branding

- **Name** — INIGO
- **Origin** — Manila, Philippines (14.5995° N, 120.9842° E)
- **Tone** — Professional, cool, futuristic, sophisticated, edgy
- **Tagline** — *Future couture from Manila*

## License

© 2026 INIGO ATELIER. All rights reserved.
