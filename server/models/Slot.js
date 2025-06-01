// server/models/Slot.js
const { DataTypes, Model } = require('sequelize');

class Slot extends Model {}

module.exports = (sequelize) => {
  Slot.init(
    {
      slotNumber: { type: DataTypes.INTEGER, unique: true },
      status: { type: DataTypes.STRING, defaultValue: 'empty' },
      vehicleType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Slot',
    }
  );

  return Slot;
};
