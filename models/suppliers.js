'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      suppliers.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      suppliers.hasMany(models.purchases);
    }
  }
  suppliers.init({
    userId: DataTypes.INTEGER,
    supplierName: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'suppliers',
  });
  return suppliers;
};