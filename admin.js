// ─── Sunil Store — Admin Panel ─────────────────────────────────────────────

const STATUS_FLOW = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'];
const STATUS_BADGE = {
  Pending: 'badge-orange', Confirmed: 'badge-blue',
  Preparing: 'badge-purple', Ready: 'badge-blue',
  Completed: 'badge-green', Cancelled: 'badge-red',
};

let allProducts = [];
let allCategories = [];
let allOrders = [];
let currentTab = 'dashboard';
let orderStatusFilter = 'All';
let loginAttempts = 0;
let lockUntil = 0;

// ── Auth ──────────────────────────────────────────────────────────────────────
async function doLogin() {
  const now = Date.now();
  const errEl = document.getElementById('loginError');
  if (now < lockUntil) {
    const secs = Math.ceil((lockUntil - now) / 1000);
    errEl.textContent = `Too many attempts. Try again in ${secs}s.`;
    errEl.classList.remove('hidden');
    return;
  }
  const pass = document.getElementById('loginPass').value;
  
  try {
    const result = await API.admin.login(pass);
    loginAttempts = 0;
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.remove('hidden');
    await loadAdminData();
    initAdmin();
  } catch (error) {
    loginAttempts++;
    if (loginAttempts >= 5) {
      lockUntil = Date.now() + 30000;
      loginAttempts = 0;
      errEl.textContent = 'Too many attempts. Locked for 30s.';
    } else {
      errEl.textContent = 'Incorrect password.';
    }
    errEl.classList.remove('hidden');
  }
}

function doLogout() {
  API.admin.logout();
  location.reload();
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}

function closeSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

// ── Load Data ─────────────────────────────────────────────────────────────────
async function loadAdminData() {
  try {
    const [products, categories, orders] = await Promise.all([
      API.products.getAll(),
      API.categories.getAll(),
      API.orders.getAll()
    ]);
    allProducts = products;
    allCategories = categories;
    allOrders = orders;
  } catch (error) {
    console.error('Failed to load admin data:', error);
    showToast('Failed to load data', true);
  }
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TAB_TITLES = { dashboard: 'Dashboard', products: 'Products', categories: 'Categories', orders: 'Orders', settings: 'Settings' };

function showTab(tab) {
  const prevTab = document.getElementById(`tab-${currentTab}`);
  const prevNav = document.getElementById(`nav-${currentTab}`);
  const newTab = document.getElementById(`tab-${tab}`);
  const newNav = document.getElementById(`nav-${tab}`);
  const titleEl = document.getElementById('tabTitle');
  
  if (prevTab) prevTab.classList.add('hidden');
  if (prevNav) prevNav.classList.remove('active');
  
  currentTab = tab;
  
  if (newTab) newTab.classList.remove('hidden');
  if (newNav) newNav.classList.add('active');
  if (titleEl) titleEl.textContent = TAB_TITLES[tab];
  
  closeSidebar();
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'products') renderProductsTable();
  if (tab === 'categories') renderCatsTable();
  if (tab === 'orders') renderOrdersTable();
  if (tab === 'settings') renderSettings();
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
async function renderDashboard() {
  try {
    const stats = await API.orders.getStats();
    const statsGrid = document.getElementById('statsGrid');
    
    if (statsGrid) {
      statsGrid.innerHTML = [
        { icon: '📦', val: allProducts.length, lbl: 'Total Products' },
        { icon: '📂', val: allCategories.length, lbl: 'Categories' },
        { icon: '📋', val: stats.total, lbl: 'Total Orders' },
        { icon: '⏳', val: stats.pending, lbl: 'Pending Orders' },
        { icon: '💰', val: `Rs.${stats.revenue.toFixed(0)}`, lbl: 'Revenue (Completed)' },
      ].map(s => `
        <div class="stat-card">
          <div class="stat-icon">${s.icon}</div>
          <div><div class="stat-val">${s.val}</div><div class="stat-lbl">${s.lbl}</div></div>
        </div>`).join('');
    }

    const recentBody = document.getElementById('recentOrdersBody');
    if (recentBody) {
      const recent = allOrders.slice(0, 10);
      recentBody.innerHTML = recent.length
        ? recent.map(o => `<tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.customer.name}</td>
            <td>Rs. ${o.total.toFixed(2)}</td>
            <td><span class="badge ${STATUS_BADGE[o.status] || 'badge-grey'}">${o.status}</span></td>
            <td>${fmtDate(o.createdAt)}</td>
          </tr>`).join('')
        : '<tr><td colspan="5" class="text-center" style="color:var(--muted);padding:2rem;">No orders yet.</td></tr>';
    }
  } catch (error) {
    console.error('Dashboard error:', error);
  }
}

// ── Products ──────────────────────────────────────────────────────────────────
function renderProductsTable() {
  const body = document.getElementById('productsTableBody');
  if (!body) return;
  
  body.innerHTML = allProducts.length
    ? allProducts.map(p => {
        const cat = allCategories.find(c => c._id === p.categoryId);
        const imgHtml = p.image
          ? `<img src="${p.image}" style="width:44px;height:44px;border-radius:8px;object-fit:cover;" onerror="this.style.display='none'" />`
          : `<span style="font-size:1.6rem;">${cat?.icon || '🛒'}</span>`;
        return `<tr>
          <td>${imgHtml}</td>
          <td><strong>${p.name}</strong><br/><small style="color:var(--muted)">${p.nameSi}</small></td>
          <td>${cat ? cat.icon + ' ' + cat.name : '—'}</td>
          <td>Rs. ${p.price.toFixed(2)}</td>
          <td>${p.unit}</td>
          <td>
            <input type="number" value="${p.stock}" min="0" style="width:70px;padding:.3rem .5rem;"
              onchange="updateStock('${p._id}',this.value)" />
          </td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="openProductModal('${p._id}')">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete('product','${p._id}')">🗑️</button>
          </td>
        </tr>`;
      }).join('')
    : '<tr><td colspan="7" class="text-center" style="color:var(--muted);padding:2rem;">No products.</td></tr>';
}

async function openProductModal(id = null) {
  const catSelect = document.getElementById('pCategory');
  if (catSelect) {
    catSelect.innerHTML = allCategories.map(c =>
      `<option value="${c._id}">${c.icon} ${c.name}</option>`).join('');
  }

  if (id) {
    const p = allProducts.find(x => x._id === id);
    if (!p) return;
    
    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('pId').value = p._id;
    document.getElementById('pName').value = p.name;
    document.getElementById('pNameSi').value = p.nameSi;
    if (catSelect) catSelect.value = p.categoryId;
    document.getElementById('pUnit').value = p.unit;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pStock').value = p.stock;
    document.getElementById('pImage').value = p.image || '';
    previewImg();
  } else {
    document.getElementById('productModalTitle').textContent = 'Add Product';
    ['pId', 'pName', 'pNameSi', 'pUnit', 'pPrice', 'pStock', 'pImage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const imgPreview = document.getElementById('imgPreview');
    if (imgPreview) imgPreview.style.display = 'none';
  }
  openModal('productModal');
}

function previewImg() {
  const url = document.getElementById('pImage').value.trim();
  const img = document.getElementById('imgPreview');
  if (url && img) { img.src = url;
    img.style.display = 'block'; } else if (img) { img.style.display = 'none'; }
}

async function saveProduct() {
  const name = document.getElementById('pName').value.trim();
  const nameSi = document.getElementById('pNameSi').value.trim();
  const categoryId = document.getElementById('pCategory').value;
  const unit = document.getElementById('pUnit').value.trim();
  const price = parseFloat(document.getElementById('pPrice').value);
  const stock = parseInt(document.getElementById('pStock').value);
  const image = document.getElementById('pImage').value.trim();
  const idVal = document.getElementById('pId').value;

  if (!name || !unit || isNaN(price) || isNaN(stock)) {
    showToast('Please fill all required fields.', true);
    return;
  }

  try {
    if (idVal) {
      await API.products.update(idVal, { name, nameSi, categoryId, unit, price, stock, image });
      showToast('Product updated!');
    } else {
      await API.products.create({ name, nameSi, categoryId, unit, price, stock, image });
      showToast('Product added!');
    }
    closeModal('productModal');
    allProducts = await API.products.getAll();
    renderProductsTable();
  } catch (error) {
    showToast(error.message, true);
  }
}

async function updateStock(id, val) {
  try {
    await API.products.updateStock(id, parseInt(val) || 0);
    showToast('Stock updated!');
    allProducts = await API.products.getAll();
    renderProductsTable();
  } catch (error) {
    showToast(error.message, true);
  }
}

// ── Categories ────────────────────────────────────────────────────────────────
function renderCatsTable() {
  const body = document.getElementById('catsTableBody');
  if (!body) return;
  
  body.innerHTML = allCategories.length
    ? allCategories.map(c => {
        const count = allProducts.filter(p => p.categoryId === c._id).length;
        return `<tr>
          <td style="font-size:1.6rem;">${c.icon}</td>
          <td><strong>${c.name}</strong></td>
          <td>${c.nameSi}</td>
          <td><span class="badge badge-green">${count}</span></td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="openCatModal('${c._id}')">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete('category','${c._id}')">🗑️</button>
          </td>
        </tr>`;
      }).join('')
    : '<tr><td colspan="5" class="text-center" style="color:var(--muted);padding:2rem;">No categories.</td></tr>';
}

function openCatModal(id = null) {
  if (id) {
    const c = allCategories.find(x => x._id === id);
    if (!c) return;
    
    document.getElementById('catModalTitle').textContent = 'Edit Category';
    document.getElementById('cId').value = c._id;
    document.getElementById('cName').value = c.name;
    document.getElementById('cNameSi').value = c.nameSi;
    document.getElementById('cIcon').value = c.icon;
  } else {
    document.getElementById('catModalTitle').textContent = 'Add Category';
    ['cId', 'cName', 'cNameSi', 'cIcon'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
  openModal('catModal');
}

async function saveCategory() {
  const name = document.getElementById('cName').value.trim();
  const nameSi = document.getElementById('cNameSi').value.trim();
  const icon = document.getElementById('cIcon').value.trim() || '📦';
  const idVal = document.getElementById('cId').value;

  if (!name) { showToast('Category name is required.', true); return; }

  try {
    if (idVal) {
      await API.categories.update(idVal, { name, nameSi, icon });
      showToast('Category updated!');
    } else {
      await API.categories.create({ name, nameSi, icon });
      showToast('Category added!');
    }
    closeModal('catModal');
    allCategories = await API.categories.getAll();
    renderCatsTable();
  } catch (error) {
    showToast(error.message, true);
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────
function renderOrdersTable() {
  const statuses = ['All', ...STATUS_FLOW, 'Cancelled'];
  const filtersEl = document.getElementById('orderFilters');
  
  if (filtersEl) {
    filtersEl.innerHTML = statuses.map(s => `
      <button class="btn btn-sm ${orderStatusFilter === s ? 'btn-primary' : 'btn-outline'}" onclick="setOrderFilter('${s}')">${s}</button>
    `).join('');
  }

  let orders = allOrders;
  if (orderStatusFilter !== 'All') orders = orders.filter(o => o.status === orderStatusFilter);

  const body = document.getElementById('ordersTableBody');
  if (!body) return;
  
  body.innerHTML = orders.length
    ? orders.map(o => `<tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer.name}</td>
        <td><a href="tel:${o.customer.phone}">${o.customer.phone}</a></td>
        <td>Rs. ${o.total.toFixed(2)}</td>
        <td><span class="badge ${STATUS_BADGE[o.status] || 'badge-grey'}">${o.status}</span></td>
        <td>${fmtDate(o.createdAt)}</td>
        <td style="display:flex;gap:.3rem;flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" onclick="openOrderDetail('${o.id}')">👁️</button>
          ${nextStatusBtn(o)}
          ${o.status !== 'Cancelled' && o.status !== 'Completed'
            ? `<button class="btn btn-danger btn-sm" onclick="setOrderStatus('${o.id}','Cancelled')">✕</button>`
            : ''}
        </td>
      </tr>`).join('')
    : '<tr><td colspan="7" class="text-center" style="color:var(--muted);padding:2rem;">No orders found.</td></tr>';
}

function nextStatusBtn(o) {
  const idx = STATUS_FLOW.indexOf(o.status);
  if (idx < 0 || idx >= STATUS_FLOW.length - 1) return '';
  const next = STATUS_FLOW[idx + 1];
  return `<button class="btn btn-primary btn-sm" onclick="setOrderStatus('${o.id}','${next}')">→ ${next}</button>`;
}

function setOrderFilter(s) {
  orderStatusFilter = s;
  renderOrdersTable();
}

async function setOrderStatus(id, status) {
  try {
    await API.orders.updateStatus(id, status);
    showToast(`Order ${id} → ${status}`);
    allOrders = await API.orders.getAll();
    updatePendingBadge();
    renderOrdersTable();
    if (currentTab === 'dashboard') renderDashboard();
  } catch (error) {
    showToast(error.message, true);
  }
}

async function openOrderDetail(id) {
  try {
    const o = allOrders.find(x => x.id === id);
    if (!o) return;
    
    document.getElementById('orderDetailTitle').textContent = `Order ${o.id}`;
    const body = document.getElementById('orderDetailBody');
    
    if (body) {
      body.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.5rem;margin-bottom:1rem;font-size:.88rem;">
          <div><strong>Customer:</strong> ${o.customer.name}</div>
          <div><strong>Phone:</strong> <a href="tel:${o.customer.phone}">${o.customer.phone}</a></div>
          <div style="grid-column:1/-1;"><strong>Address:</strong> ${o.customer.address}</div>
          <div><strong>Status:</strong> <span class="badge ${STATUS_BADGE[o.status] || 'badge-grey'}">${o.status}</span></div>
          <div><strong>Date:</strong> ${fmtDate(o.createdAt)}</div>
        </div>
        <div style="font-weight:700;margin-bottom:.5rem;">Items</div>
        <div class="order-items-list">
          ${o.items.map(i => `
            <div class="oi">
              <span>${i.name} (${i.nameSi}) × ${i.qty} ${i.unit}</span>
              <span>Rs. ${(i.price * i.qty).toFixed(2)}</span>
            </div>`).join('')}
          <div class="oi" style="font-weight:800;">
            <span>Total</span><span style="color:var(--orange);">Rs. ${o.total.toFixed(2)}</span>
          </div>
        </div>
        <div style="margin-top:1rem;display:flex;gap:.5rem;flex-wrap:wrap;">
          ${STATUS_FLOW.map(s => `
            <button class="btn btn-sm ${o.status === s ? 'btn-primary' : 'btn-outline'}" onclick="setOrderStatus('${o.id}','${s}');closeModal('orderDetailModal');">${s}</button>
          `).join('')}
          <button class="btn btn-danger btn-sm" onclick="setOrderStatus('${o.id}','Cancelled');closeModal('orderDetailModal');">Cancelled</button>
        </div>`;
    }
    openModal('orderDetailModal');
  } catch (error) {
    showToast(error.message, true);
  }
}

// ── Settings ─────────────────────────────────────────────────────────────────
async function renderSettings() {
  try {
    const s = await API.settings.get();
    document.getElementById('setName').value = s.name || '';
    document.getElementById('setTagline').value = s.tagline || '';
    document.getElementById('setPhone').value = s.phone || '';
    document.getElementById('setAddress').value = s.address || '';
    document.getElementById('setMapUrl').value = s.mapUrl || '';
    document.getElementById('setOpenTime').value = s.openTime || '06:00';
    document.getElementById('setCloseTime').value = s.closeTime || '21:00';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const openDaysEl = document.getElementById('setOpenDays');
    if (openDaysEl) {
      openDaysEl.innerHTML = days.map((d, i) => `
        <label style="display:flex;align-items:center;gap:.3rem;cursor:pointer;font-size:.85rem;font-weight:600;">
          <input type="checkbox" value="${i}" ${(s.openDays || []).includes(i) ? 'checked' : ''} />${d}
        </label>`).join('');
    }
  } catch (error) {
    showToast('Failed to load settings', true);
  }
}

async function saveSettings() {
  const openDays = [...document.querySelectorAll('#setOpenDays input:checked')].map(c => parseInt(c.value));
  try {
    await API.settings.update({
      name: document.getElementById('setName').value.trim() || 'Sunil Store',
      tagline: document.getElementById('setTagline').value.trim() || 'Fresh Choices, Happy Homes.',
      phone: document.getElementById('setPhone').value.trim() || '0775163271',
      address: document.getElementById('setAddress').value.trim() || 'Udalamatta, Galle',
      mapUrl: document.getElementById('setMapUrl').value.trim() || '',
      openTime: document.getElementById('setOpenTime').value || '06:00',
      closeTime: document.getElementById('setCloseTime').value || '21:00',
      openDays,
    });
    showToast('Settings saved!');
  } catch (error) {
    showToast(error.message, true);
  }
}

// ── Pending badge ────────────────────────────────────────────────────────────
function updatePendingBadge() {
  const count = allOrders.filter(o => o.status === 'Pending').length;
  const badge = document.getElementById('pendingBadge');
  if (badge) {
    if (count > 0) { badge.textContent = count;
      badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
  }
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function confirmDelete(type, id) {
  document.getElementById('confirmMsg').textContent =
    `Are you sure you want to delete this ${type}? This cannot be undone.`;
  document.getElementById('confirmOkBtn').onclick = async () => {
    try {
      if (type === 'product') {
        await API.products.delete(id);
        allProducts = await API.products.getAll();
        renderProductsTable();
        showToast('Product deleted.');
      } else {
        await API.categories.delete(id);
        allCategories = await API.categories.getAll();
        renderCatsTable();
        showToast('Category deleted.');
      }
      closeModal('confirmModal');
    } catch (error) {
      showToast(error.message, true);
    }
  };
  openModal('confirmModal');
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

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

let toastTimer;

function showToast(msg, error = false) {
  const el = document.getElementById('toast');
  if (!el) return;
  
  el.textContent = msg;
  el.className = 'show' + (error ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.className = '', 2800);
}

// ── Init ─────────────────────────────────────────────────────────────────────
async function initAdmin() {
  // Check if we're on admin page
  const loginScreen = document.getElementById('loginScreen');
  const adminApp = document.getElementById('adminApp');
  
  if (!loginScreen || !adminApp) {
    // Not on admin page, exit silently
    return;
  }
  
  await renderDashboard();
  updatePendingBadge();
}

// ── Auto-login check ─────────────────────────────────────────────────────────
// Only run if we're on the admin page
const loginScreen = document.getElementById('loginScreen');
const adminApp = document.getElementById('adminApp');

if (loginScreen && adminApp) {
  const token = localStorage.getItem('adminToken');
  if (token) {
    // Verify token is valid
    API.admin.verify()
      .then(() => {
        loginScreen.classList.add('hidden');
        adminApp.classList.remove('hidden');
        return loadAdminData();
      })
      .then(() => initAdmin())
      .catch(() => {
        // Token invalid, clear it
        localStorage.removeItem('adminToken');
      });
  }
}