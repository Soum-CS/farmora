const mongoose = require('mongoose');

const farmerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  farmSize: { type: Number, default: 0 }, // in acres
  location: {
    village: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' }
  },
  currentCrop: { type: String, default: '' },
  weather: {
    temperature: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 }
  },
  irrigationSchedule: {
    nextDate: { type: Date },
    method: { type: String, default: 'drip' }
  },
  totalEarnings: { type: Number, default: 0 },
  activeListings: { type: Number, default: 0 },
  pendingOrders: { type: Number, default: 0 },
  aiInsights: {
    optimalSowing: {
      description: { type: String, default: '' },
      progress: { type: Number, default: 0 } // percentage 0-100
    },
    fertilizerEfficiency: {
      description: { type: String, default: '' },
      progress: { type: Number, default: 0 }
    }
  },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

farmerProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FarmerProfile', farmerProfileSchema);
