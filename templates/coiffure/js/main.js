/* Template Coiffure — interactions + rendu depuis config.json */
(function () {
  'use strict';

  /* ----- Année du footer ----- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Nav : fond au scroll ----- */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Menu mobile ----- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('nav__links--open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ----- Animations au scroll ----- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  /* ----- Rendu depuis config.json ----- */
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = String(s == null ? '' : s);
    return d.innerHTML;
  }

  fetch('config.json')
    .then(function (r) { return r.json(); })
    .then(function (cfg) {
      /* Services */
      var servicesEl = document.getElementById('servicesList');
      if (servicesEl && Array.isArray(cfg.services)) {
        servicesEl.innerHTML = cfg.services.map(function (s, i) {
          var delay = (i * 0.08).toFixed(2) + 's';
          return '<div class="service reveal" style="transition-delay:' + delay + '">' +
            '<div><div class="service__name">' + esc(s.nom) + '</div>' +
            (s.description ? '<div class="service__desc">' + esc(s.description) + '</div>' : '') +
            '</div><div class="service__price">' + esc(s.prix) + '</div></div>';
        }).join('');
        servicesEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
      }

      /* Avis */
      var reviewsEl = document.getElementById('reviewsList');
      if (reviewsEl && Array.isArray(cfg.avis)) {
        reviewsEl.innerHTML = cfg.avis.map(function (a, i) {
          var delay = (i * 0.1).toFixed(2) + 's';
          var stars = '★★★★★'.slice(0, Math.max(1, Math.min(5, a.note || 5)));
          return '<div class="review reveal" style="transition-delay:' + delay + '">' +
            '<div class="review__stars" aria-label="' + esc(a.note || 5) + ' étoiles sur 5">' + stars + '</div>' +
            '<p class="review__text">« ' + esc(a.texte) + ' »</p>' +
            '<p class="review__author">' + esc(a.auteur) + '</p></div>';
        }).join('');
        reviewsEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
      }

      /* Bouton réservation (Planity, Calendly, Cal.com ou tel:) */
      var url = cfg.reservation_url || 'tel:' + (cfg.telephone || '');
      var isExternal = url.indexOf('http') === 0;
      ['navReservation', 'heroReservation', 'ctaReservation'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.href = url;
        if (isExternal) { el.target = '_blank'; el.rel = 'noopener'; }
      });

      /* Réseaux sociaux */
      var socialsEl = document.getElementById('socials');
      if (socialsEl) {
        var html = '';
        if (cfg.instagram) html += '<a href="' + esc(cfg.instagram) + '" target="_blank" rel="noopener">Instagram</a>';
        if (cfg.tiktok) html += '<a href="' + esc(cfg.tiktok) + '" target="_blank" rel="noopener">TikTok</a>';
        socialsEl.innerHTML = html;
      }
    })
    .catch(function (err) {
      console.warn('config.json introuvable ou invalide :', err);
    });
})();
