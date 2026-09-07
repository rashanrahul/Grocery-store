// ─── Sunil Store — Shared Data Layer ───────────────────────────────────────

const DB = {
  // ── seed defaults ──────────────────────────────────────────────────────────
  defaultCategories: [
    { id: 1, name: "Fruits & Vegetables", nameSi: "පළතුරු සහ එළවළු", icon: "🥦" },
    { id: 2, name: "Dairy & Eggs",        nameSi: "කිරි සහ බිත්තර",   icon: "🥛" },
    { id: 3, name: "Rice & Grains",       nameSi: "සහල් සහ ධාන්‍ය",   icon: "🌾" },
    { id: 4, name: "Beverages",           nameSi: "පාන",               icon: "🧃" },
    { id: 5, name: "Snacks",              nameSi: "කෙටි ආහාර",         icon: "🍪" },
    { id: 6, name: "Household Items",     nameSi: "ගෘහ භාණ්ඩ",         icon: "🧹" },
  ],

  defaultProducts: [
    { id: 1,  categoryId: 2, name: "Yogurt(Highland)",       nameSi: "යෝගට්",       price: 80,  unit: "1",   stock: 50,  image: "https://highland-outlet.shophere.lk/wp-content/uploads/2021/09/hIGHLAND-YOGURT-1.jpg" },
    { id: 2,  categoryId: 1, name: "Carrots",        nameSi: "කැරට්",          price: 90,   unit: "500 g",  stock: 40,  image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80" },
    { id: 3,  categoryId: 1, name: "Bananas",        nameSi: "කෙසෙල්",         price: 60,   unit: "1 dozen", stock: 30,  image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80" },
    { id: 5,  categoryId: 2, name: "Fresh Milk",     nameSi: "නැවුම් කිරි",    price: 180,  unit: "1 L",    stock: 20,  image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80" },
    { id: 6,  categoryId: 2, name: "Eggs",           nameSi: "බිත්තර",          price: 36,  unit: "1", stock: 260,  image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80" },
    { id: 7,  categoryId: 2, name: "Yogurt( Ambewela)",         nameSi: "යෝගට්",           price: 80,   unit: "1",  stock: 50,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5uzPr2uMiVrEZFNXKLgocr04vbYcEeAbxifgFLDQ6kis32BOzZa7Wrcb8&s=10" },
    { id: 8,  categoryId: 3, name: "Ambul Rice",   nameSi: "අම්බුල් සහල්",   price: 290,  unit: "1 kg",   stock: 100, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSG3GnuNMzRJ0wjMfIxoS6G_rE66LItswoalugwaHoZ_j_LnoAr5Kk5yj&s=10" },
    { id: 9,  categoryId: 3, name: "Red Rice",       nameSi: "රතු සහල්",        price: 280,  unit: "1 kg",   stock: 80,  image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b7b5?w=300&q=80" },
    { id: 9,  categoryId: 3, name: "Red Rice",       nameSi: "රතු සහල්",        price: 280,  unit: "1 kg",   stock: 80,  image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b7b5?w=300&q=80" },
    { id: 9,  categoryId: 3, name: "Red Rice",       nameSi: "රතු සහල්",        price: 280,  unit: "1 kg",   stock: 80,  image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b7b5?w=300&q=80" },

    { id: 9,  categoryId: 3, name: "Red Rice",       nameSi: "රතු සහල්",        price: 280,  unit: "1 kg",   stock: 80,  image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9b7b5?w=300&q=80" },
    { id: 10, categoryId: 3, name: "Oats",           nameSi: "ඕට්ස්",            price: 195,  unit: "500 g",  stock: 35,  image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=300&q=80" },
    { id: 11, categoryId: 4, name: "Orange Juice",   nameSi: "දොඩම් යුෂ",       price: 250,  unit: "1 L",    stock: 25,  image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80" },
    { id: 12, categoryId: 4, name: "Coconut Water",  nameSi: "පොල් වතුර",       price: 80,   unit: "330 ml", stock: 40,  image: "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=300&q=80" },
    { id: 13, categoryId: 5, name: "Biscuits",       nameSi: "බිස්කට්",          price: 75,   unit: "200 g",  stock: 50,  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80" },
    { id: 14, categoryId: 5, name: "Chips",          nameSi: "චිප්ස්",            price: 110,  unit: "100 g",  stock: 45,  image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80" },
    { id: 15, categoryId: 6, name: "Dish Soap",      nameSi: "බඳුන් සබන්",       price: 145,  unit: "500 ml", stock: 30,  image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80" },
    { id: 16, categoryId: 6, name: "Broom",          nameSi: "කොටු",              price: 320,  unit: "1 pc",   stock: 10,  image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&q=80" },
  ],

  // ── helpers ────────────────────────────────────────────────────────────────
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },

  // ── public API ─────────────────────────────────────────────────────────────
  getCategories()  { return this.get("ss_categories", this.defaultCategories); },
  getProducts()    { return this.get("ss_products",   this.defaultProducts);   },
  getOrders()      { return this.get("ss_orders",     []);                     },
  getCart()        { return this.get("ss_cart",       []);                     },

  saveCategories(d) { this.set("ss_categories", d); },
  saveProducts(d)   { this.set("ss_products",   d); },
  saveOrders(d)     { this.set("ss_orders",     d); },
  saveCart(d)       { this.set("ss_cart",       d); },

  nextOrderId() {
    const orders = this.getOrders();
    const last   = orders.length ? Math.max(...orders.map(o => o.seq)) : 10024;
    return { seq: last + 1, id: `FM-${last + 1}` };
  },

  isAdmin() { return sessionStorage.getItem("ss_admin") === "true"; },
  adminLogin(pass) {
    if (pass === "admin123") { sessionStorage.setItem("ss_admin", "true"); return true; }
    return false;
  },
  adminLogout() { sessionStorage.removeItem("ss_admin"); },

  getSettings() {
    return this.get('ss_settings', {
      name:     'Sunil Store',
      tagline:  'Fresh Choices, Happy Homes.',
      phone:    '0775163271',
      address:  'Udalamatta, Galle',
      mapUrl:   'https://www.google.com/maps/place/Sunil+Store/@6.1829866,80.2948983,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae1650053d15c7b:0xb8600c6f5bb91ff!8m2!3d6.1829866!4d80.2948983!16s%2Fg%2F11xh5tx4py?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
      openTime: '06:00',
      closeTime:'21:00',
      openDays: [0,1,2,3,4,5,6],
    });
  },
  saveSettings(d) { this.set('ss_settings', d); },

  get STORE_PHONE() { return this.getSettings().phone; },
  get STORE_NAME()  { return this.getSettings().name;  },
};
