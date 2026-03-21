const mongoose = require('mongoose');

const soilDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nitrogen: { type: Number, default: 0 },
  phosphorus: { type: Number, default: 0 },
  potassium: { type: Number, default: 0 },
  ph: { type: Number, default: 7.0 },
  conductivity: { type: String, default: 'Normal' },
  lastSampleDate: { type: Date, default: Date.now },
  recommendation: {
    mix: { type: String, default: '' },
    quantity: { type: String, default: '' },
    time: { type: String, default: '' },
    efficiency: { type: Number, default: 0 },
    savings: { type: String, default: '' }
  },
  impact: {
    wastageReduced: { type: String, default: '' },
    enviroImpact: { type: String, default: '' }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SoilData', soilDataSchema);
