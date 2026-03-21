const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProduct, getProducts } = require('../controllers/marketplaceController');

router.get('/', getProducts);
router.post('/', auth, createProduct);

module.exports = router;
