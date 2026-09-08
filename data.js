// ─── Sunil Store — Shared Data Layer ───────────────────────────────────────

const DB = {
  // ── seed defaults ──────────────────────────────────────────────────────────
  defaultCategories: [
    { id: 1,  name: "Rice & Grains",           nameSi: "සහල් සහ ධාන්‍ය වර්ග",        icon: "🌾" },
    { id: 2,  name: "Dhal & Pulses",           nameSi: "පරිප්පු සහ රනිල කුලය",       icon: "🫘" },
    { id: 3,  name: "Spices",                  nameSi: "කුළු බඩු",                    icon: "🌶️" },
    { id: 4,  name: "Fruits & Vegetables",     nameSi: "පළතුරු සහ එළවළු",            icon: "🥦" },
    { id: 5,  name: "Dairy & Eggs",            nameSi: "කිරි සහ බිත්තර",             icon: "🥛" },
    { id: 6,  name: "Beverages",               nameSi: "පාන වර්ග",                    icon: "🧃" },
    { id: 7,  name: "Biscuits & Snacks",       nameSi: "බිස්කට් සහ කෙටි ආහාර",       icon: "🍪" },
    { id: 8,  name: "Bakery",                  nameSi: "බේකරි",                       icon: "🍞" },
    { id: 9,  name: "Canned & Packaged Foods", nameSi: "ටින් සහ ඇසුරුම් ආහාර",       icon: "🥫" },
    { id: 10, name: "Cooking Essentials",      nameSi: "පිසීමේ අත්‍යවශ්‍ය දේ",        icon: "🫙" },
    { id: 11, name: "Household & Cleaning",    nameSi: "ගෘහ සහ පිරිසිදු කිරීමේ දේ",  icon: "🧹" },
    { id: 12, name: "Personal Care",           nameSi: "පෞද්ගලික සත්කාර",            icon: "🧴" },
    { id: 13, name: "Baby Products",           nameSi: "ළදරු නිෂ්පාදන",              icon: "🍼" },
    { id: 14, name: "Frozen Foods",            nameSi: "ශීතකළ ආහාර",                 icon: "🧊" },
  ],

  defaultProducts: [
     // Rice & Grains
    { id: 1,  categoryId: 1,  name: "Ambul Rice",     nameSi: "අම්බුල් සහල්",      price: 290, unit: "1 kg",    stock: 100, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80" },
    { id: 2,  categoryId: 1,  name: "less bran Red Rice",          nameSi: "නිවුඩු අඩු රතු සහල්",           price: 165, unit: "1 kg",    stock: 150,  image: "https://cdn.prod.website-files.com/5f8690e2f4f017863f10bd7b/684f83128704eac18e51a091_red%20ricee.png" },
    { id: 3,  categoryId: 1,  name: "More bran Red Rice",          nameSi: "නිවුඩු වැඩි රතු සහල්",           price: 185, unit: "1 kg",    stock: 150,  image: "https://cdn.prod.website-files.com/5f8690e2f4f017863f10bd7b/684f83128704eac18e51a091_red%20ricee.png" },
    { id: 4,  categoryId: 1,  name: "White Rice",          nameSi: "රට සුදු සහල්",           price: 180, unit: "1 kg",    stock: 0,  image: "https://img.magnific.com/free-psd/closeup-wooden-bowl-filled-with-cooked-white-rice_191095-79998.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 5,  categoryId: 1,  name: "lankan white Rice",          nameSi: "ලංකා සුදු සහල්",           price: 185, unit: "1 kg",    stock: 150,  image: "https://img.magnific.com/free-psd/closeup-wooden-bowl-filled-with-cooked-white-rice_191095-79998.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 6,  categoryId: 1,  name: "Pony Samba",          nameSi: "පොන්නි සම්බා",           price: 250, unit: "1 kg",    stock: 150,  image: "https://5.imimg.com/data5/ANDROID/Default/2022/6/EM/ES/ZD/5158094/product-jpeg-500x500.jpg" },
    { id: 7,  categoryId: 1,  name: "Nadu Rice",          nameSi: "නාඩු සහල්",           price: 210, unit: "1 kg",    stock: 150,  image: "https://5.imimg.com/data5/ANDROID/Default/2022/6/EM/ES/ZD/5158094/product-jpeg-500x500.jpg" },
    { id: 8,  categoryId: 1,  name: "Village red rice",              nameSi: "ගමේ රතු සහල්",              price: 185, unit: "1kg",   stock: 0,  image: "https://cdn.prod.website-files.com/5f8690e2f4f017863f10bd7b/684f83128704eac18e51a091_red%20ricee.png" },
    // Dhal & Pulses
    { id: 9,  categoryId: 2,  name: "Red Lentils",       nameSi: "රතු පරිප්පු",        price: 140, unit: "500 g",   stock: 60,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4D3BbY5X-nk6GNft6l1gSAn8Wx2wPku6OFGZlUzlAYiFwh-vUXnrbnk&s=10" },
    { id: 10,  categoryId: 2,  name: "Cup Lentils",       nameSi: "කප් පරිප්පු ",        price: 200, unit: "500 g",   stock: 60,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4D3BbY5X-nk6GNft6l1gSAn8Wx2wPku6OFGZlUzlAYiFwh-vUXnrbnk&s=10" },
    { id: 11,  categoryId: 2,  name: "Chickpeas lentils",       nameSi: "කඩල පරිප්පු ",        price: 130, unit: "500 g",   stock: 60,  image: "https://s-mart.shophere.lk/wp-content/uploads/2020/04/kadala-parippu.jpg" },
    { id: 12,  categoryId: 2,  name: "White sugar",       nameSi: "සුදු සීනි",        price: 120, unit: "500 g",   stock: 60,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tmJz4Nne-z7-V8CdJ-SDEbJ4kdx_eo4Vq3dDoqJLdmL06im86s-CWBXS&s=10" },
    { id: 13,  categoryId: 2,  name: "Brown sugar",       nameSi: "දුඹුරු සීනි",        price: 135, unit: "500 g",   stock: 60,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevmk68p2D9NqCWQHXHig4gIzAdinqMLsMdIXRtu8VmA&s=10" },
    { id: 14,  categoryId: 2,  name: "Chickpeas",         nameSi: "කඩල",                price: 250, unit: "500 g",   stock: 45,  image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80" },
    { id: 15,  categoryId: 2,  name: "Green beans",         nameSi: "මුං ඇට ",                price: 90, unit: "100 g",   stock: 45,  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmcumGnjbMZsZMwhYwQLkbroTZ3Z5QO8Unsm4ybPM4B94aIH7a0-vMsc&s=10" },
    { id: 16,  categoryId: 2,  name: "Chickpeas",         nameSi: "කඩල",                price: 180, unit: "500 g",   stock: 45,  image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80" },

    { id: 5,  categoryId: 2,  name: "Chickpeas",         nameSi: "කඩල",                price: 180, unit: "500 g",   stock: 45,  image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=300&q=80" },
    // Spices
    { id: 6,  categoryId: 3,  name: "Turmeric Powder",   nameSi: "කහ කුඩු",            price: 95,  unit: "100 g",   stock: 70,  image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=300&q=80" },
    { id: 7,  categoryId: 3,  name: "Chilli Powder",     nameSi: "මිරිස් කුඩු",        price: 110, unit: "100 g",   stock: 65,  image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80" },
    { id: 8,  categoryId: 3,  name: "Cinnamon",          nameSi: "කුරුඳු",             price: 150, unit: "50 g",    stock: 40,  image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80" },
    // Fruits & Vegetables
    { id: 9,  categoryId: 4,  name: "Tomatoes",          nameSi: "තක්කාලි",            price: 120, unit: "1 kg",    stock: 50,  image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&q=80" },
    { id: 10, categoryId: 4,  name: "Carrots",           nameSi: "කැරට්",              price: 90,  unit: "500 g",   stock: 40,  image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80" },
    { id: 11, categoryId: 4,  name: "Bananas",           nameSi: "කෙසෙල්",             price: 60,  unit: "1 dozen", stock: 30,  image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80" },
    { id: 12, categoryId: 4,  name: "Spinach",           nameSi: "නිවිති",              price: 45,  unit: "250 g",   stock: 25,  image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&q=80" },
    // Dairy & Eggs
    { id: 13, categoryId: 5,  name: "Fresh Milk",        nameSi: "නැවුම් කිරි",        price: 180, unit: "1 L",     stock: 20,  image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80" },
    { id: 14, categoryId: 5,  name: "Eggs",              nameSi: "බිත්තර",             price: 220, unit: "10 pcs",  stock: 60,  image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80" },
    { id: 15, categoryId: 5,  name: "Yogurt",            nameSi: "යෝගට්",              price: 95,  unit: "200 g",   stock: 15,  image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80" },
    // Beverages
    { id: 16, categoryId: 6,  name: "Orange Juice",      nameSi: "දොඩම් යුෂ",          price: 250, unit: "1 L",     stock: 25,  image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80" },
    { id: 17, categoryId: 6,  name: "Coconut Water",     nameSi: "පොල් වතුර",          price: 80,  unit: "330 ml",  stock: 40,  image: "https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=300&q=80" },
    // Biscuits & Snacks
    { id: 18, categoryId: 7,  name: "Biscuits",          nameSi: "බිස්කට්",             price: 75,  unit: "200 g",   stock: 50,  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80" },
    { id: 19, categoryId: 7,  name: "Chips",             nameSi: "චිප්ස්",              price: 110, unit: "100 g",   stock: 45,  image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80" },
    // Bakery
    { id: 20, categoryId: 8,  name: "White Bread",       nameSi: "සුදු පාන්",           price: 120, unit: "1 loaf",  stock: 20,  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80" },
    { id: 21, categoryId: 8,  name: "Butter Cake",       nameSi: "බටර් කේක්",          price: 350, unit: "1 pc",    stock: 10,  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80" },
    // Canned & Packaged Foods
    { id: 22, categoryId: 9,  name: "Canned Tuna",       nameSi: "ටින් මාළු",           price: 280, unit: "185 g",   stock: 55,  image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&q=80" },
    { id: 23, categoryId: 9,  name: "Tomato Paste",      nameSi: "තක්කාලි පේස්ට්",     price: 95,  unit: "200 g",   stock: 40,  image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=300&q=80" },
    // Cooking Essentials
    { id: 24, categoryId: 10, name: "Coconut Oil",       nameSi: "පොල් තෙල්",           price: 420, unit: "500 ml",  stock: 30,  image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80" },
    { id: 25, categoryId: 10, name: "Sugar",             nameSi: "සීනි",                price: 160, unit: "1 kg",    stock: 90,  image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&q=80" },
    { id: 26, categoryId: 10, name: "Salt",              nameSi: "ලුණු",                price: 60,  unit: "500 g",   stock: 100, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=300&q=80" },
    // Household & Cleaning
    { id: 27, categoryId: 11, name: "Dish Soap",         nameSi: "බඳුන් සබන්",          price: 145, unit: "500 ml",  stock: 30,  image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80" },
    { id: 28, categoryId: 11, name: "Broom",             nameSi: "කොටු",                price: 320, unit: "1 pc",    stock: 10,  image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&q=80" },
    // Personal Care
    { id: 29, categoryId: 12, name: "Shampoo",           nameSi: "ෂැම්පූ",              price: 380, unit: "200 ml",  stock: 25,  image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=300&q=80" },
    { id: 30, categoryId: 12, name: "Toothpaste",        nameSi: "දත් මැදීමේ පේස්ට්",  price: 195, unit: "150 g",   stock: 35,  image: "https://images.unsplash.com/photo-1559591937-abc8a8b8e8e8?w=300&q=80" },
    // Baby Products
    { id: 31, categoryId: 13, name: "Baby Diapers",      nameSi: "ළදරු නැපීස්",        price: 950, unit: "10 pcs",  stock: 20,  image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80" },
    { id: 32, categoryId: 13, name: "Baby Powder",       nameSi: "ළදරු කුඩු",           price: 320, unit: "200 g",   stock: 15,  image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&q=80" },
    // Frozen Foods
    { id: 33, categoryId: 14, name: "Frozen Fish",       nameSi: "ශීතකළ මාළු",          price: 550, unit: "500 g",   stock: 18,  image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&q=80" },
    { id: 34, categoryId: 14, name: "Frozen Vegetables", nameSi: "ශීතකළ එළවළු",         price: 290, unit: "400 g",   stock: 22,  image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80" },
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
