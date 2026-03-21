const mongoose = require('mongoose');

const riskAlertSchema = new mongoose.Schema({
  type: { type: String, enum: ['pest', 'weather', 'disease', 'flood', 'drought'], required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  region: { type: String, default: '' },
  icon: { type: String, default: 'AlertTriangle' }, // lucide icon name
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiskAlert', riskAlertSchema);
