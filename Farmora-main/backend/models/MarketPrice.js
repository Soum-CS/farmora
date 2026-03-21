const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'quintal' },
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
