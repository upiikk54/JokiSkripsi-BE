const salesTransactionService = require("../services/salesTransactionService");
const productRepository = require("../repositories/productRepository");

const createSalesTransaction = async (req, res) => {
  const { productId, transactionDate, amount, nameShop } = req.body;

  const transactionCode = "TS" + Math.floor(Math.random() * (1000 - 10 + 10)) + 10;
  const userId = req.user.id;
  const getProductById = await productRepository.getProductById({
    id: productId,
  });
  if (getProductById.productStock == 0) {
    res.status(401).send({
      status: false,
      message: `Stok sudah habis`
    })
  } else if (getProductById.productStock < amount) {
    res.status(401).send({
      status: false,
      message: `Jumlah melebihi stok produk. Stok produk tinggal ${getProductById.productStock}`
    })
  } else {
    const productStock = getProductById.productStock - amount; 
    const { status, statusCode, message, data } =
      await salesTransactionService.createSalesTransaction({
        userId,
        productId,
        transactionDate,
        amount,
        transactionCode,
        nameShop,
        productStock,
        id: productId
      });
  
    res.status(statusCode).send({
      status: status,
      message: message,
      data: data,
    });
  }
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
