const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  location: {
    city: { type: String, default: 'Bargarh' },
    state: { type: String, default: 'Odisha' }
  },
  current: {
    temperature: { type: Number, default: 28 },
    humidity: { type: Number, default: 64 },
    windSpeed: { type: Number, default: 12 },
    condition: { type: String, default: 'Sunny' }
  },
  hourlyForecast: [{
    time: String,
    temperature: String,
    icon: String,
    rainChance: String
  }],
  weeklyForecast: [{
    day: String,
    tempRange: String,
    icon: String
  }],
  alerts: [{
    type: { type: String },
    title: String,
    description: String,
    advisory: String,
    severity: String
  }],
  insights: {
    evaporationRate: { type: String, default: 'Moderate (4.2mm/day)' },
    dewPoint: { type: String, default: '19°C (Standard)' },
    solarIndex: { type: String, default: '8.4 (V. High)' },
    solarNote: { type: String, default: 'Optimal photosynthesis between 8 AM - 11 AM.' }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherData', weatherDataSchema);
