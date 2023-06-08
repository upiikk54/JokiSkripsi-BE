const purchaseService = require("../services/purchaseService");

const createPurchase = async (req, res) => {
  const { productId, supplierId, transactionDate, amount, purchasePrice } =
    req.body;

  const transactionCode = "TP" + Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await purchaseService.createPurchase({
      userId,
      productId,
      supplierId,
      transactionDate,
      amount,
      purchasePrice,
      transactionCode,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const updatePurchaseById = async (req, res, next) => {
  const { id } = req.params;
  const { productId, supplierId, transactionDate, amount, purchasePrice } =
    req.body;

  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await purchaseService.updatePurchaseById({
      id,
      userId,
      productId,
      supplierId,
      transactionDate,
      amount,
      purchasePrice,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getPurchaseById = async (req, res, next) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await purchaseService.getPurchaseById({
      id,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllPurchase = async (req, res) => {
  const { status, statusCode, message, data } =
    await purchaseService.getAllPurchase();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const deletePurchaseById = async (req, res, next) => {
  const { id } = req.params;

  const userId = req.user.id;

  const { status, statusCode, message, data } =
    await purchaseService.deletePurchaseById({
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
  createPurchase,
  updatePurchaseById,
  getPurchaseById,
  getAllPurchase,
  deletePurchaseById,
};
