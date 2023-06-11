const { salesTransactions, users, products } = require("../models");

class salesTransactionRepository {
  // ------------------------- Create Product ------------------------- //
  static async createSalesTransaction({
    userId,
    productId,
    transactionDate,
    amount,
    transactionCode,
  }) {
    const createSalesTransaction = salesTransactions.create({
      userId,
      productId,
      transactionDate,
      amount,
      transactionCode,
    });

    return createSalesTransaction;
  }

  static async updateSalesTransactionById({
    id,
    productId,
    transactionDate,
    amount,
  }) {
    const updateSalesTransactionById = await salesTransactions.update(
      {
        productId,
        transactionDate,
        amount,
      },
      {
        where: {
          id,
        },
      }
    );

    return updateSalesTransactionById;
  }

  static async getSalesTransactionById({ id }) {
    const getById = await salesTransactions.findOne({
      where: {
        id,
      },
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: products,
          attributes: ['productName','productPrice','productStock','expiredDate']
        }
      ]
    });
    return getById;
  }

  static async getAllSalesTransaction() {
    const getAllSalesTransaction = await salesTransactions.findAll({
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: products,
          attributes: ['productName','productPrice','productStock','expiredDate']
        }
      ]
    });

    return getAllSalesTransaction;
  }

  static async deleteSalesTransactionById({ id }) {
    const deleteSalesTransactionById = salesTransactions.destroy({
      where: {
        id,
      },
    });

    return deleteSalesTransactionById;
  }
}

module.exports = salesTransactionRepository;
