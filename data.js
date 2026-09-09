// ─── API Service ────────────────────────────────────────────────────────────

const API_URL = 'http://localhost:5000/api';

// Helper for API calls
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const url = `${API_URL}${endpoint}`;
    console.log(`📡 API Call: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('❌ API Error:', error.message);
    // Return empty data instead of throwing to prevent page break
    if (endpoint.includes('/products')) return [];
    if (endpoint.includes('/categories')) return [];
    if (endpoint.includes('/settings')) return {};
    if (endpoint.includes('/orders')) return [];
    throw error;
  }
}

// ── Products API ──
const ProductAPI = {
  getAll: (params = '') => apiCall(`/products${params}`),
  getOne: (id) => apiCall(`/products/${id}`),
  create: (data) => apiCall('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateStock: (id, stock) => apiCall(`/products/${id}/stock`, { 
    method: 'PATCH', 
    body: JSON.stringify({ stock }) 
  }),
  delete: (id) => apiCall(`/products/${id}`, { method: 'DELETE' }),
};

// ── Categories API ──
const CategoryAPI = {
  getAll: () => apiCall('/categories'),
  getOne: (id) => apiCall(`/categories/${id}`),
  create: (data) => apiCall('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/categories/${id}`, { method: 'DELETE' }),
};

// ── Orders API ──
const OrderAPI = {
  getAll: (status = '') => apiCall(`/orders${status ? `?status=${status}` : ''}`),
  track: (id) => apiCall(`/orders/track/${id}`),
  create: (data) => apiCall('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => apiCall(`/orders/${id}/status`, { 
    method: 'PATCH', 
    body: JSON.stringify({ status }) 
  }),
  getStats: () => apiCall('/orders/stats'),
};

// ── Settings API ──
const SettingsAPI = {
  get: () => apiCall('/settings'),
  update: (data) => apiCall('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

// ── Admin API ──
const AdminAPI = {
  login: (password) => apiCall('/admin/login', { 
    method: 'POST', 
    body: JSON.stringify({ password }) 
  }),
  verify: () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      return Promise.reject('No token');
    }
    return apiCall('/admin/verify');
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  },
};

// ── Cart (localStorage for guest cart) ──
const Cart = {
  get: () => JSON.parse(localStorage.getItem('ss_cart') || '[]'),
  save: (cart) => localStorage.setItem('ss_cart', JSON.stringify(cart)),
  clear: () => localStorage.removeItem('ss_cart'),
};

// ── Export ──
window.API = {
  products: ProductAPI,
  categories: CategoryAPI,
  orders: OrderAPI,
  settings: SettingsAPI,
  admin: AdminAPI,
  cart: Cart,
};