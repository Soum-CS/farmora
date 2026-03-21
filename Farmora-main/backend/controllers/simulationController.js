const Simulation = require('../models/Simulation');

exports.runSimulation = async (req, res) => {
  try {
    const { waterLevel = 50, fertilizerAmt = 30, pestRisk = 10 } = req.body;

    // AI simulation logic
    const yieldBase = waterLevel * 0.8 + fertilizerAmt * 1.2 - pestRisk * 2;
    const yieldScore = Math.min(100, Math.max(0, Math.round(yieldBase)));
    const marketValue = `₹${(yieldBase * 0.05).toFixed(1)}L`;
    const profitMargin = Math.round(yieldBase / 3);
    const healthIdx = Math.round(waterLevel * 0.9 + (100 - pestRisk) * 0.1);

    // Generate risk factors based on inputs
    const riskFactors = [];
    if (waterLevel < 30) riskFactors.push({ name: 'Hydration Stress', severity: 'High' });
    else if (waterLevel < 50) riskFactors.push({ name: 'Hydration Stress', severity: 'Moderate' });
    if (pestRisk > 40) riskFactors.push({ name: 'Pest Damage Risk', severity: 'High' });
    else if (pestRisk > 20) riskFactors.push({ name: 'Pest Damage Risk', severity: 'Minor Risk' });
    if (fertilizerAmt < 20) riskFactors.push({ name: 'Nutrient Deficiency', severity: 'Moderate' });
    if (fertilizerAmt > 80) riskFactors.push({ name: 'Soil Acidity Leak', severity: 'Minor Risk' });

    // Generate optimization tip
    let optimizationTip = '';
    if (yieldScore < 95) {
      const tips = [];
      if (waterLevel < 70) tips.push(`increasing water intake by ${70 - waterLevel}%`);
      if (fertilizerAmt < 50) tips.push(`increasing nitrogen application by ${50 - fertilizerAmt}%`);
      if (pestRisk > 15) tips.push('adjusting the irrigation cycle to late evening hours');
      optimizationTip = `To reach maximum yield of 95%, the system suggests ${tips.join(' and ')}.`;
    } else {
      optimizationTip = 'Your current inputs are optimized for maximum yield!';
    }

    const result = {
      yieldScore, marketValue, profitMargin, healthIdx
    };

    // Save simulation for history
    if (req.user) {
      await Simulation.create({
        user: req.user.id,
        inputs: { waterLevel, fertilizerAmt, pestRisk },
        result,
        optimizationTip,
        riskFactors
      });
    }

    res.json({ result, riskFactors, optimizationTip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSimulationHistory = async (req, res) => {
  try {
    const history = await Simulation.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
