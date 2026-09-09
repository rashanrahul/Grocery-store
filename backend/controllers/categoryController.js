const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single category with product count
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const productCount = await Product.countDocuments({ categoryId: category._id });
    res.json({ ...category.toObject(), productCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create category (admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, nameSi, icon } = req.body;
    const category = new Category({ name, nameSi, icon });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category (admin only)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { name, nameSi, icon } = req.body;
    category.name = name || category.name;
    category.nameSi = nameSi || category.nameSi;
    category.icon = icon || category.icon;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category (admin only)
exports.deleteCategory = async (req, res) => {
  try {
    // Check if category has products
    const productCount = await Product.countDocuments({ categoryId: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        error: 'Cannot delete category with existing products',
        productCount,
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};