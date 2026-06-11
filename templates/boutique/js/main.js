/* Template Boutique */
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
      /* Produits */
      var productsEl = document.getElementById('productsList');
      if (productsEl && Array.isArray(cfg.produits)) {
        productsEl.innerHTML = cfg.produits.map(function (p) {
          return '<div class="product reveal">' +
            '<div class="product__img"><img src="' + esc(p.image || 'images/photo-2.svg') +
            '" alt="' + esc(p.nom) + ' — ' + esc(cfg.nom || '') + '" loading="lazy"></div>' +
            '<div class="product__body">' +
            (p.badge ? '<span class="product__badge">' + esc(p.badge) + '</span>' : '') +
            '<div class="product__name">' + esc(p.nom) + '</div>' +
            (p.description ? '<div class="product__desc">' + esc(p.description) + '</div>' : '') +
            '<div class="product__price">' + esc(p.prix) + '</div>' +
            '</div></div>';
        }).join('');
        productsEl.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
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
