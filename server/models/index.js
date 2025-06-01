// server/models/index.js
require('dotenv').config(); // 👈 Add this line

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const defineUser = require('./User');
const defineSlot = require('./Slot');
const defineBooking = require('./Booking');

const User = defineUser(sequelize);
const Slot = defineSlot(sequelize);
const Booking = defineBooking(sequelize);

// Associations
User.hasMany(Booking);
Booking.belongsTo(User);

Slot.hasMany(Booking);
Booking.belongsTo(Slot);

module.exports = {
  sequelize,
  User,
  Slot,
  Booking,
};
