/* ═══════════════════════════════════════════════════════
   INIGO — main.js
   Lenis smooth scroll · GSAP ScrollTrigger · cursor · menu
   ═══════════════════════════════════════════════════════ */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ─── LOADER ─────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderCount = document.getElementById('loaderCount');

  const runLoader = () =>
    new Promise((resolve) => {
      let p = 0;
      const tick = () => {
        p += Math.max(1, Math.round((100 - p) * 0.06));
        if (p >= 100) p = 100;
        loaderBar.style.width = p + '%';
        loaderCount.textContent = String(p).padStart(2, '0');
        if (p < 100) requestAnimationFrame(tick);
        else {
          setTimeout(() => {
            loader.classList.add('gone');
            resolve();
          }, 260);
        }
      };
      requestAnimationFrame(tick);
    });

  /* ─── LENIS SMOOTH SCROLL ────────────── */
  let lenis;
  const initLenis = () => {
    if (prefersReduced || typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  };

  /* ─── CUSTOM CURSOR ──────────────────── */
  const initCursor = () => {
    if (isTouch) return;
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const label = document.getElementById('cursorLabel');

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;
    let dx = mx, dy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const loop = () => {
      dx += (mx - dx) * 0.9;
      dy += (my - dy) * 0.9;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      label.style.transform = `translate(${rx}px, ${ry + 30}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const hoverables = document.querySelectorAll(
      'a, button, [data-cursor], .collection-row, .lb, .journal-card'
    );
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (el.matches('.collection-row, .lb, .journal-card')) {
          document.body.classList.add('cursor-view');
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover', 'cursor-view');
      });
    });
  };

  /* ─── MOBILE MENU ────────────────────── */
  const initMenu = () => {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    const close = () => document.body.classList.remove('menu-open');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  };

  /* ─── SMOOTH ANCHOR NAV ──────────────── */
  const initAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: 0 });
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };

  /* ─── HIDE NAV ON SCROLL DOWN ────────── */
  const initNavAutoHide = () => {
    const nav = document.querySelector('.nav');
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last && y > 160) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  /* ─── GSAP ANIMATIONS ────────────────── */
  const initGSAP = () => {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    /* Hero entrance — split words up */
    const heroWords = document.querySelectorAll('.hero-title .word');
    gsap.set(heroWords, { yPercent: 110 });
    gsap.to(heroWords, {
      yPercent: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.09,
      delay: 0.15,
    });

    gsap.from('.hero-tag', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.1,
      ease: 'power3.out',
    });
    gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0 });

    gsap.from('.hero-desc, .hero-meta > div, .hero-scroll', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
    });
    gsap.set('.hero-desc, .hero-meta > div, .hero-scroll', { clearProps: 'opacity,transform' });

    /* Hero image parallax */
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero-media img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* Parallax elements */
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.dataset.parallax) || 0.1;
        gsap.to(el, {
          yPercent: amt * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      /* Reveal lines (masked text) */
      document.querySelectorAll('.reveal-line > *').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      /* Generic reveal */
      document.querySelectorAll('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });

      /* Section title entrance */
      gsap.utils.toArray('.section-title').forEach((t) => {
        gsap.from(t, {
          letterSpacing: '0em',
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: t, start: 'top 80%' },
        });
      });

      /* Stat counters */
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count, 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(2, '0');
          },
        });
      });

      /* Footer huge wordmark scale */
      gsap.from('.footer-huge span span', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }
  };

  /* ─── COLLECTIONS HOVER IMAGE ────────── */
  const initCollectionHover = () => {
    if (isTouch) return;
    const hoverBox = document.getElementById('collectionHover');
    const rows = document.querySelectorAll('.collection-row');
    if (!hoverBox || !rows.length) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      hoverBox.style.left = cx + 'px';
      hoverBox.style.top = cy + 'px';
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        hoverBox.style.backgroundImage = `url(${row.dataset.img})`;
        hoverBox.classList.add('active');
      });
      row.addEventListener('mouseleave', () => {
        hoverBox.classList.remove('active');
      });
    });
  };

  /* ─── BOOT ───────────────────────────── */
  const boot = async () => {
    initCursor();
    initMenu();
    initLenis();
    initAnchors();
    initNavAutoHide();
    initCollectionHover();
    await runLoader();
    initGSAP();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
