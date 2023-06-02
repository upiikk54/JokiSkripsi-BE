"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.users, {
        foreignKey: "user_id",
      });
    }
  }
  products.init(
    {
      user_id: DataTypes.INTEGER,
      product_code: DataTypes.STRING,
      product_name: DataTypes.STRING,
      product_price: DataTypes.INTEGER,
      product_stock: DataTypes.STRING,
      expired_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
