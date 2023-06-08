'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      purchases.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      purchases.belongsTo(models.products, {
        foreignKey: 'productId'
      });
      purchases.belongsTo(models.suppliers, {
        foreignKey: 'supplierId'
      });
    }
  }
  purchases.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    transactionCode: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    amount: DataTypes.INTEGER,
    purchasePrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};