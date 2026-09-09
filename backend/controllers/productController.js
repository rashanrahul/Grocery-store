const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const filter = {};

    if (categoryId) filter.categoryId = categoryId;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameSi: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { categoryId, name, nameSi, price, unit, stock, image } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const product = new Product({
      categoryId,
      name,
      nameSi,
      price,
      unit,
      stock,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { categoryId, name, nameSi, price, unit, stock, image } = req.body;
    
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Category not found' });
      }
      product.categoryId = categoryId;
    }

    product.name = name || product.name;
    product.nameSi = nameSi || product.nameSi;
    product.price = price !== undefined ? price : product.price;
    product.unit = unit || product.unit;
    product.stock = stock !== undefined ? stock : product.stock;
    product.image = image !== undefined ? image : product.image;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stock
exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.stock = Math.max(0, stock);
    await product.save();
    res.json({ message: 'Stock updated', stock: product.stock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};