const Crop = require('../models/Crop');

exports.createCrop = async (req, res) => {
  try {
    const { name, area, sowingDate, fertilizer, irrigation } = req.body;
    const user = req.user.id;
    const crop = await Crop.create({ user, name, area, sowingDate, fertilizer, irrigation });
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.user.id });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
