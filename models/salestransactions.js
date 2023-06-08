'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      salesTransactions.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      salesTransactions.belongsTo(models.products, {
        foreignKey: 'productId'
      });
    }
  }
  salesTransactions.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    transactionCode: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salesTransactions',
  });
  return salesTransactions;
};