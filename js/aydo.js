/* Aydo — Maison de Coiffure · main script */

(() => {
  'use strict';

  /* ---- Nav: scroll state ---- */
  const nav = document.getElementById('nav');
  const updateNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---- Mobile burger ---- */
  const burger  = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* stagger siblings in the same parent */
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(nav).height || '0', 10);
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Parallax: hero SVG art ---- */
  const heroArt = document.querySelector('.hero__art');
  if (heroArt && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroArt.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

  /* ---- Reservation form ---- */
  const resaForm    = document.getElementById('resaForm');
  const resaConfirm = document.getElementById('resaConfirm');
  const resaNewBtn  = document.getElementById('resaNewBtn');
  const dateInput   = document.getElementById('rf-date');
  const heureSelect = document.getElementById('rf-heure');

  /* Set min date to tomorrow, block Sundays & Mondays */
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];

  dateInput.addEventListener('change', () => {
    const d = new Date(dateInput.value);
    const day = d.getUTCDay(); // 0=Sun, 1=Mon
    if (day === 0 || day === 1) {
      dateInput.setCustomValidity('Le salon est fermé le dimanche et le lundi.');
      showError('rf-date', 'err-date', 'Le salon est fermé dimanche et lundi.');
    } else {
      dateInput.setCustomValidity('');
      showError('rf-date', 'err-date', '');
    }
    buildTimeSlots(day);
  });

  function buildTimeSlots(day) {
    heureSelect.innerHTML = '<option value="" disabled selected>— Choisir un créneau —</option>';
    if (day === 0 || day === 1) return;
    const end = day === 6 ? 18 : 19; // Sat closes 18h, Tue-Fri closes 19h
    for (let h = 9; h < end; h++) {
      ['00', '30'].forEach(m => {
        if (h === end - 1 && m === '30') return;
        const val = `${String(h).padStart(2,'0')}h${m}`;
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        heureSelect.appendChild(opt);
      });
    }
  }
  buildTimeSlots(2); // default: Tuesday slots

  function showError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
    if (!input || !err) return;
    err.textContent = msg;
    input.classList.toggle('error', !!msg);
  }

  function validateForm() {
    let valid = true;
    const rules = [
      { id: 'rf-nom',        errId: 'err-nom',        msg: 'Veuillez indiquer votre nom.',      test: v => v.trim().length >= 2 },
      { id: 'rf-tel',        errId: 'err-tel',        msg: 'Numéro invalide.',                  test: v => /^[\d\s\+\-\.]{8,}$/.test(v.trim()) },
      { id: 'rf-prestation', errId: 'err-prestation', msg: 'Choisissez une prestation.',        test: v => v !== '' },
      { id: 'rf-date',       errId: 'err-date',       msg: 'Choisissez une date valide.',       test: v => v !== '' },
      { id: 'rf-heure',      errId: 'err-heure',      msg: 'Choisissez un créneau horaire.',    test: v => v !== '' },
    ];
    rules.forEach(r => {
      const el = document.getElementById(r.id);
      if (!el) return;
      if (!r.test(el.value)) { showError(r.id, r.errId, r.msg); valid = false; }
      else showError(r.id, r.errId, '');
    });
    return valid;
  }

  resaForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = document.getElementById('resaSubmit');
    btn.classList.add('loading');

    /* Simulate async send */
    setTimeout(() => {
      btn.classList.remove('loading');
      const nom        = document.getElementById('rf-nom').value.trim();
      const prestation = document.getElementById('rf-prestation').value;
      const date       = new Date(document.getElementById('rf-date').value);
      const heure      = document.getElementById('rf-heure').value;
      const jours = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
      const mois  = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
      const dateStr = `${jours[date.getUTCDay()]} ${date.getUTCDate()} ${mois[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

      document.getElementById('resaConfirmText').innerHTML =
        `Merci <strong>${nom}</strong> ! Votre demande pour un·e <strong>${prestation}</strong> ` +
        `le <strong>${dateStr} à ${heure}</strong> a bien été reçue.<br/>` +
        `Nous vous confirmons votre rendez-vous par téléphone sous 24h.`;

      resaForm.hidden = true;
      resaConfirm.hidden = false;
    }, 900);
  });

  resaNewBtn && resaNewBtn.addEventListener('click', () => {
    resaForm.reset();
    resaForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    resaForm.querySelectorAll('.resa-field__error').forEach(el => el.textContent = '');
    resaConfirm.hidden = true;
    resaForm.hidden = false;
  });

  /* ---- Active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__link');
  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => highlightObserver.observe(s));

})();
