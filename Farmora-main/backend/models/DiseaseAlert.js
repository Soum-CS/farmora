const mongoose = require('mongoose');

const diseaseAlertSchema = new mongoose.Schema({
  village: { type: String, required: true },
  disease: { type: String, required: true },
  status: { type: String, enum: ['Outbreak', 'Warning', 'Moderate', 'Clustered', 'Resolved'], default: 'Warning' },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  region: { type: String, default: '' },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiseaseAlert', diseaseAlertSchema);
