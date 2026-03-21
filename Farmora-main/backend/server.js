require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---

app.get('/', (req, res) => res.send('Farmora Backend API Running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/community', require('./routes/community'));
app.use('/api/farmer', require('./routes/farmerDashboard'));
app.use('/api/crop-plans', require('./routes/cropPlan'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/simulation', require('./routes/simulation'));
app.use('/api/disease-alerts', require('./routes/diseaseAlerts'));

// --- DB CONNECTION ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/farmora';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
