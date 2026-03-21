const Analysis = require('../models/Analysis');

exports.createAnalysis = async (req, res) => {
  try {
    const { type, data } = req.body;
    const user = req.user.id;
    const analysis = await Analysis.create({ user, type, data });
    res.status(201).json(analysis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.id });
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
