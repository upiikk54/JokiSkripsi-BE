const salesTransactionService = require("../services/salesTransactionService");

const createSalesTransaction = async (req, res) => {
  const { productId, transactionDate, amount } = req.body;

  const transactionCode = "TS" + Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await salesTransactionService.createSalesTransaction({
      userId,
      productId,
      transactionDate,
      amount,
      transactionCode,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateSalesTransactionById = async (req, res, next) => {
  const { id } = req.params;
  const { productId, transactionDate, amount } = req.body;

  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await salesTransactionService.updateSalesTransactionById({
      id,
      userId,
      productId,
      transactionDate,
      amount,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getSalesTransactionById = async (req, res, next) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await salesTransactionService.getSalesTransactionById({
      id,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getSalesTransactionLaporan = async (req, res, next) => {    
  const { month, year } = req.query
  const { status, statusCode, message, data } =
    await salesTransactionService.getSalesTransactionLaporan({
      month,
      year
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllSalesTransaction = async (req, res) => {
  const { status, statusCode, message, data } =
    await salesTransactionService.getAllSalesTransaction();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteSalesTransactionById = async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await salesTransactionService.deleteSalesTransactionById({
      id,
      userId,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  createSalesTransaction,
  updateSalesTransactionById,
  getSalesTransactionById,
  getAllSalesTransaction,
  deleteSalesTransactionById,
  getSalesTransactionLaporan
};
