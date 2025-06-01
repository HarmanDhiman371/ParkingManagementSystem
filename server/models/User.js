// server/models/User.js
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

module.exports = (sequelize) => {
  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: 'user' },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
