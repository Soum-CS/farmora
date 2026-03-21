const CropPlan = require('../models/CropPlan');

exports.getCropPlans = async (req, res) => {
  try {
    const plans = await CropPlan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCropPlan = async (req, res) => {
  try {
    const { cropName, variety, status, progress, health, season, sowingDate, recommendations, aiAdvisory, climateRisk } = req.body;
    const plan = await CropPlan.create({
      user: req.user.id, cropName, variety, status, progress, health, season, sowingDate, recommendations, aiAdvisory, climateRisk
    });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCropPlan = async (req, res) => {
  try {
    const plan = await CropPlan.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: 'Crop plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
