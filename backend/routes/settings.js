const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const auth = require('../middleware/auth');

// Public route
router.get('/', settingsController.getSettings);

// Admin only route
router.put('/', auth, settingsController.updateSettings);

module.exports = router;