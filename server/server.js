const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const parkingRoutes = require('./routes/parkingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', parkingRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});