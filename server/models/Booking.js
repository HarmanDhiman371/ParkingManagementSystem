// server/models/Booking.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Booking', {
    startTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
    price: {
      type: DataTypes.FLOAT
    }
  });
};
