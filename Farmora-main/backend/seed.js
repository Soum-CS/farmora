require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');
const FarmerProfile = require('./models/FarmerProfile');
const MarketPrice = require('./models/MarketPrice');
const RiskAlert = require('./models/RiskAlert');
const Scheme = require('./models/Scheme');
const CommunityPost = require('./models/CommunityPost');
const WeatherData = require('./models/WeatherData');
const DiseaseAlert = require('./models/DiseaseAlert');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/farmora';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // --- 1. Create a test farmer user ---
    let farmer = await User.findOne({ email: 'farmer@farmora.com' });
    if (!farmer) {
      const hash = await bcrypt.hash('farmer123', 10);
      farmer = await User.create({
        name: 'Subham',
        email: 'farmer@farmora.com',
        password: hash,
        role: 'farmer'
      });
      console.log('Created test farmer user:', farmer.email);
    } else {
      console.log('Test farmer already exists:', farmer.email);
    }

    // --- 2. Create/update FarmerProfile ---
    await FarmerProfile.findOneAndUpdate(
      { user: farmer._id },
      {
        $set: {
          farmSize: 12.5,
          location: { village: 'Narayanpur', district: 'Midnapore', state: 'West Bengal' },
          currentCrop: 'Rice (Paddy)',
          weather: { temperature: 28, humidity: 74 },
          irrigationSchedule: {
            nextDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            method: 'drip'
          },
          totalEarnings: 184000,
          activeListings: 3,
          pendingOrders: 1,
          aiInsights: {
            optimalSowing: {
              description: 'Best sowing window opens in 4 days based on soil moisture and weather forecast.',
              progress: 70
            },
            fertilizerEfficiency: {
              description: 'Reduce urea by 15% — current soil nitrogen levels are sufficient.',
              progress: 85
            }
          },
          verificationStatus: 'verified'
        }
      },
      { upsert: true, new: true }
    );
    console.log('Farmer profile seeded');

    // --- 3. Seed Market Prices ---
    await MarketPrice.deleteMany({});
    await MarketPrice.insertMany([
      { cropName: 'Paddy', price: 2240, unit: 'quintal', trend: 'up' },
      { cropName: 'Wheat', price: 2125, unit: 'quintal', trend: 'up' },
      { cropName: 'Maize', price: 1960, unit: 'quintal', trend: 'down' },
      { cropName: 'Sugarcane', price: 3150, unit: 'quintal', trend: 'up' },
      { cropName: 'Cotton', price: 6080, unit: 'quintal', trend: 'stable' }
    ]);
    console.log('Market prices seeded');

    // --- 3.1 Seed Weather Data ---
    await WeatherData.deleteMany({});
    await WeatherData.create({
      location: { city: 'Bargarh', state: 'Odisha' },
      current: { temperature: 28, humidity: 64, windSpeed: 12, condition: 'Sunny' },
      hourlyForecast: [
        { time: '10:00', temperature: '28C', icon: 'Sun', rainChance: '0%' },
        { time: '13:00', temperature: '31C', icon: 'Sun', rainChance: '5%' },
        { time: '16:00', temperature: '29C', icon: 'CloudRain', rainChance: '45%' },
        { time: '19:00', temperature: '26C', icon: 'CloudLightning', rainChance: '70%' }
      ],
      weeklyForecast: [
        { day: 'Mon', tempRange: '30/22C', icon: 'Sun' },
        { day: 'Tue', tempRange: '29/21C', icon: 'CloudRain' },
        { day: 'Wed', tempRange: '27/20C', icon: 'CloudLightning' },
        { day: 'Thu', tempRange: '28/21C', icon: 'Sun' },
        { day: 'Fri', tempRange: '31/23C', icon: 'Sun' }
      ],
      alerts: [
        {
          type: 'rain',
          title: 'Active Warning',
          description: 'Heavy rainfall cluster detected moving East.',
          advisory: 'Postpone fertilizer applications for the next 24h.',
          severity: 'high'
        }
      ],
      insights: {
        evaporationRate: 'Moderate (4.2mm/day)',
        dewPoint: '19C (Standard)',
        solarIndex: '8.4 (V. High)',
        solarNote: 'High UV index predicted. Optimal photosynthesis between 8 AM - 11 AM.'
      }
    });
    console.log('Weather data seeded');

    // --- 4. Seed Risk Alerts ---
    await RiskAlert.deleteMany({});
    await RiskAlert.insertMany([
      {
        type: 'pest',
        title: 'Pest Outbreak Warning',
        description: 'Predicted in Village Area',
        severity: 'high',
        region: 'Midnapore',
        icon: 'Droplets',
        active: true
      },
      {
        type: 'weather',
        title: 'Heavy Rain Alert',
        description: 'Heavy Rain forecast in 48h',
        severity: 'medium',
        region: 'Midnapore',
        icon: 'CloudRain',
        active: true
      }
    ]);
    console.log('Risk alerts seeded');

    // --- 5. Seed Government Schemes ---
    await Scheme.deleteMany({});
    await Scheme.insertMany([
      {
        title: 'PM-Kisan Samman Nidhi',
        dept: 'Central Govt',
        description: 'Direct income support of ₹6000/year to farmer families',
        eligibility: 'All land-holding farmers',
        status: 'Eligible'
      },
      {
        title: 'Crop Insurance 2024',
        dept: 'State Govt',
        description: 'Pradhan Mantri Fasal Bima Yojana for crop loss protection',
        eligibility: 'Farmers with active crops',
        status: 'Eligible'
      }
    ]);
    console.log('Schemes seeded');

    // --- 5.1 Seed Disease Alerts ---
    await DiseaseAlert.deleteMany({});
    await DiseaseAlert.insertMany([
      { village: 'Bhatli', disease: 'Leaf Blight', status: 'Outbreak', severity: 'critical', region: 'Bargarh', lat: 21.01, lng: 83.15, active: true },
      { village: 'Ambapali', disease: 'Pest Attack', status: 'Warning', severity: 'high', region: 'Bargarh', lat: 21.18, lng: 83.22, active: true },
      { village: 'Bargarh', disease: 'Rice Blast', status: 'Clustered', severity: 'high', region: 'Bargarh', lat: 21.33, lng: 83.62, active: true },
      { village: 'Sohela', disease: 'Stem Borer', status: 'Moderate', severity: 'medium', region: 'Bargarh', lat: 21.07, lng: 83.52, active: true },
      { village: 'Padampur', disease: 'Brown Spot', status: 'Warning', severity: 'medium', region: 'Bargarh', lat: 20.99, lng: 83.07, active: true },
      { village: 'Attabira', disease: 'Sheath Blight', status: 'Moderate', severity: 'high', region: 'Bargarh', lat: 21.19, lng: 83.82, active: true },
      { village: 'Jharbandh', disease: 'False Smut', status: 'Warning', severity: 'low', region: 'Bargarh', lat: 21.52, lng: 83.60, active: true }
    ]);
    console.log('Disease alerts seeded');

    // --- 6. Seed Community Posts ---
    const existingPosts = await CommunityPost.countDocuments();
    if (existingPosts === 0) {
      // Create a second user for community variety
      let farmer2 = await User.findOne({ email: 'ramesh@farmora.com' });
      if (!farmer2) {
        const hash2 = await bcrypt.hash('farmer123', 10);
        farmer2 = await User.create({ name: 'Ramesh K.', email: 'ramesh@farmora.com', password: hash2, role: 'farmer' });
      }

      let farmer3 = await User.findOne({ email: 'suresh@farmora.com' });
      if (!farmer3) {
        const hash3 = await bcrypt.hash('farmer123', 10);
        farmer3 = await User.create({ name: 'Suresh M.', email: 'suresh@farmora.com', password: hash3, role: 'farmer' });
      }

      await CommunityPost.insertMany([
        { user: farmer2._id, content: 'Anyone seeing brown spots on leaves? I noticed them on my paddy field this morning.', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { user: farmer3._id, content: 'Try organic mulch for better moisture retention. It has worked wonders for my fields!', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) }
      ]);
      console.log('Community posts seeded');
    } else {
      console.log('Community posts already exist, skipping');
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('Test login: farmer@farmora.com / farmer123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
