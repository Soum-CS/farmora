const FarmerProfile = require('../models/FarmerProfile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await FarmerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {
      farmSize, location, currentCrop, weather,
      irrigationSchedule, totalEarnings, activeListings,
      pendingOrders, aiInsights, verificationStatus
    } = req.body;

    const update = {};
    if (farmSize !== undefined) update.farmSize = farmSize;
    if (location) update.location = location;
    if (currentCrop) update.currentCrop = currentCrop;
    if (weather) update.weather = weather;
    if (irrigationSchedule) update.irrigationSchedule = irrigationSchedule;
    if (totalEarnings !== undefined) update.totalEarnings = totalEarnings;
    if (activeListings !== undefined) update.activeListings = activeListings;
    if (pendingOrders !== undefined) update.pendingOrders = pendingOrders;
    if (aiInsights) update.aiInsights = aiInsights;
    if (verificationStatus) update.verificationStatus = verificationStatus;

    const profile = await FarmerProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: update, $setOnInsert: { user: req.user.id } },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
