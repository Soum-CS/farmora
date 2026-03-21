const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getSoilData, updateSoilData } = require('../controllers/soilController');

router.get('/', auth, getSoilData);
router.put('/', auth, updateSoilData);

module.exports = router;
