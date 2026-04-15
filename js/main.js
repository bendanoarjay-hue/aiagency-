/* ═══════════════════════════════════════════════════════════
   INIGO × R–K — main.js
   Loader · Clock (Manila) · Cursor · Scroll rail ·
   Masthead auto-hide · Parallax · GSAP reveals ·
   Ticket slider · Dock + Directory + Sound · Stat counters
   ═══════════════════════════════════════════════════════════ */

(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ─────────── LOADER ─────────── */
  const loader      = $('#loader');
  const loaderCount = $('#loaderCount');
  const loaderBar   = $('#loaderBar');
  let   loaderPct   = 0;

  const loaderTimer = setInterval(() => {
    loaderPct = Math.min(100, loaderPct + Math.random() * 8 + 3);
    if (loaderCount) loaderCount.textContent = String(Math.floor(loaderPct)).padStart(2, '0');
    if (loaderBar)   loaderBar.style.width   = loaderPct + '%';
    if (loaderPct >= 100) {
      clearInterval(loaderTimer);
      setTimeout(() => loader && loader.classList.add('done'), 350);
    }
  }, 70);

  window.addEventListener('load', () => {
    loaderPct = 100;
    if (loaderCount) loaderCount.textContent = '100';
    if (loaderBar)   loaderBar.style.width   = '100%';
    setTimeout(() => loader && loader.classList.add('done'), 250);
  });

  /* ─────────── MANILA CLOCK ─────────── */
  const clockEl = $('#clockTime');
  const tickClock = () => {
    if (!clockEl) return;
    const now = new Date();
    const mnl = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    const h = String(mnl.getHours()).padStart(2, '0');
    const m = String(mnl.getMinutes()).padStart(2, '0');
    const s = String(mnl.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  };
  tickClock();
  setInterval(tickClock, 1000);

  /* ─────────── CUSTOM CURSOR ─────────── */
  const cursor     = $('#cursor');
  const cursorDot  = $('#cursorDot');
  const cursorRing = $('#cursorRing');
  let   cx = 0, cy = 0, rx = 0, ry = 0;

  if (cursor && matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', e => {
      cx = e.clientX;
      cy = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = cx + 'px';
        cursorDot.style.top  = cy + 'px';
      }
    });

    const raf = () => {
      rx += (cx - rx) * 0.16;
      ry += (cy - ry) * 0.16;
      if (cursorRing) {
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top  = ry + 'px';
      }
      requestAnimationFrame(raf);
    };
    raf();

    $$('[data-cursor="view"]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('c-view'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('c-view'));
    });
    $$('[data-cursor="small"]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('c-small'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('c-small'));
    });
  }

  /* ─────────── LENIS SMOOTH SCROLL ─────────── */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  /* ─────────── MASTHEAD AUTO-HIDE + SCROLL RAIL ─────────── */
  const mast      = $('#mast');
  const scrollBar = $('#scrollBar');
  let   lastY     = 0;

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (mast) {
      mast.classList.toggle('scrolled', y > 40);
      if (y > 200 && y > lastY + 6)      mast.classList.add('hidden');
      else if (y < lastY - 6 || y < 200) mast.classList.remove('hidden');
    }
    if (scrollBar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.height = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─────────── GSAP REVEALS + PARALLAX ─────────── */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Auto-wrap common headings/paragraphs into reveal lines
    const toWrap = $$('.about-copy h2 span, .contact-huge span, .insights-title');
    toWrap.forEach(el => {
      if (!el.classList.contains('reveal-line')) {
        const inner = document.createElement('span');
        inner.innerHTML = el.innerHTML;
        el.innerHTML = '';
        el.appendChild(inner);
        el.classList.add('reveal-line');
      }
    });

    // Reveal lines
    $$('.reveal-line').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('in'),
      });
    });

    // Hero caption fade/slide
    gsap.from('.hero-caption h1 span', {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: .08,
      delay: .4,
    });
    gsap.from('.hero-years', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: .9,
    });

    // Works grid item stagger
    $$('.works').forEach(section => {
      gsap.from(section.querySelectorAll('.work'), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: .12,
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });
    });

    // Insight card stagger
    gsap.from('.insight', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: .1,
      scrollTrigger: { trigger: '.insights-grid', start: 'top 82%' },
    });

    // Parallax on data-parallax elements
    $$('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        y: () => window.innerHeight * amt,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end:   'bottom top',
          scrub: true,
        },
      });
    });

    // Stat counters
    $$('.stat b').forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const obj = { n: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: target,
            duration: 1.6,
            ease: 'expo.out',
            onUpdate: () => {
              el.textContent = String(Math.floor(obj.n)).padStart(2, '0');
            },
          });
        },
      });
    });
  }

  /* ─────────── TICKET SLIDER ─────────── */
  const slides     = $$('.pitch-slide');
  const pitchCount = $('#pitchCount');
  const prevBtn    = $('#pitchPrev');
  const nextBtn    = $('#pitchNext');
  let   slideIdx   = 0;

  const setSlide = (i) => {
    slideIdx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === slideIdx));
    if (pitchCount) pitchCount.textContent = `${slideIdx + 1} / ${slides.length}`;
  };
  if (prevBtn) prevBtn.addEventListener('click', () => setSlide(slideIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setSlide(slideIdx + 1));

  // auto-advance
  let autoSlide = setInterval(() => setSlide(slideIdx + 1), 7000);
  $('.pitch')?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  $('.pitch')?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => setSlide(slideIdx + 1), 7000);
  });

  /* ─────────── DOCK · DIRECTORY ─────────── */
  const dirBtn   = $('[data-dock="directory"]');
  const dirPanel = $('#directory');
  const dirClose = $('#dirClose');

  const openDir = () => {
    dirPanel?.classList.add('open');
    dirBtn?.classList.add('active');
    dirPanel?.setAttribute('aria-hidden', 'false');
  };
  const closeDir = () => {
    dirPanel?.classList.remove('open');
    dirBtn?.classList.remove('active');
    dirPanel?.setAttribute('aria-hidden', 'true');
  };
  dirBtn?.addEventListener('click', () => {
    dirPanel?.classList.contains('open') ? closeDir() : openDir();
  });
  dirClose?.addEventListener('click', closeDir);
  $$('.dir-list a').forEach(a => a.addEventListener('click', closeDir));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDir(); });

  /* ─────────── DOCK · SOUND ─────────── */
  const soundBtn = $('#soundBtn');
  let   audioCtx = null;
  let   oscNode  = null;
  let   soundOn  = false;

  const startSound = () => {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc  = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 110;
      gain.gain.value = 0.015;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      oscNode = { osc, gain };
    } catch (e) { /* no-op */ }
  };
  const stopSound = () => {
    if (oscNode) {
      try { oscNode.osc.stop(); } catch (e) {}
      oscNode = null;
    }
  };
  soundBtn?.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.classList.toggle('active', soundOn);
    soundOn ? startSound() : stopSound();
  });

  /* ─────────── ANCHOR SMOOTH JUMP ─────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.3 });
      else       target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
