const express = require('express');
const router = express.Router();
const { getDiseaseAlerts, streamDiseaseAlerts, createDiseaseAlert } = require('../controllers/diseaseAlertController');
const auth = require('../middleware/auth');

router.get('/stream', streamDiseaseAlerts);
router.get('/', getDiseaseAlerts);
router.post('/', auth, createDiseaseAlert);

module.exports = router;
