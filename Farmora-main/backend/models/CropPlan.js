const mongoose = require('mongoose');

const cropPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: true },
  variety: { type: String, default: '' },
  status: { type: String, enum: ['sowing', 'vegetative', 'flowering', 'harvest', 'completed'], default: 'sowing' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  health: { type: String, enum: ['Excellent', 'Normal', 'Poor', 'Critical'], default: 'Normal' },
  season: { type: String, default: 'Kharif 2024' },
  sowingDate: { type: Date },
  recommendations: [{
    crop: String,
    confidence: Number,
    reason: String,
    window: String
  }],
  aiAdvisory: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    confidence: { type: Number, default: 0 }
  },
  climateRisk: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CropPlan', cropPlanSchema);
