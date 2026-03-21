const DiseaseAlert = require('../models/DiseaseAlert');

// Keep track of SSE clients
const sseClients = new Set();

exports.getDiseaseAlerts = async (req, res) => {
  try {
    const region = req.query.region;
    const since = req.query.since ? new Date(req.query.since) : null;
    const query = { active: true };
    if (region) query.region = region;
    if (since) query.createdAt = { $gt: since };
    const alerts = await DiseaseAlert.find(query).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.streamDiseaseAlerts = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  const region = req.query.region;

  // Send initial full snapshot
  try {
    const query = { active: true };
    if (region) query.region = region;
    const alerts = await DiseaseAlert.find(query).sort({ createdAt: -1 });
    res.write(`event: snapshot\ndata: ${JSON.stringify(alerts)}\n\n`);
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify({ message: err.message })}\n\n`);
  }

  // Heartbeat every 25 seconds to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 25000);

  // Register push handler for new alerts
  const client = { res, region };
  sseClients.add(client);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(client);
  });
};

// Call this whenever a new alert is created to push to SSE clients
function broadcastAlert(alert) {
  for (const client of sseClients) {
    if (!client.region || client.region === alert.region) {
      client.res.write(`event: alert\ndata: ${JSON.stringify(alert)}\n\n`);
    }
  }
}

exports.createDiseaseAlert = async (req, res) => {
  try {
    const alert = await DiseaseAlert.create(req.body);
    broadcastAlert(alert);
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
