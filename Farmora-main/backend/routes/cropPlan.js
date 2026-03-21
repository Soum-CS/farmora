const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCropPlans, createCropPlan, updateCropPlan } = require('../controllers/cropPlanController');

router.get('/', auth, getCropPlans);
router.post('/', auth, createCropPlan);
router.put('/:id', auth, updateCropPlan);

module.exports = router;
