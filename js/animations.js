/* =============================================
   Auré — Animations & Dynamic UI
   ============================================= */

(function () {
  'use strict';

  /* ─── CUSTOM CURSOR ──────────────────────── */
  function initCursor() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const dot  = document.querySelector('.cursor__dot');
    const ring = document.querySelector('.cursor__ring');
    if (!dot || !ring) return;

    const cursor = document.querySelector('.cursor');
    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('cursor--click'));
    document.addEventListener('mouseleave', () => cursor.classList.add('cursor--hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('cursor--hidden'));

    document.querySelectorAll('a, button, [role="button"], .pill, .size-pill, .thumb, .category-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });

    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--text'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--text'));
    });
  }

  /* ─── PRELOADER ──────────────────────────── */
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    const fill    = preloader.querySelector('.preloader__bar-fill');
    const chars   = preloader.querySelectorAll('.preloader__logo span');
    const label   = preloader.querySelector('.preloader__label');
    let progress  = 0;
    const labels  = ['Chargement', 'Qualité', 'Artisanat', 'Luxe'];
    let li = 0;

    setTimeout(() => chars.forEach(c => c.classList.add('visible')), 100);

    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';
      if (label && li < labels.length) { label.textContent = labels[li++]; }
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.classList.remove('preloader-active');
          triggerHeroLoad();
        }, 400);
      }
    }, 120);
  }

  /* ─── HERO LOAD ──────────────────────────── */
  function triggerHeroLoad() {
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('hero--loaded');
  }

  /* ─── SCROLL REVEALS ─────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal], [data-stagger], .split-text, .draw-line, .clip-reveal, .section-label');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ─── SPLIT TEXT ─────────────────────────── */
  function initSplitText() {
    document.querySelectorAll('.split-text').forEach(el => {
      const text = el.textContent.trim();
      el.innerHTML = text.split(' ').map(word =>
        `<span class="word">${word.split('').map(c => `<span class="char">${c}</span>`).join('')}</span>`
      ).join(' ');
    });
  }

  /* ─── PARALLAX ───────────────────────────── */
  function initParallax() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }, { passive: true });
  }

  /* ─── MAGNETIC BUTTONS ───────────────────── */
  function initMagnetic() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    document.querySelectorAll('.btn--primary, .btn--outline').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) * 0.25;
        const dy = (e.clientY - rect.top  - rect.height / 2) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─── COUNTERS ───────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.counter-num');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseFloat(el.dataset.target || el.textContent);
        const suffix = el.dataset.suffix || '';
        const dur  = 1800;
        const step = 16;
        const inc  = end / (dur / step);
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= end) { cur = end; clearInterval(t); }
          el.textContent = (Number.isInteger(end) ? Math.floor(cur) : cur.toFixed(1)) + suffix;
        }, step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => {
      el.dataset.target = parseFloat(el.textContent);
      observer.observe(el);
    });
  }

  /* ─── SCROLL PROGRESS ────────────────────── */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / max * 100) + '%';
    }, { passive: true });
  }

  /* ─── CART FAB ───────────────────────────── */
  function initCartFab() {
    const fab = document.querySelector('.cart-fab');
    if (!fab) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) fab.classList.add('visible');
      else fab.classList.remove('visible');
    }, { passive: true });

    fab.addEventListener('click', () => {
      document.querySelector('.cart-drawer')?.classList.add('cart-drawer--open');
      document.querySelector('.cart-overlay')?.classList.add('active');
    });

    function updateFabCount() {
      const countEl = fab.querySelector('.cart-fab-count');
      if (!countEl) return;
      const total = (window.cart?.items || []).reduce((s, i) => s + i.qty, 0);
      countEl.textContent = total;
      countEl.classList.toggle('visible', total > 0);
    }

    document.addEventListener('cart:updated', updateFabCount);
    updateFabCount();
  }

  /* ─── PRODUCT IMAGE FOLLOWER ─────────────── */
  function initProductFollower() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const img = document.querySelector('.product-follow-img');
    if (!img) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

    function loop() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      img.style.left = (cx + 20) + 'px';
      img.style.top  = (cy - 115) + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('.product-card').forEach(card => {
      const svg = card.querySelector('svg');
      card.addEventListener('mouseenter', () => {
        if (svg) img.innerHTML = svg.outerHTML;
        img.classList.add('visible');
      });
      card.addEventListener('mouseleave', () => img.classList.remove('visible'));
    });
  }

  /* ─── PAGE TRANSITIONS ───────────────────── */
  function initPageTransitions() {
    const overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    overlay.classList.add('leave');

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
      if (!href.endsWith('.html') && !href.endsWith('/') && href !== '/' && !href.match(/^[a-zA-Z0-9_-]+\.html$/)) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.classList.remove('leave');
        overlay.classList.add('enter');
        setTimeout(() => { window.location.href = href; }, 550);
      });
    });
  }

  /* ─── HEADER SCROLL STYLE ────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ─── STAGGER DELAY for [data-delay] ────── */
  function applyDelays() {
    document.querySelectorAll('[data-delay]').forEach(el => {
      el.style.transitionDelay = el.dataset.delay + 's';
    });
  }

  /* ─── INIT ───────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('preloader-active');
    applyDelays();
    initSplitText();
    initReveal();
    initParallax();
    initScrollProgress();
    initCartFab();
    initCounters();
    initPreloader();
    initCursor();
    initMagnetic();
    initProductFollower();
    initPageTransitions();
    initHeaderScroll();

    if (!document.querySelector('.preloader')) {
      triggerHeroLoad();
    }
  });
})();
