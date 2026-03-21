const SoilData = require('../models/SoilData');

exports.getSoilData = async (req, res) => {
  try {
    const soil = await SoilData.findOne({ user: req.user.id });
    if (!soil) return res.status(404).json({ message: 'No soil data found' });
    res.json(soil);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSoilData = async (req, res) => {
  try {
    const soil = await SoilData.findOneAndUpdate(
      { user: req.user.id },
      { $set: { ...req.body, updatedAt: Date.now() }, $setOnInsert: { user: req.user.id } },
      { new: true, upsert: true }
    );
    res.json(soil);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
