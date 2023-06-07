'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      brands.belongsTo(models.users, {
        foreignKey: 'userId'
      });
    }
  }
  brands.init({
    userId: DataTypes.INTEGER,
    brandName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'brands',
  });
  return brands;
};