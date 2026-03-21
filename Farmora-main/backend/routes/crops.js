const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCrop, getCrops } = require('../controllers/cropController');

router.get('/', auth, getCrops);
router.post('/', auth, createCrop);

module.exports = router;
