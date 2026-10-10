// Shopping Cart - localStorage backed
const Cart = {
  KEY: 'techstore_cart',

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateCount();
    window.dispatchEvent(new CustomEvent('cart:updated'));
  },

  add(productId, qty = 1) {
    const items = this.get();
    const existing = items.find(i => i.id === productId);
    if (existing) existing.qty += qty;
    else items.push({ id: productId, qty });
    this.save(items);
    return true;
  },

  remove(productId) {
    const items = this.get().filter(i => i.id !== productId);
    this.save(items);
  },

  setQty(productId, qty) {
    const items = this.get();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) return this.remove(productId);
    item.qty = qty;
    this.save(items);
  },

  clear() {
    this.save([]);
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  total() {
    return this.get().reduce((sum, i) => {
      const p = getProductById(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },

  updateCount() {
    document.querySelectorAll('#cartCount').forEach(el => {
      el.textContent = this.count();
    });
  }
};

// Initialize count on page load
document.addEventListener('DOMContentLoaded', () => Cart.updateCount());
