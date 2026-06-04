/* =============================================
   ORET — Main JavaScript
   ============================================= */

// ─── SVG PRODUCT ILLUSTRATIONS ───────────────
function svgProduct(type) {
  const paths = {
    necklace: `<svg viewBox="0 0 100 120" fill="none" stroke="#c9a96e" stroke-width="1">
      <ellipse cx="50" cy="30" rx="28" ry="20"/>
      <path d="M22 30 Q10 70 50 95 Q90 70 78 30" stroke-linecap="round"/>
      <circle cx="50" cy="95" r="5" fill="#c9a96e" opacity="0.5"/>
    </svg>`,
    necklace2: `<svg viewBox="0 0 100 120" fill="none" stroke="#c9a96e" stroke-width="1">
      <path d="M20 25 Q50 15 80 25 Q90 60 70 90 Q50 105 30 90 Q10 60 20 25"/>
      <path d="M40 88 L50 100 L60 88" stroke-width="0.8"/>
    </svg>`,
    ring: `<svg viewBox="0 0 100 100" fill="none" stroke="#c9a96e" stroke-width="1">
      <ellipse cx="50" cy="55" rx="32" ry="18"/>
      <ellipse cx="50" cy="45" rx="32" ry="18"/>
      <line x1="18" y1="45" x2="18" y2="55"/>
      <line x1="82" y1="45" x2="82" y2="55"/>
      <path d="M35 38 L50 18 L65 38" stroke-width="0.8"/>
      <circle cx="50" cy="16" r="4" fill="#c9a96e" opacity="0.4"/>
    </svg>`,
    ring2: `<svg viewBox="0 0 100 100" fill="none" stroke="#c9a96e" stroke-width="1">
      <ellipse cx="50" cy="55" rx="30" ry="16"/>
      <ellipse cx="50" cy="45" rx="30" ry="16"/>
      <line x1="20" y1="45" x2="20" y2="55"/>
      <line x1="80" y1="45" x2="80" y2="55"/>
      <ellipse cx="50" cy="43" rx="12" ry="8" stroke-width="0.7"/>
    </svg>`,
    bracelet: `<svg viewBox="0 0 100 100" fill="none" stroke="#c9a96e" stroke-width="1">
      <ellipse cx="50" cy="50" rx="38" ry="20"/>
      <path d="M12 50 Q15 68 50 70 Q85 68 88 50" stroke-dasharray="4 2"/>
    </svg>`,
    bracelet2: `<svg viewBox="0 0 100 100" fill="none" stroke="#c9a96e" stroke-width="1">
      <ellipse cx="50" cy="50" rx="38" ry="20"/>
      <path d="M12 50 Q15 68 50 70 Q85 68 88 50"/>
      <circle cx="26" cy="56" r="3" fill="#c9a96e" opacity="0.3"/>
      <circle cx="50" cy="70" r="3" fill="#c9a96e" opacity="0.3"/>
      <circle cx="74" cy="56" r="3" fill="#c9a96e" opacity="0.3"/>
    </svg>`
  };
  return paths[type] || paths.ring;
}

// ─── CART STATE ──────────────────────────────
const cart = {
  items: JSON.parse(localStorage.getItem('oret_cart') || '[]'),

  save() { localStorage.setItem('oret_cart', JSON.stringify(this.items)); },

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    this.render();
    updateCartCount();
    showToast('Ajouté au panier');
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.render();
    updateCartCount();
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(id);
    else { this.save(); this.render(); }
    updateCartCount();
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  render() {
    const body = document.querySelector('.cart-drawer__body');
    const subtotalEl = document.querySelector('.cart-subtotal-amount');
    if (!body) return;

    if (this.items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          ${svgIcons.bagEmpty}
          <p>Votre panier est vide</p>
          <small>Découvrez notre collection</small>
          <a href="shop.html" class="btn btn--outline" style="margin-top:1rem">
            <span>Voir la boutique</span>
          </a>
        </div>`;
    } else {
      body.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item__image">${item.svg}</div>
          <div class="cart-item__details">
            <div class="cart-item__category">${item.category}</div>
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__material">${item.material}</div>
            <div class="cart-item__controls">
              <div class="qty-control">
                <button onclick="cart.updateQty('${item.id}', -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="cart.updateQty('${item.id}', 1)">+</button>
              </div>
              <div class="cart-item__price">${formatPrice(item.price * item.qty)}</div>
            </div>
            <button class="cart-item__remove" onclick="cart.remove('${item.id}')">Supprimer</button>
          </div>
        </div>`).join('');
    }

    if (subtotalEl) subtotalEl.textContent = formatPrice(this.total());
  }
};

// ─── PRODUCTS DATA ───────────────────────────
const products = [
  {
    id: 'col-001',
    name: 'Collier Lumière',
    category: 'Colliers',
    material: 'Or vermeil 18k',
    price: 189,
    badge: 'Nouveau',
    badgeType: 'new',
    svg: svgProduct('necklace')
  },
  {
    id: 'col-002',
    name: 'Collier Arc',
    category: 'Colliers',
    material: 'Argent sterling',
    price: 145,
    badge: null,
    svg: svgProduct('necklace2')
  },
  {
    id: 'bag-001',
    name: 'Bague Soleil',
    category: 'Bagues',
    material: 'Or jaune 14k',
    price: 320,
    badge: 'Bestseller',
    badgeType: 'new',
    svg: svgProduct('ring')
  },
  {
    id: 'bag-002',
    name: 'Bague Dune',
    category: 'Bagues',
    material: 'Or rose 14k',
    price: 290,
    badge: null,
    svg: svgProduct('ring2')
  },
  {
    id: 'bra-001',
    name: 'Bracelet Fil',
    category: 'Bracelets',
    material: 'Or vermeil 18k',
    price: 165,
    badge: null,
    svg: svgProduct('bracelet')
  },
  {
    id: 'bra-002',
    name: 'Bracelet Chaîne',
    category: 'Bracelets',
    material: 'Argent sterling',
    price: 128,
    badge: '-15%',
    badgeType: 'sale',
    originalPrice: 150,
    svg: svgProduct('bracelet2')
  },
  {
    id: 'col-003',
    name: 'Collier Étoile',
    category: 'Colliers',
    material: 'Or blanc 18k',
    price: 245,
    badge: null,
    svg: svgProduct('necklace')
  },
  {
    id: 'bag-003',
    name: 'Bague Onde',
    category: 'Bagues',
    material: 'Argent sterling oxydé',
    price: 195,
    badge: 'Nouveau',
    badgeType: 'new',
    svg: svgProduct('ring')
  }
];

// ─── SVG ICONS & UTILS ───────────────────────
const svgIcons = {
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`,
  bagEmpty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>`
};

// ─── UTILS ───────────────────────────────────
function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const count = cart.count();
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── HEADER ──────────────────────────────────
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ─── CART DRAWER ─────────────────────────────
function initCart() {
  const overlay = document.querySelector('.cart-overlay');
  const drawer = document.querySelector('.cart-drawer');
  const openBtns = document.querySelectorAll('[data-cart-open]');
  const closeBtn = document.querySelector('.cart-drawer__close');

  function openCart() {
    overlay?.classList.add('open');
    drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
    cart.render();
  }
  function closeCart() {
    overlay?.classList.remove('open');
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openCart));
  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
}

// ─── PRODUCT CARDS ───────────────────────────
function renderProducts(container, items) {
  if (!container) return;
  container.innerHTML = items.map(p => `
    <div class="product-card fade-up" data-category="${p.category}">
      <div class="product-card__image-wrap">
        <div class="product-card__image">${p.svg}</div>
        ${p.badge ? `<span class="product-card__badge product-card__badge--${p.badgeType || ''}">${p.badge}</span>` : ''}
        <div class="product-card__actions">
          <button class="product-card__add" onclick="cart.add(${JSON.stringify(p).replace(/"/g, '&quot;')})">
            Ajouter au panier
          </button>
          <button class="product-card__wishlist">${svgIcons.heart}</button>
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__category">${p.category}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__material">${p.material}</div>
        <div class="product-card__price">
          ${p.originalPrice ? `<span class="original">${formatPrice(p.originalPrice)}</span>` : ''}
          ${formatPrice(p.price)}
        </div>
      </div>
    </div>`).join('');
}

// ─── SHOP FILTERS ────────────────────────────
function initShopFilters() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  renderProducts(grid, products);

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      const filtered = cat === 'all' ? products : products.filter(p => p.category.toLowerCase() === cat.toLowerCase());
      renderProducts(grid, filtered);
    });
  });

  const sortSelect = document.querySelector('.sort-select');
  sortSelect?.addEventListener('change', () => {
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    let filtered = activeFilter === 'all' ? [...products] : products.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());
    if (sortSelect.value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortSelect.value === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    renderProducts(grid, filtered);
  });
}

// ─── FEATURED PRODUCTS (homepage) ────────────
function initFeatured() {
  const grid = document.querySelector('.featured-grid');
  if (!grid) return;
  renderProducts(grid, products.slice(0, 4));
}

// ─── NEWSLETTER ──────────────────────────────
function initNewsletter() {
  document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) {
      showToast('Merci ! Vous êtes inscrit(e)');
      input.value = '';
    }
  });
}

// ─── SCROLL ANIMATIONS ───────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// ─── ACTIVE NAV LINK ─────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// ─── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCart();
  initFeatured();
  initShopFilters();
  initNewsletter();
  updateCartCount();
  setActiveNav();
  setTimeout(initScrollAnimations, 100);
});
