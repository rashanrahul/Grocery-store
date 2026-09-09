const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Public route - create order
router.post('/', orderController.createOrder);

// Public route - track order
router.get('/track/:id', orderController.getOrder);

// Admin only routes
router.get('/', auth, orderController.getOrders);
router.get('/stats', auth, orderController.getOrderStats);
router.patch('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;