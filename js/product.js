/* =============================================
   Auré — Product Page JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initOptions();
  initQty();
  initAccordion();
  initAddToCart();
});

// ─── GALLERY ─────────────────────────────────
function initGallery() {
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbs = document.querySelectorAll('.thumb');

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('thumb--active'));
    slides[index]?.classList.add('active');
    thumbs[index]?.classList.add('thumb--active');
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => goTo(+thumb.dataset.index));
  });

  document.querySelector('.gallery-arrow--prev')?.addEventListener('click', () => {
    const current = [...slides].findIndex(s => s.classList.contains('active'));
    goTo((current - 1 + slides.length) % slides.length);
  });
  document.querySelector('.gallery-arrow--next')?.addEventListener('click', () => {
    const current = [...slides].findIndex(s => s.classList.contains('active'));
    goTo((current + 1) % slides.length);
  });
}

// ─── MATERIAL & SIZE OPTIONS ──────────────────
function initOptions() {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.closest('.option-pills').querySelectorAll('.pill').forEach(p => p.classList.remove('pill--active'));
      pill.classList.add('pill--active');
      const matLabel = document.getElementById('selected-material');
      if (matLabel) matLabel.textContent = pill.dataset.value;
      const price = pill.dataset.price;
      if (price) {
        const priceEl = document.querySelector('.price-main');
        if (priceEl) priceEl.textContent = `${price} €`;
      }
    });
  });

  document.querySelectorAll('.size-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('size-pill--unavailable')) return;
      pill.closest('.option-pills').querySelectorAll('.size-pill').forEach(p => p.classList.remove('size-pill--active'));
      pill.classList.add('size-pill--active');
      const lenLabel = document.getElementById('selected-length');
      if (lenLabel) lenLabel.textContent = pill.dataset.size;
    });
  });
}

// ─── QUANTITY ────────────────────────────────
function initQty() {
  let qty = 1;
  const display = document.getElementById('qty-display');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; display.textContent = qty; }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    qty++;
    display.textContent = qty;
  });
}

// ─── ACCORDION ───────────────────────────────
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('accordion-item--open');

      if (isOpen) {
        item.classList.remove('accordion-item--open');
        body.style.display = 'none';
        trigger.setAttribute('aria-expanded', 'false');
        trigger.querySelector('.accordion-icon').innerHTML = '<path d="m6 9 6 6 6-6"/>';
      } else {
        item.classList.add('accordion-item--open');
        body.style.display = 'block';
        trigger.setAttribute('aria-expanded', 'true');
        trigger.querySelector('.accordion-icon').innerHTML = '<path d="m18 15-6-6-6 6"/>';
      }
    });
  });
}

// ─── ADD TO CART ─────────────────────────────
function initAddToCart() {
  const btn = document.getElementById('add-to-cart-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const material = document.getElementById('selected-material')?.textContent || 'Or Vermeil 18k';
    const length = document.getElementById('selected-length')?.textContent || '40 cm';
    const price = parseFloat(document.querySelector('.price-main')?.textContent) || 189;
    const qty = parseInt(document.getElementById('qty-display')?.textContent) || 1;

    const product = {
      id: `col-001-${material}-${length}`.replace(/\s/g, '-').toLowerCase(),
      name: 'Collier Lumière',
      category: 'Colliers',
      material: `${material} · ${length}`,
      price,
      svg: `<svg viewBox="0 0 100 120" fill="none" stroke="#c9a96e" stroke-width="1"><ellipse cx="50" cy="30" rx="28" ry="20"/><path d="M22 30 Q10 70 50 95 Q90 70 78 30" stroke-linecap="round"/><circle cx="50" cy="95" r="5" fill="#c9a96e" opacity="0.5"/></svg>`
    };

    for (let i = 0; i < qty; i++) cart.add(product);

    btn.classList.add('btn--gold');
    btn.querySelector('span').textContent = '✓ Ajouté !';
    setTimeout(() => {
      btn.classList.remove('btn--gold');
      btn.querySelector('span').textContent = 'Ajouter au panier';
    }, 2000);
  });
}
