const purchaseService = require("../services/purchaseService");
const productRepository = require("../repositories/productRepository");
const purchaseRepository = require("../repositories/purchaseRepository");

const createPurchase = async (req, res) => {
  const { productId, supplierId, transactionDate, amount, purchasePrice } =
    req.body;

  const transactionCode = "TP" + Math.floor(Math.random() * (1000 - 10 + 10)) + 10;
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
      await purchaseService.createPurchase({
        userId,
        productId,
        supplierId,
        transactionDate,
        amount,
        purchasePrice,
        transactionCode,
        id: productId,    
        userId,
        productStock,
      });      
  
    res.status(statusCode).send({
      status: status,
      message: message,
      data: data,
    });  
  }

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

const getPurchaseLaporan = async (req, res, next) => {    
  const { month, year } = req.query
  const { status, statusCode, message, data } =
    await purchaseService.getPurchaseLaporan({
      month,
      year
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
  getPurchaseLaporan
};
