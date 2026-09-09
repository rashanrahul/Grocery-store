const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin only routes
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.patch('/:id/stock', auth, productController.updateStock);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;