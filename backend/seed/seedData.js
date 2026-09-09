const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Settings = require('../models/Settings');
const connectDB = require('../config/db');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Settings.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Seed categories
    const categories = [
      { name: "Rice & Grains", nameSi: "සහල් සහ ධාන්‍ය වර්ග", icon: "🌾" },
      { name: "Dhal & Pulses", nameSi: "පරිප්පු සහ රනිල කුලය", icon: "🫘" },
      { name: "Spices", nameSi: "කුළු බඩු", icon: "🌶️" },
      { name: "Dairy & Eggs", nameSi: "කිරි සහ බිත්තර", icon: "🥛" },
      { name: "Beverages", nameSi: "පාන වර්ග", icon: "🧃" },
      { name: "Biscuits & Snacks", nameSi: "බිස්කට් සහ කෙටි ආහාර", icon: "🍪" },
      { name: "Bakery", nameSi: "බේකරි", icon: "🍞" },
      { name: "Cooking Essentials", nameSi: "පිසීමේ අත්‍යවශ්‍ය දේ", icon: "🫙" },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories seeded`);

    const catMap = {};
    createdCategories.forEach(c => { catMap[c.name] = c._id; });

    // ─── Products with clean image URLs ───
    const products = [
      // Rice & Grains
      { categoryId: catMap["Rice & Grains"], name: "Ambul Rice", nameSi: "අම්බුල් සහල්", price: 290, unit: "1 kg", stock: 100, image: "https://i.imgur.com/rice1.jpg" },
      { categoryId: catMap["Rice & Grains"], name: "Red Rice", nameSi: "රතු සහල්", price: 165, unit: "1 kg", stock: 150, image: "https://i.imgur.com/redrice.jpg" },
      { categoryId: catMap["Rice & Grains"], name: "White Rice", nameSi: "සුදු සහල්", price: 180, unit: "1 kg", stock: 100, image: "https://i.imgur.com/whiterice.jpg" },
      { categoryId: catMap["Rice & Grains"], name: "Pony Samba", nameSi: "පොන්නි සම්බා", price: 250, unit: "1 kg", stock: 150, image: "https://i.imgur.com/ponysamba.jpg" },
      { categoryId: catMap["Rice & Grains"], name: "Nadu Rice", nameSi: "නාඩු සහල්", price: 210, unit: "1 kg", stock: 150, image: "https://i.imgur.com/nadurice.jpg" },

      // Dhal & Pulses
      { categoryId: catMap["Dhal & Pulses"], name: "Red Lentils", nameSi: "රතු පරිප්පු", price: 140, unit: "500 g", stock: 40, image: "https://i.imgur.com/lentils.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Chickpeas", nameSi: "කඩල", price: 250, unit: "500 g", stock: 25, image: "https://i.imgur.com/chickpeas.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Green Beans", nameSi: "මුං ඇට", price: 90, unit: "100 g", stock: 15, image: "https://i.imgur.com/greenbeans.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Peanut", nameSi: "රටකජු", price: 90, unit: "100 g", stock: 15, image: "https://i.imgur.com/peanut.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Raisins", nameSi: "වියළි මිදි", price: 100, unit: "50 g", stock: 15, image: "https://i.imgur.com/raisins.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Bread Flour", nameSi: "පාන් පිටි", price: 100, unit: "500 g", stock: 50, image: "https://i.imgur.com/flour.jpg" },
      { categoryId: catMap["Dhal & Pulses"], name: "Cup Lentils", nameSi: "කප් පරිප්පු", price: 200, unit: "500 g", stock: 20, image: "https://i.imgur.com/cuplentils.jpg" },

      // Spices
      { categoryId: catMap["Spices"], name: "Turmeric Powder", nameSi: "කහ කුඩු", price: 40, unit: "10 g", stock: 50, image: "https://i.imgur.com/turmeric.jpg" },
      { categoryId: catMap["Spices"], name: "Chilli Powder", nameSi: "මිරිස් කුඩු", price: 95, unit: "50 g", stock: 55, image: "https://i.imgur.com/chilli.jpg" },
      { categoryId: catMap["Spices"], name: "Curry Powder", nameSi: "තුනපහ කුඩු", price: 95, unit: "50 g", stock: 55, image: "https://i.imgur.com/curry.jpg" },
      { categoryId: catMap["Spices"], name: "Black Pepper", nameSi: "ගම්මිරිස්", price: 140, unit: "50 g", stock: 45, image: "https://i.imgur.com/pepper.jpg" },
      { categoryId: catMap["Spices"], name: "Mustard Powder", nameSi: "අබ කුඩු", price: 60, unit: "50 g", stock: 35, image: "https://i.imgur.com/mustard.jpg" },

      // Dairy & Eggs
      { categoryId: catMap["Dairy & Eggs"], name: "Fresh Milk", nameSi: "නැවුම් කිරි", price: 580, unit: "1 L", stock: 8, image: "https://i.imgur.com/milk.jpg" },
      { categoryId: catMap["Dairy & Eggs"], name: "Eggs", nameSi: "බිත්තර", price: 36, unit: "1 pcs", stock: 260, image: "https://i.imgur.com/eggs.jpg" },
      { categoryId: catMap["Dairy & Eggs"], name: "Yogurt", nameSi: "යෝගට්", price: 80, unit: "1 pcs", stock: 40, image: "https://i.imgur.com/yogurt.jpg" },
      { categoryId: catMap["Dairy & Eggs"], name: "Cheese", nameSi: "චීස්", price: 80, unit: "1 pcs", stock: 20, image: "https://i.imgur.com/cheese.jpg" },

      // Beverages
      { categoryId: catMap["Beverages"], name: "Sprite", nameSi: "ස්ප්‍රයිට්", price: 300, unit: "1050ml", stock: 15, image: "https://i.imgur.com/sprite.jpg" },
      { categoryId: catMap["Beverages"], name: "Cocacola", nameSi: "කොකා කෝලා", price: 200, unit: "400ml", stock: 10, image: "https://i.imgur.com/coke.jpg" },
      { categoryId: catMap["Beverages"], name: "Water", nameSi: "ජලය", price: 150, unit: "1500ml", stock: 10, image: "https://i.imgur.com/water.jpg" },
      { categoryId: catMap["Beverages"], name: "Cream Soda", nameSi: "ක්‍රීම් සෝඩා", price: 80, unit: "200ml", stock: 5, image: "https://i.imgur.com/creamsoda.jpg" },
      { categoryId: catMap["Beverages"], name: "Tropical Punch", nameSi: "ට්‍රොපිචාල් පන්ච්", price: 350, unit: "1500ml", stock: 10, image: "https://i.imgur.com/tropical.jpg" },
      { categoryId: catMap["Beverages"], name: "Aloe Vera", nameSi: "කෝමාරිකා පානය", price: 140, unit: "200ml", stock: 10, image: "https://i.imgur.com/aloe.jpg" },
      { categoryId: catMap["Beverages"], name: "MILO", nameSi: "මයිලෝ", price: 130, unit: "130 ml", stock: 10, image: "https://i.imgur.com/milo.jpg" },

      // Biscuits & Snacks
      { categoryId: catMap["Biscuits & Snacks"], name: "NICE Biscuits", nameSi: "නයිස්", price: 110, unit: "100 g", stock: 50, image: "https://i.imgur.com/nice.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Cream Cracker", nameSi: "ක්‍රීම් ක්‍රැකර්", price: 240, unit: "200 g", stock: 20, image: "https://i.imgur.com/cracker.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Chocolate Puff", nameSi: "චොකලට් පෆ්", price: 130, unit: "100 g", stock: 20, image: "https://i.imgur.com/chocopuff.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Lemon Puff", nameSi: "ලෙමන් පෆ්", price: 130, unit: "100 g", stock: 20, image: "https://i.imgur.com/lemonpuff.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Tikiri Marie", nameSi: "ටිකිරි මාරි", price: 230, unit: "230 g", stock: 10, image: "https://i.imgur.com/marie.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Chocolate Cream", nameSi: "චොකලට් ක්‍රීම්", price: 260, unit: "200 g", stock: 10, image: "https://i.imgur.com/chococream.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Wafers", nameSi: "වේෆර්ස්", price: 300, unit: "225 g", stock: 10, image: "https://i.imgur.com/wafers.jpg" },
      { categoryId: catMap["Biscuits & Snacks"], name: "Happy Cookies", nameSi: "හැපී කුකීස්", price: 170, unit: "200 g", stock: 20, image: "https://i.imgur.com/cookies.jpg" },

      // Bakery
      { categoryId: catMap["Bakery"], name: "Bread", nameSi: "පාන්", price: 140, unit: "1 loaf", stock: 20, image: "https://i.imgur.com/bread.jpg" },
      { categoryId: catMap["Bakery"], name: "Butter Cake", nameSi: "බටර් කේක්", price: 950, unit: "1 pc", stock: 10, image: "https://i.imgur.com/cake.jpg" },

      // Cooking Essentials
      { categoryId: catMap["Cooking Essentials"], name: "Coconut Oil", nameSi: "පොල් තෙල්", price: 175, unit: "1/4", stock: 30, image: "https://i.imgur.com/coconutoil.jpg" },
      { categoryId: catMap["Cooking Essentials"], name: "Brown Sugar", nameSi: "දුඹුරු සීනි", price: 135, unit: "500 g", stock: 60, image: "https://i.imgur.com/brownsugar.jpg" },
      { categoryId: catMap["Cooking Essentials"], name: "White Sugar", nameSi: "සුදු සීනි", price: 120, unit: "500 g", stock: 60, image: "https://i.imgur.com/whitesugar.jpg" },
      { categoryId: catMap["Cooking Essentials"], name: "Salt", nameSi: "ලුණු", price: 100, unit: "400 g", stock: 100, image: "https://i.imgur.com/salt.jpg" },
      { categoryId: catMap["Cooking Essentials"], name: "Cumin", nameSi: "සූදුරු", price: 65, unit: "50g", stock: 100, image: "https://i.imgur.com/cumin.jpg" },
      { categoryId: catMap["Cooking Essentials"], name: "Fennel", nameSi: "මාදුරු", price: 40, unit: "50g", stock: 100, image: "https://i.imgur.com/fennel.jpg" },
    ];

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    // Seed settings
    const settings = new Settings({
      name: 'Sunil Store',
      tagline: 'Fresh Choices, Happy Homes.',
      phone: '0775163271',
      address: 'Udalamatta, Galle',
      mapUrl: '',
      openTime: '06:00',
      closeTime: '21:00',
      openDays: [0, 1, 2, 3, 4, 5, 6],
    });
    await settings.save();
    console.log('✅ Settings seeded');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();