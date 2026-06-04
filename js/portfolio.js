'use strict';

/* ── Custom cursor ───────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.querySelectorAll('a, button, .service-card, .project-card, .pricing-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '56px';
      follower.style.height = '56px';
      follower.style.opacity = '0.25';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '32px';
      follower.style.height = '32px';
      follower.style.opacity = '0.5';
    });
  });
}

/* ── Header scroll ───────────────────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Burger / Mobile menu ────────────────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Reveal on scroll ────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Smooth scroll for anchor links ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Contact form ────────────────────────────────────────────────────── */
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();

  const btn = form.querySelector('.form__submit');
  const txt = form.querySelector('.form__submit-text');
  btn.disabled = true;
  txt.textContent = 'Envoi en cours…';

  // Simulate async send (replace with real fetch/formspree endpoint)
  setTimeout(() => {
    btn.disabled = false;
    txt.textContent = 'Envoyer ma demande';
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1200);
});

/* ── Parallax glow on hero ───────────────────────────────────────────── */
const glow1 = document.querySelector('.hero__glow--1');
const glow2 = document.querySelector('.hero__glow--2');

if (glow1 && glow2) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    glow1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    glow2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
  }, { passive: true });
}
