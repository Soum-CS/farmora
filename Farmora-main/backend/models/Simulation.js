const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inputs: {
    waterLevel: { type: Number, default: 50 },
    fertilizerAmt: { type: Number, default: 30 },
    pestRisk: { type: Number, default: 10 }
  },
  result: {
    yieldScore: { type: Number, default: 0 },
    marketValue: { type: String, default: '₹0' },
    profitMargin: { type: Number, default: 0 },
    healthIdx: { type: Number, default: 0 }
  },
  optimizationTip: { type: String, default: '' },
  riskFactors: [{
    name: String,
    severity: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Simulation', simulationSchema);
