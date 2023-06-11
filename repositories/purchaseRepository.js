const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { purchases, users, products, suppliers } = require("../models");

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
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: products,
          attributes: ['productName','productPrice','productStock','expiredDate']
        },
        {
          model: suppliers,
          attributes: ['supplierName','contact','address','description']
        }
      ]
    });
    return getById;
  }

  static async getAllPurchase() {
    const getAllPurchase = await purchases.findAll({
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: products,
          attributes: ['productName','productPrice','productStock','expiredDate']
        },
        {
          model: suppliers,
          attributes: ['supplierName','contact','address','description']
        }
      ]
    });

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
