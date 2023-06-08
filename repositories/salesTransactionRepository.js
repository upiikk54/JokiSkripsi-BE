const { salesTransactions } = require("../models");

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
    });
    return getById;
  }

  static async getAllSalesTransaction() {
    const getAllSalesTransaction = await salesTransactions.findAll();

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
