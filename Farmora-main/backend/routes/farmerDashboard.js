const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDashboard } = require('../controllers/farmerDashboardController');
const { getProfile, createOrUpdateProfile } = require('../controllers/farmerProfileController');

// Dashboard aggregate endpoint
router.get('/dashboard', auth, getDashboard);

// Profile CRUD
router.get('/profile', auth, getProfile);
router.put('/profile', auth, createOrUpdateProfile);

module.exports = router;
