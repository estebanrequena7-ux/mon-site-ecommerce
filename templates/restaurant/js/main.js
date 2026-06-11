/* Template Restaurant */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 30);
  }, { passive: true });
  nav.classList.toggle('nav--scrolled', window.scrollY > 30);

  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('nav__links--open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('reveal--visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = String(s == null ? '' : s);
    return d.innerHTML;
  }

  fetch('config.json')
    .then(function (r) { return r.json(); })
    .then(function (cfg) {
      /* Menu par catégories */
      var menuEl = document.getElementById('menuList');
      if (menuEl && Array.isArray(cfg.menu)) {
        menuEl.innerHTML = cfg.menu.map(function (cat) {
          var items = (cat.items || []).map(function (it) {
            return '<div class="menu-item reveal">' +
              '<div><div class="menu-item__name">' + esc(it.nom) + '</div>' +
              (it.description ? '<div class="menu-item__desc">' + esc(it.description) + '</div>' : '') +
              '</div><div class="menu-item__price">' + esc(it.prix) + '</div></div>';
          }).join('');
          return '<div class="menu-category reveal">' +
            '<h3 class="menu-category__title">' + esc(cat.categorie) + '</h3>' +
            '<div class="menu-items">' + items + '</div></div>';
        }).join('');
        menuEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
      }

      /* Avis */
      var reviewsEl = document.getElementById('reviewsList');
      if (reviewsEl && Array.isArray(cfg.avis)) {
        reviewsEl.innerHTML = cfg.avis.map(function (a) {
          var stars = '★★★★★'.slice(0, Math.max(1, Math.min(5, a.note || 5)));
          return '<div class="review reveal">' +
            '<div class="review__stars" aria-label="' + esc(a.note || 5) + ' étoiles sur 5">' + stars + '</div>' +
            '<p class="review__text">« ' + esc(a.texte) + ' »</p>' +
            '<p class="review__author">' + esc(a.auteur) + '</p></div>';
        }).join('');
        reviewsEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
      }

      /* Boutons réservation */
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
    .catch(function (err) { console.warn('config.json introuvable :', err); });
})();
