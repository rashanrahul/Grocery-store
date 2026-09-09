const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/login', adminController.login);
router.get('/verify', auth, adminController.verify);
router.post('/logout', auth, adminController.logout);

module.exports = router;