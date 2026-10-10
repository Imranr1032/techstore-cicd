// Global app logic - runs on every page
(function () {
  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,.4)';
      else navbar.style.boxShadow = 'none';
    });
  }

  // Toast notification
  window.showToast = function (msg, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show ' + type;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  // Product card renderer (shared across pages)
  window.renderProductCard = function (p) {
    const badgeClass = p.badge && p.badge.startsWith('-') ? 'product-badge discount' : 'product-badge';
    const oldPrice = p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del>` : '';
    return `
      <div class="product-card" data-id="${p.id}">
        <a href="product.html?id=${p.id}">
          <div class="product-img">
            ${p.badge ? `<span class="${badgeClass}">${p.badge}</span>` : ''}
            <span>${p.emoji}</span>
          </div>
        </a>
        <div class="product-info">
          <span class="product-cat">${p.category}</span>
          <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
          <div class="product-rating">
            <span class="stars">${renderStars(p.rating)}</span>
            <span>${p.rating} (${p.reviews})</span>
          </div>
          <div class="product-price-row">
            <div class="product-price">${formatPrice(p.price)}${oldPrice}</div>
            <button class="add-btn" data-add="${p.id}" aria-label="Add to cart">+</button>
          </div>
        </div>
      </div>
    `;
  };

  // Delegated add-to-cart click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    e.preventDefault();
    const id = parseInt(btn.dataset.add);
    const product = getProductById(id);
    if (!product) return;
    Cart.add(id, 1);
    window.showToast(`✓ ${product.name} added to cart`, 'success');
    // animate button
    btn.textContent = '✓';
    btn.style.background = 'linear-gradient(135deg, #10b981, #22d3ee)';
    setTimeout(() => { btn.textContent = '+'; btn.style.background = ''; }, 900);
  });

  // Newsletter form
  const nForm = document.getElementById('newsletterForm');
  if (nForm) {
    nForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('✓ Subscribed! Check your inbox for 10% off.', 'success');
      nForm.reset();
    });
  }

  // Contact form
  const cForm = document.getElementById('contactForm');
  if (cForm) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('✓ Message sent! We\'ll get back to you soon.', 'success');
      cForm.reset();
    });
  }
})();
