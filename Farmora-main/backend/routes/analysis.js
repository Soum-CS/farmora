const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAnalysis, getUserAnalyses } = require('../controllers/analysisController');

router.get('/', auth, getUserAnalyses);
router.post('/', auth, createAnalysis);

module.exports = router;
