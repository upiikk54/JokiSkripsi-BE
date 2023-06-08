'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      products.belongsTo(models.categorys, {
        foreignKey: 'categoryId'
      });
      products.belongsTo(models.brands, {
        foreignKey: 'brandId'
      });
      products.belongsTo(models.units, {
        foreignKey: 'unitId'
      });
      products.hasMany(models.purchases);
      products.hasMany(models.salesTransactions);
    }
  }
  products.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    unitId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productStock: DataTypes.INTEGER,
    expiredDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};