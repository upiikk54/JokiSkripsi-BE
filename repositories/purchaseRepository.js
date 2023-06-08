const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { purchases } = require("../models");

class purchaseRepository {
  // ------------------------- Create Product ------------------------- //
  static async createPurchase({
    userId,
    productId,
    supplierId,
    transactionDate,
    amount,
    purchasePrice,
    transactionCode,
  }) {
    const createPurchase = purchases.create({
      userId,
      productId,
      supplierId,
      transactionDate,
      amount,
      purchasePrice,
      transactionCode,
    });

    return createPurchase;
  }

  static async updatePurchaseById({
    id,
    productId,
    supplierId,
    transactionDate,
    amount,
    purchasePrice,
  }) {
    const updatePurchaseById = await purchases.update(
      {
        productId,
        supplierId,
        transactionDate,
        amount,
        purchasePrice,
      },
      {
        where: {
          id,
        },
      }
    );

    return updatePurchaseById;
  }

  static async getPurchaseById({ id }) {
    const getById = await purchases.findOne({
      where: {
        id,
      },
    });
    return getById;
  }

  static async getAllPurchase() {
    const getAllPurchase = await purchases.findAll();

    return getAllPurchase;
  }

  static async deletePurchaseById({ id }) {
    const deletePurchaseById = purchases.destroy({
      where: {
        id,
      },
    });

    return deletePurchaseById;
  }
}

module.exports = purchaseRepository;
