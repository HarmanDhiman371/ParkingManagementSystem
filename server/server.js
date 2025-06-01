const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
const http = require('http');
const { Server } = require('socket.io');


const server = http.createServer(app);

// Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: '*',  // or your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Listen for events from client (optional)
  socket.on('subscribeToParking', (data) => {
    console.log('Client subscribed to parking updates:', data);
    // Optionally join room for filtered data, etc.
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});
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
