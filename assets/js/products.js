// Product catalog - simulate a real backend dataset
const PRODUCTS = [
  { id: 1, name: "MacBook Pro 16\" M3 Max", category: "laptops", price: 3499, oldPrice: 3799, rating: 4.9, reviews: 284, emoji: "💻", badge: "New", stock: 12, description: "Supercharged by M3 Max with 16-core CPU and 40-core GPU. The most powerful MacBook Pro ever built for demanding workflows.", features: ["M3 Max chip with 16-core CPU", "48GB unified memory", "1TB SSD storage", "Liquid Retina XDR display", "Up to 22 hours battery"] },
  { id: 2, name: "iPhone 15 Pro Max", category: "phones", price: 1199, oldPrice: 1299, rating: 4.8, reviews: 512, emoji: "📱", badge: "-8%", stock: 34, description: "Forged in titanium with the A17 Pro chip. The most advanced iPhone camera system ever.", features: ["A17 Pro chip", "48MP Main camera", "Titanium design", "USB-C with USB 3", "Action button"] },
  { id: 3, name: "AirPods Max", category: "audio", price: 549, oldPrice: 599, rating: 4.7, reviews: 389, emoji: "🎧", badge: "Hot", stock: 22, description: "Computational audio. Adaptive EQ. Active Noise Cancellation. A symphony of sound.", features: ["Active Noise Cancellation", "Spatial Audio", "20-hour battery", "Premium materials", "Memory foam cushions"] },
  { id: 4, name: "Apple Watch Ultra 2", category: "wearables", price: 799, rating: 4.8, reviews: 201, emoji: "⌚", badge: "New", stock: 18, description: "The ultimate sports watch. Built for endurance, exploration, and adventure.", features: ["49mm titanium case", "3000 nits display", "Precision GPS", "100m water resistance", "36-hour battery"] },
  { id: 5, name: "Sony WH-1000XM5", category: "audio", price: 399, oldPrice: 449, rating: 4.9, reviews: 876, emoji: "🎧", badge: "-11%", stock: 45, description: "Industry-leading noise cancellation with two processors and eight microphones.", features: ["Auto NC Optimizer", "30-hour battery", "Crystal clear calls", "Multipoint connection", "Quick charge"] },
  { id: 6, name: "PlayStation 5 Slim", category: "gaming", price: 499, rating: 4.8, reviews: 1234, emoji: "🎮", badge: "Hot", stock: 8, description: "Experience lightning-fast loading with an ultra-high-speed SSD and deeper immersion.", features: ["4K gaming at 120Hz", "1TB SSD", "Ray tracing", "Tempest 3D Audio", "Backward compatible"] },
  { id: 7, name: "Dell XPS 15", category: "laptops", price: 1899, oldPrice: 2099, rating: 4.6, reviews: 342, emoji: "💻", badge: "-10%", stock: 15, description: "Stunning 15-inch display with Intel Core i9 and NVIDIA RTX graphics.", features: ["Intel Core i9-13900H", "NVIDIA RTX 4070", "32GB DDR5 RAM", "1TB NVMe SSD", "OLED display"] },
  { id: 8, name: "Samsung Galaxy S24 Ultra", category: "phones", price: 1299, rating: 4.7, reviews: 621, emoji: "📱", badge: "New", stock: 27, description: "The ultimate Galaxy experience with S Pen, 200MP camera, and Galaxy AI.", features: ["Snapdragon 8 Gen 3", "200MP camera", "Built-in S Pen", "5000mAh battery", "Titanium frame"] },
  { id: 9, name: "iPad Pro 12.9\" M2", category: "laptops", price: 1099, oldPrice: 1199, rating: 4.8, reviews: 456, emoji: "📱", badge: "-8%", stock: 20, description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.", features: ["M2 chip", "Liquid Retina XDR", "Thunderbolt port", "Face ID", "All-day battery"] },
  { id: 10, name: "Logitech MX Master 3S", category: "accessories", price: 99, oldPrice: 119, rating: 4.9, reviews: 1523, emoji: "🖱️", badge: "-17%", stock: 120, description: "The most advanced master series mouse with quiet clicks and 8K DPI.", features: ["8K DPI tracking", "Quiet clicks", "Multi-device", "USB-C charging", "70-day battery"] },
  { id: 11, name: "Nintendo Switch OLED", category: "gaming", price: 349, rating: 4.8, reviews: 892, emoji: "🎮", badge: "Hot", stock: 41, description: "Play at home on the TV or on the go with a vibrant 7-inch OLED screen.", features: ["7-inch OLED screen", "64GB storage", "Wide adjustable stand", "Dock with LAN port", "Enhanced audio"] },
  { id: 12, name: "Keychron K2 Pro", category: "accessories", price: 129, rating: 4.7, reviews: 267, emoji: "⌨️", badge: "New", stock: 55, description: "Wireless mechanical keyboard with QMK/VIA support and hot-swappable switches.", features: ["QMK/VIA support", "Hot-swappable", "Bluetooth 5.1", "RGB backlight", "Aluminum frame"] },
  { id: 13, name: "Samsung 49\" Odyssey G9", category: "gaming", price: 1299, oldPrice: 1499, rating: 4.6, reviews: 189, emoji: "🖥️", badge: "-13%", stock: 7, description: "Massive 49-inch curved gaming monitor with 240Hz refresh rate.", features: ["49\" DQHD", "240Hz refresh", "1ms response", "1000R curvature", "QLED technology"] },
  { id: 14, name: "Google Pixel 8 Pro", category: "phones", price: 999, oldPrice: 1099, rating: 4.7, reviews: 378, emoji: "📱", badge: "-9%", stock: 23, description: "The best of Google AI, powered by Tensor G3 chip with 7 years of updates.", features: ["Tensor G3 chip", "50MP triple camera", "7 years updates", "Magic Editor", "Temperature sensor"] },
  { id: 15, name: "Bose QuietComfort Ultra", category: "audio", price: 429, rating: 4.8, reviews: 445, emoji: "🎧", badge: "Hot", stock: 33, description: "World-class noise cancellation with immersive spatial audio.", features: ["Immersive Audio", "CustomTune tech", "24-hour battery", "Aware Mode", "Premium comfort"] },
  { id: 16, name: "Anker 737 Power Bank", category: "accessories", price: 149, oldPrice: 179, rating: 4.9, reviews: 2103, emoji: "🔋", badge: "-17%", stock: 200, description: "24,000mAh power bank with 140W output. Charge laptops and phones fast.", features: ["24,000mAh capacity", "140W max output", "Smart display", "3 ports", "TSA approved"] }
];

// Utility functions
function formatPrice(p) {
  return '$' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '⯨';
  while (s.length < 5) s += '☆';
  return s;
}
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}
