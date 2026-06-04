/* =============================================
   Auré — Premium Experience
   Spotlight · 3D Tilt · Particles · Showcase
   ============================================= */

(function () {
  'use strict';

  /* ─── HERO MOUSE SPOTLIGHT ─── */
  function initSpotlight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(2);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(2);
      hero.style.setProperty('--mx', x + '%');
      hero.style.setProperty('--my', y + '%');
    });
  }

  /* ─── GOLD DUST PARTICLES ─── */
  function initParticles() {
    const container = document.querySelector('.hero__particles');
    if (!container) return;

    const count = 40;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hero__particle';
      const size = (Math.random() * 2 + 1).toFixed(1);
      const left = (Math.random() * 90 + 5).toFixed(1);
      const bottom = (Math.random() * 40).toFixed(1);
      const dur  = (Math.random() * 8 + 5).toFixed(1);
      const del  = (Math.random() * 10).toFixed(1);
      p.style.cssText = `left:${left}%;bottom:${bottom}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${del}s`;
      container.appendChild(p);
    }
  }

  /* ─── 3D CARD TILT ─── */
  function initCardTilt() {
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    document.querySelectorAll('.product-card, .showcase-item').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        card.style.transition = 'box-shadow 0.4s ease';
        card.style.transform  = `perspective(900px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 7).toFixed(2)}deg) translateY(-8px) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease';
        card.style.transform  = '';
      });
    });
  }

  /* ─── SHOWCASE DRAG SCROLL ─── */
  function initShowcaseDrag() {
    const wrapper = document.querySelector('.showcase-scroll-wrapper');
    if (!wrapper) return;

    let isDown = false, startX, scrollLeft;

    wrapper.addEventListener('mousedown', e => {
      isDown = true;
      startX     = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });
    document.addEventListener('mouseup',   () => { isDown = false; });
    wrapper.addEventListener('mouseleave', () => { isDown = false; });
    wrapper.addEventListener('mousemove',  e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.6;
      wrapper.scrollLeft = scrollLeft - walk;
    });

    /* touch */
    let tx0;
    wrapper.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
    wrapper.addEventListener('touchmove',  e => {
      wrapper.scrollLeft += (tx0 - e.touches[0].clientX) * 0.8;
      tx0 = e.touches[0].clientX;
    }, { passive: true });
  }

  /* ─── SHOWCASE AUTO-SCROLL ─── */
  function initShowcaseAutoScroll() {
    const wrapper = document.querySelector('.showcase-scroll-wrapper');
    const track   = document.querySelector('.showcase-track');
    if (!wrapper || !track) return;

    let pos = 0, paused = false, raf;

    function tick() {
      if (!paused) {
        pos += 0.4;
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        wrapper.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    wrapper.addEventListener('mouseenter', () => { paused = true; });
    wrapper.addEventListener('mouseleave', () => { paused = false; });
    wrapper.addEventListener('touchstart',  () => { paused = true; cancelAnimationFrame(raf); }, { passive: true });
  }

  /* ─── GOLD STATS COUNTERS ─── */
  function initGoldCounters() {
    const items = document.querySelectorAll('.stats-band-gold__value[data-count]');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec    = String(target).includes('.');
        const dur    = 2200;
        const fps    = 60;
        const frames = dur / (1000 / fps);
        const inc    = target / frames;
        let cur      = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = (dec ? cur.toFixed(1) : Math.floor(cur).toLocaleString('fr-FR')) + suffix;
        }, 1000 / fps);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    items.forEach(el => {
      el.dataset.count = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
      el.dataset.suffix = el.textContent.replace(/[0-9.,\s]/g, '').trim();
      observer.observe(el);
    });
  }

  /* ─── HERO JEWELRY PARALLAX ─── */
  function initJewelParallax() {
    const deco  = document.querySelector('.hero__jewelry-deco');
    const inner = document.querySelector('.hero__jewelry-inner');
    if (!deco) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      deco.style.marginTop  = (y * 0.12) + 'px';
      if (inner) inner.style.marginTop = (y * 0.08) + 'px';
    }, { passive: true });
  }

  /* ─── HEADER TRANSPARENCY ─── */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    const isDark = header.classList.contains('header--dark');

    const update = () => {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
        if (isDark) header.style.background = 'rgba(5,5,5,0.92)';
      } else {
        header.classList.remove('header--scrolled');
        if (isDark) header.style.background = '';
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─── SECTION AMBIENT GLOW ─── */
  function initAmbientGlow() {
    const sections = document.querySelectorAll('.section--cream, .section');
    sections.forEach(sec => {
      sec.addEventListener('mouseenter', () => {
        sec.style.setProperty('--ambient', '1');
      });
    });
  }

  /* ─── REVEAL SECTION LABELS ─── */
  function initSectionLabels() {
    document.querySelectorAll('.section-label').forEach(el => {
      if (!el.closest('[data-reveal]') && !el.classList.contains('revealed')) {
        el.setAttribute('data-reveal', 'fade');
      }
    });
  }

  /* ─── INIT ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initSpotlight();
    initParticles();
    initCardTilt();
    initShowcaseDrag();
    initShowcaseAutoScroll();
    initGoldCounters();
    initJewelParallax();
    initHeaderScroll();
    initSectionLabels();
  });

})();
