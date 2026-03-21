const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { runSimulation, getSimulationHistory } = require('../controllers/simulationController');

router.post('/run', auth, runSimulation);
router.get('/history', auth, getSimulationHistory);

module.exports = router;
