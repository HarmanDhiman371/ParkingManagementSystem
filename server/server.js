const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const { sequelize } = require('./models');

app.use('/api/auth', authRoutes);
sequelize.sync({ alter: true }).then(() => {
  console.log('DB Synced ✅');
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}).catch((err) => {
  console.error('Error syncing DB:', err);
});
