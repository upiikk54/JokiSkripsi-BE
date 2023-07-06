const { salesTransactions, users, products } = require("../models");
const sequelize = require("sequelize");
const {
  Op
} = require("sequelize");

class salesTransactionRepository {
  // ------------------------- Create Product ------------------------- //
  static async createSalesTransaction({
    userId,
    productId,
    transactionDate,
    amount,
    transactionCode,
    nameShop,
    id,
    productStock
  }) {
    const createSalesTransaction = salesTransactions.create({
      userId,
      productId,
      transactionDate,
      amount,
      transactionCode,
      nameShop
    });
    await products.update({
      productStock,
    }, {
      where: {
        id,
      },
    })

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

  static async getSalesTransactionLaporan({
    month,
    year
  }) {                
    const getById = await salesTransactions.findAll({      
      where: {
        createdAt: {
          [Op.and]: [
            sequelize.where(sequelize.fn('MONTH', sequelize.col('salestransactions.transactionDate')), month),
            sequelize.where(sequelize.fn('YEAR', sequelize.col('salestransactions.transactionDate')), year)
          ]
        }
      },
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: products,
          attributes: ['productName','productPrice','productStock','expiredDate']
        }
      ],
      order: [
        ["id", "DESC"]
      ],
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
