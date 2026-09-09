// ─── Sunil Store — Customer App ────────────────────────────────────────────

let lang = 'en';
let activeCat = 0;
let searchQ = '';
let allProducts = [];
let allCategories = [];
let storeSettings = {};

// ── i18n strings ─────────────────────────────────────────────────────────────
const T = {
  en: {
    trackOrder: "Track Your Order",
    trackPlaceholder: "Enter Order ID (e.g. FM-10025)",
    trackBtn: "Track",
    trackNotFound: "Order not found. Please check your Order ID.",
    trackLabel: "📦 Track Order",
    storeName: "Sunil Store",
    storeTagline: "Fresh Groceries Delivered",
    heroTitle: "Fresh & Organic Groceries 🌿",
    heroSub: "Order online, pick up or get delivered to your door.",
    shopNow: "Shop Now",
    allProducts: "All Products",
    cart: "Cart",
    cartTitle: "Your Cart",
    total: "Total",
    checkout: "Place Order",
    emptyCart: "Your cart is empty.",
    orderTitle: "📋 Place Your Order",
    lblName: "Full Name",
    lblPhone: "Phone Number",
    lblAddress: "Delivery Address",
    orderSummary: "Order Summary",
    orderTotal: "Total",
    submit: "Confirm Order",
    successTitle: "Order Placed! 🎉",
    successMsg: "Thank you! Call us to confirm your order.",
    orderIdLabel: "Your Order ID",
    callLabel: "📞 Call Store to Confirm",
    continueShopping: "Continue Shopping",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    lowStock: "Low Stock",
    detailTitle: "Product Details",
    addBtn: "Add to Cart",
    validName: "Please enter your name.",
    validPhone: "Please enter a valid phone number.",
    validAddress: "Please enter your delivery address.",
    validCart: "Your cart is empty!",
    added: "Added to cart!",
    updated: "Cart updated!",
    removed: "Removed from cart.",
    footerCopy: "© 2026 Sunil Store. All rights reserved.",
    allCat: "All",
    qty: "Qty",
    unit: "Unit",
    price: "Price",
  },
  si: {
    trackOrder: "ඔබේ ඇණවුම සොයන්න",
    trackPlaceholder: "ඇණවුම් අංකය ඇතුළු කරන්න (FM-10025)",
    trackBtn: "සොයන්න",
    trackNotFound: "ඇණවුම හමු නොවීය. ඇණවුම් අංකය පරීක්ෂා කරන්න.",
    trackLabel: "📦 ඇණවුම සොයන්න",
    storeName: "සුනිල් ස්ටෝර්",
    storeTagline: "නැවුම් සිල්ලර බඩු ගෙදරටම",
    heroTitle: "නැවුම් සහ ස්වාභාවික සිල්ලර 🌿",
    heroSub: "අන්ලයින් ඇණවුම් කරන්න, ගෙදරටම ලබා ගන්න.",
    shopNow: "දැන් ගන්න",
    allProducts: "සියලු නිෂ්පාදන",
    cart: "කූඩය",
    cartTitle: "ඔබේ කූඩය",
    total: "මුළු මුදල",
    checkout: "ඇණවුම් කරන්න",
    emptyCart: "ඔබේ කූඩය හිස්ය.",
    orderTitle: "📋 ඔබේ ඇණවුම",
    lblName: "සම්පූර්ණ නම",
    lblPhone: "දුරකථන අංකය",
    lblAddress: "බෙදාහැරීමේ ලිපිනය",
    orderSummary: "ඇණවුම් සාරාංශය",
    orderTotal: "මුළු මුදල",
    submit: "ඇණවුම තහවුරු කරන්න",
    successTitle: "ඇණවුම ලැබුණා! 🎉",
    successMsg: "ස්තූතියි! ඇණවුම තහවුරු කිරීමට අපට ඇමතුමක් දෙන්න.",
    orderIdLabel: "ඔබේ ඇණවුම් අංකය",
    callLabel: "📞 ගබඩාවට ඇමතුම් දෙන්න",
    continueShopping: "සාප්පු සවාරිය දිගටම",
    addToCart: "කූඩයට දමන්න",
    outOfStock: "නොමැත",
    inStock: "ඇත",
    lowStock: "අඩු ප්‍රමාණය",
    detailTitle: "නිෂ්පාදන විස්තර",
    addBtn: "කූඩයට දමන්න",
    validName: "කරුණාකර ඔබේ නම ඇතුළු කරන්න.",
    validPhone: "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළු කරන්න.",
    validAddress: "කරුණාකර ලිපිනය ඇතුළු කරන්න.",
    validCart: "ඔබේ කූඩය හිස්ය!",
    added: "කූඩයට එකතු කළා!",
    updated: "කූඩය යාවත්කාලීන කළා!",
    removed: "ඉවත් කළා.",
    footerCopy: "© 2025 සුනිල් ස්ටෝර්. සියලු හිමිකම් ඇවිරිණි.",
    allCat: "සියල්ල",
    qty: "ප්‍රමාණය",
    unit: "ඒකකය",
    price: "මිල",
  }
};

function t(key) { return T[lang][key] || T.en[key] || key; }

// ── Language ──────────────────────────────────────────────────────────────────
function setLang(l) {
  lang = l;
  const btnEn = document.getElementById('btnEn');
  const btnSi = document.getElementById('btnSi');
  if (btnEn) btnEn.classList.toggle('active', l === 'en');
  if (btnSi) btnSi.classList.toggle('active', l === 'si');
  applyLang();
  renderCategories();
  renderProducts();
  renderCart();
}

function applyLang() {
  const ids = {
    storeName: 'storeName', storeTagline: 'storeTagline', heroTitle: 'heroTitle',
    heroSub: 'heroSub', shopNow: 'shopNowBtn', allProducts: 'productsTitle',
    cart: 'cartLabel', cartTitle: 'cartTitle', total: 'totalLabel',
    checkout: 'checkoutLabel', orderTitle: 'orderModalTitle',
    lblName: 'lblName', lblPhone: 'lblPhone', lblAddress: 'lblAddress',
    orderSummary: 'orderSummaryTitle', orderTotal: 'orderTotalLabel',
    submit: 'submitLabel', successTitle: 'successTitle', successMsg: 'successMsg',
    orderIdLabel: 'orderIdLabel', callLabel: 'callLabel',
    continueShopping: 'continueShopping', detailTitle: 'detailTitle',
    footerCopy: 'footerCopy', trackOrder: 'trackOrderTitle',
    trackBtn: 'trackBtnLabel', trackLabel: 'trackNavLabel',
  };
  for (const [key, id] of Object.entries(ids)) {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  }
}

// ── Load Data from API ───────────────────────────────────────────────────────
async function loadData() {
  try {
    const [products, categories, settings] = await Promise.all([
      API.products.getAll(),
      API.categories.getAll(),
      API.settings.get()
    ]);
    
    allProducts = products;
    allCategories = categories;
    storeSettings = settings;
    
    renderStoreInfo();
    renderCategories();
    renderProducts();
    updateCartCount();
    applyLang();
  } catch (error) {
    console.error('Failed to load data:', error);
    showToast('Failed to load store data. Please refresh.', true);
  }
}

// ── Categories ────────────────────────────────────────────────────────────────
function renderCategories() {
  const nav = document.getElementById('catNav');
  if (!nav) return;
  
  nav.innerHTML = `<button class="cat-pill ${activeCat===0?'active':''}" onclick="filterCat(0)">
    🛒 ${t('allCat')}
  </button>` + allCategories.map(c => `
    <button class="cat-pill ${activeCat===c._id?'active':''}" onclick="filterCat('${c._id}')">
      ${c.icon} ${lang==='si'?c.nameSi:c.name}
    </button>`).join('');
}

function filterCat(id) {
  activeCat = id;
  renderCategories();
  renderProducts();
}

// ── Products ──────────────────────────────────────────────────────────────────
function getFilteredProducts() {
  let prods = allProducts;
  if (activeCat) prods = prods.filter(p => p.categoryId === activeCat);
  if (searchQ) prods = prods.filter(p =>
    p.name.toLowerCase().includes(searchQ) ||
    p.nameSi.includes(searchQ)
  );
  return prods;
}

function stockBadge(stock) {
  if (stock === 0) return `<span class="badge badge-red">${t('outOfStock')}</span>`;
  if (stock <= 5) return `<span class="badge badge-orange">${t('lowStock')}</span>`;
  return `<span class="badge badge-green">${t('inStock')}</span>`;
}

function productImg(p, cls = 'product-img', phCls = 'product-img-placeholder') {
  const cat = allCategories.find(c => c._id === p.categoryId);
  const icon = cat ? cat.icon : '🛒';
  if (p.image) return `<img src="${p.image}" alt="${p.name}" class="${cls}" loading="lazy" onerror="this.outerHTML='<div class=\\'${phCls}\\'>${icon}</div>'" />`;
  return `<div class="${phCls}">${icon}</div>`;
}

function renderProducts() {
  const prods = getFilteredProducts();
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('productCount');

  if (!grid) return;

  if (count) {
    count.textContent = `${prods.length} ${lang==='si'?'නිෂ්පාදන':'products'}`;
  }

  if (!prods.length) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    const emptyMsg = document.getElementById('emptyMsg');
    if (emptyMsg) emptyMsg.textContent = t('emptyCart').replace('cart', 'search results');
    return;
  }
  if (empty) empty.classList.add('hidden');

  grid.innerHTML = prods.map(p => `
    <div class="product-card ${p.stock===0?'out-of-stock':''} fade-in" onclick="openDetail('${p._id}')">
      <div class="stock-badge">${stockBadge(p.stock)}</div>
      ${productImg(p)}
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-name-si">${p.nameSi}</div>
        <div class="product-meta">
          <span class="product-price">Rs. ${p.price.toFixed(2)}</span>
          <span class="product-unit">${p.unit}</span>
        </div>
        <button class="add-btn" ${p.stock===0?'disabled':''} onclick="event.stopPropagation();addToCart('${p._id}')">
          ${p.stock===0 ? t('outOfStock') : '🛒 '+t('addToCart')}
        </button>
      </div>
    </div>`).join('');
}

// ── Store Info Bar ───────────────────────────────────────────────────────────────
function renderStoreInfo() {
  const s = storeSettings;
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = (s.openTime || '06:00').split(':').map(Number);
  const [ch, cm] = (s.closeTime || '21:00').split(':').map(Number);
  const openMins = oh * 60 + om;
  const closeMins = ch * 60 + cm;
  const isOpenDay = (s.openDays || [0, 1, 2, 3, 4, 5, 6]).includes(day);
  const isOpenTime = mins >= openMins && mins < closeMins;
  const isOpen = isOpenDay && isOpenTime;

  const fmt = t => { const [h, m] = t.split(':'); const hh = +h; return `${hh>12?hh-12:hh||12}:${m} ${hh>=12?'PM':'AM'}`; };

  const infoBar = document.getElementById('infoBar');
  if (infoBar) {
    infoBar.innerHTML = `
      <div class="info-pill">
        <div class="open-dot ${isOpen?'':'closed'}"></div>
        <span>${isOpen ? 'Open Now' : 'Closed'}</span>
      </div>
      <div class="info-pill">🕐 ${fmt(s.openTime||'06:00')} – ${fmt(s.closeTime||'21:00')}</div>
      ${s.address ? `<div class="info-pill"><a href="${s.mapUrl||'#'}" target="_blank">📍 ${s.address}</a></div>` : ''}
      <div class="info-pill"><a href="tel:${s.phone}">📞 ${s.phone}</a></div>`;
  }

  // Footer
  const fn = document.getElementById('footerStoreName');
  if (fn) fn.innerHTML = `🛒 ${s.name}`;
  const fp = document.getElementById('footerPhone');
  if (fp) fp.textContent = s.phone;
  const fh = document.getElementById('footerHours');
  if (fh) fh.textContent = `🕐 ${fmt(s.openTime||'06:00')} – ${fmt(s.closeTime||'21:00')}`;
  const fa = document.getElementById('footerAddress');
  if (fa) fa.textContent = s.address || '';
}

// ── Search ────────────────────────────────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    searchQ = e.target.value.trim().toLowerCase();
    renderProducts();
  });
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    searchQ = '';
    renderProducts();
  }
}

function scrollToProducts() {
  const section = document.getElementById('productsSection');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTrack() {
  const section = document.getElementById('trackSection');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const input = document.getElementById('trackInput');
    if (input) input.focus();
  }, 400);
}

// ── Product Detail ────────────────────────────────────────────────────────────
function openDetail(id) {
  const p = allProducts.find(x => x._id === id);
  if (!p) return;
  const cat = allCategories.find(c => c._id === p.categoryId);
  
  const title = document.getElementById('detailTitle');
  const body = document.getElementById('detailBody');
  
  if (title) title.textContent = lang === 'si' ? p.nameSi : p.name;
  
  if (body) {
    body.innerHTML = `
      ${productImg(p, 'detail-img', 'detail-img-ph')}
      <div class="detail-price">Rs. ${p.price.toFixed(2)}</div>
      <div class="detail-meta">
        ${stockBadge(p.stock)}
        <span class="badge badge-blue">${p.unit}</span>
        ${cat ? `<span class="badge badge-purple">${cat.icon} ${lang==='si'?cat.nameSi:cat.name}</span>` : ''}
      </div>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:1rem;">
        ${lang==='si'?p.nameSi:p.name} &nbsp;·&nbsp; ${t('price')}: <strong>Rs. ${p.price.toFixed(2)}</strong> / ${p.unit}
      </p>
      <div style="display:flex;align-items:center;gap:.8rem;margin-bottom:1rem;">
        <label style="margin:0;font-size:.85rem;">${t('qty')}:</label>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
          <input class="qty-input" type="number" id="detailQty" value="1" min="1" max="${p.stock}" />
          <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
        </div>
      </div>
      <button class="btn btn-primary w-full" ${p.stock===0?'disabled':''} onclick="addToCartQty('${p._id}')">
        🛒 ${t('addBtn')}
      </button>`;
  }
  openModal('detailModal');
}

function changeDetailQty(d) {
  const inp = document.getElementById('detailQty');
  if (inp) {
    inp.value = Math.max(1, parseInt(inp.value || 1) + d);
  }
}

function addToCartQty(id) {
  const inp = document.getElementById('detailQty');
  const qty = inp ? parseInt(inp.value) || 1 : 1;
  addToCart(id, qty);
  closeModal('detailModal');
}

// ── Cart ──────────────────────────────────────────────────────────────────────
function addToCart(id, qty = 1) {
  const cart = API.cart.get();
  const idx = cart.findIndex(i => i.id === id);
  const prod = allProducts.find(p => p._id === id);
  if (!prod || prod.stock === 0) return;
  if (idx >= 0) {
    cart[idx].qty = Math.min(cart[idx].qty + qty, prod.stock);
    showToast(t('updated'));
  } else {
    cart.push({ id, qty: Math.min(qty, prod.stock) });
    showToast(t('added'));
  }
  API.cart.save(cart);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cart = API.cart.get();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = total;
}

function renderCart() {
  const cart = API.cart.get();
  const el = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (!el) return;

  if (!cart.length) {
    el.innerHTML = `<div class="empty-state"><div class="icon">🛒</div><p>${t('emptyCart')}</p></div>`;
    if (totalEl) totalEl.textContent = 'Rs. 0.00';
    return;
  }

  let total = 0;
  el.innerHTML = cart.map(item => {
    const p = allProducts.find(x => x._id === item.id);
    if (!p) return '';
    const sub = p.price * item.qty;
    total += sub;
    const cat = allCategories.find(c => c._id === p.categoryId);
    const icon = cat ? cat.icon : '🛒';
    const imgHtml = p.image
      ? `<img src="${p.image}" class="cart-item-img" onerror="this.outerHTML='<div class=\\'cart-item-img-ph\\'>${icon}</div>'" />`
      : `<div class="cart-item-img-ph">${icon}</div>`;
    return `
      <div class="cart-item">
        ${imgHtml}
        <div class="cart-item-info">
          <div class="cart-item-name">${lang==='si'?p.nameSi:p.name}</div>
          <div class="cart-item-price">Rs. ${sub.toFixed(2)}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty('${p._id}',-1)">−</button>
            <input class="qty-input" type="number" value="${item.qty}" min="1" max="${p.stock}"
              onchange="setQty('${p._id}',this.value)" />
            <button class="qty-btn" onclick="changeQty('${p._id}',1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${p._id}')" title="Remove">🗑️</button>
      </div>`;
  }).join('');

  if (totalEl) totalEl.textContent = `Rs. ${total.toFixed(2)}`;
}

function changeQty(id, d) {
  const cart = API.cart.get();
  const prod = allProducts.find(p => p._id === id);
  const idx = cart.findIndex(i => i.id === id);
  if (idx < 0) return;
  const newQty = cart[idx].qty + d;
  if (newQty < 1) { removeFromCart(id); return; }
  cart[idx].qty = Math.min(newQty, prod ? prod.stock : 999);
  API.cart.save(cart);
  updateCartCount();
  renderCart();
}

function setQty(id, val) {
  const cart = API.cart.get();
  const prod = allProducts.find(p => p._id === id);
  const idx = cart.findIndex(i => i.id === id);
  if (idx < 0) return;
  const newQty = Math.max(1, parseInt(val) || 1);
  cart[idx].qty = Math.min(newQty, prod ? prod.stock : 999);
  API.cart.save(cart);
  updateCartCount();
  renderCart();
  showToast(t('updated'));
}

function removeFromCart(id) {
  const cart = API.cart.get().filter(i => i.id !== id);
  API.cart.save(cart);
  updateCartCount();
  renderCart();
  showToast(t('removed'));
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (!sidebar) return;
  
  const open = sidebar.classList.toggle('hidden');
  if (overlay) overlay.classList.toggle('hidden', open);
  if (!open) renderCart();
}

// ── Order ─────────────────────────────────────────────────────────────────────
function openOrderModal() {
  const cart = API.cart.get();
  if (!cart.length) { showToast(t('validCart'), true); return; }

  const form = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');
  
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  
  const nameEl = document.getElementById('custName');
  const phoneEl = document.getElementById('custPhone');
  const addressEl = document.getElementById('custAddress');
  
  if (nameEl) nameEl.value = '';
  if (phoneEl) phoneEl.value = '';
  if (addressEl) addressEl.value = '';

  let total = 0;
  const summaryEl = document.getElementById('orderSummaryItems');
  if (summaryEl) {
    summaryEl.innerHTML = cart.map(item => {
      const p = allProducts.find(x => x._id === item.id);
      if (!p) return '';
      const sub = p.price * item.qty;
      total += sub;
      return `<div style="display:flex;justify-content:space-between;padding:.2rem 0;">
        <span>${lang==='si'?p.nameSi:p.name} × ${item.qty}</span>
        <span>Rs. ${sub.toFixed(2)}</span>
      </div>`;
    }).join('');
  }
  
  const totalAmt = document.getElementById('orderTotalAmt');
  if (totalAmt) totalAmt.textContent = `Rs. ${total.toFixed(2)}`;

  openModal('orderModal');
}

async function submitOrder() {
  const name = document.getElementById('custName');
  const phone = document.getElementById('custPhone');
  const address = document.getElementById('custAddress');

  if (!name || !phone || !address) {
    showToast('Please fill all fields.', true);
    return;
  }

  const nameVal = name.value.trim();
  const phoneVal = phone.value.trim();
  const addressVal = address.value.trim();

  if (!nameVal) { showToast(t('validName'), true); return; }
  if (!/^0\d{9}$/.test(phoneVal.replace(/\s/g, ''))) { showToast(t('validPhone'), true); return; }
  if (!addressVal) { showToast(t('validAddress'), true); return; }

  const cart = API.cart.get();
  const items = cart.map(i => ({ id: i.id, qty: i.qty }));

  try {
    const order = await API.orders.create({
      customer: { name: nameVal, phone: phoneVal, address: addressVal },
      items
    });

    API.cart.clear();
    updateCartCount();
    renderProducts();

    // Show success
    const form = document.getElementById('orderForm');
    const success = document.getElementById('orderSuccess');
    if (form) form.classList.add('hidden');
    if (success) success.classList.remove('hidden');
    
    const orderIdEl = document.getElementById('displayOrderId');
    if (orderIdEl) orderIdEl.textContent = order.id;
    
    const callBtn = document.getElementById('callStoreBtn');
    if (callBtn) callBtn.href = `tel:${storeSettings.phone}`;
    
    const successTitle = document.getElementById('successTitle');
    if (successTitle) successTitle.textContent = t('successTitle');
    
    const successMsg = document.getElementById('successMsg');
    if (successMsg) successMsg.textContent = t('successMsg');
    
    const orderIdLabel = document.getElementById('orderIdLabel');
    if (orderIdLabel) orderIdLabel.textContent = t('orderIdLabel');
    
    const callLabel = document.getElementById('callLabel');
    if (callLabel) callLabel.textContent = t('callLabel');
    
    const trackInput = document.getElementById('trackInput');
    if (trackInput) trackInput.value = order.id;

    // Refresh products from API
    allProducts = await API.products.getAll();
    renderProducts();
    renderCart();
  } catch (error) {
    showToast(error.message || 'Order failed. Please try again.', true);
  }
}

// ── Order Tracking ───────────────────────────────────────────────────────────
const TRACK_STEPS = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];
const TRACK_ICONS = { Pending: '⏳', Confirmed: '✅', Preparing: '👨‍🍳', Ready: '📦', Completed: '🎉', Cancelled: '❌' };

async function trackOrder() {
  const input = document.getElementById('trackInput');
  const result = document.getElementById('trackResult');
  
  if (!input || !result) return;
  
  const raw = input.value.trim().toUpperCase();
  if (!raw) return;

  try {
    const order = await API.orders.track(raw);
    const isCancelled = order.status === 'Cancelled';
    const activeIdx = isCancelled ? -1 : TRACK_STEPS.indexOf(order.status);

    const steps = isCancelled
      ? `<div class="track-cancelled">❌ Order Cancelled</div>`
      : TRACK_STEPS.map((s, i) => `
          <div class="track-step ${i <= activeIdx ? 'done' : ''} ${i === activeIdx ? 'current' : ''}">
            <div class="track-dot">${i <= activeIdx ? TRACK_ICONS[s] : ''}</div>
            <div class="track-line ${i < TRACK_STEPS.length - 1 ? '' : 'last'} ${i < activeIdx ? 'filled' : ''}"></div>
            <div class="track-lbl">${s}</div>
          </div>`).join('');

    result.innerHTML = `
      <div class="track-card">
        <div class="track-card-top">
          <div>
            <div class="track-id">${order.id}</div>
            <div class="track-name">${order.customer.name}</div>
          </div>
          <div class="track-total">Rs. ${order.total.toFixed(2)}</div>
        </div>
        <div class="track-steps">${steps}</div>
        <div class="track-items">${order.items.map(i =>
          `<span>${lang==='si'?i.nameSi:i.name} ×${i.qty}</span>`).join('')}
        </div>
      </div>`;
  } catch (error) {
    result.innerHTML = `<p class="track-not-found">${t('trackNotFound')}</p>`;
  }
}

// ── Modals ────────────────────────────────────────────────────────────────────
function openModal(id) { 
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) { 
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.classList.add('hidden'); });
});

// ── Toast ─────────────────────────────────────────────────────────────────────
let toastTimer;

function showToast(msg, error = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  
  el.textContent = msg;
  el.className = 'show' + (error ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.className = '', 2800);
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  await loadData();
  
  // Secret admin access (5 rapid taps on logo)
  let tapCount = 0, tapTimer;
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      tapCount++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { tapCount = 0; }, 1500);
      if (tapCount >= 5) {
        tapCount = 0;
        window.location.href = 'admin.html';
      }
    });
  }
}

// Start the app
init();