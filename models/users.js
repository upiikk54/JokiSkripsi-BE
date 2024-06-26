'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.brands);
      users.hasMany(models.units);
      users.hasMany(models.categorys);
      users.hasMany(models.products);
      users.hasMany(models.suppliers);
      users.hasMany(models.purchases);
      users.hasMany(models.salesTransactions);
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};