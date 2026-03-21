const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  area: { type: Number, required: true }, // in acres
  sowingDate: Date,
  fertilizer: String,
  irrigation: String,
  status: { type: String, default: 'growing' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', cropSchema);