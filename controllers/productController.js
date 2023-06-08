const productService = require("../services/productService");

const createProduct = async (req, res) => {
  const {
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  } = req.body;

  const userId = req.user.id;

  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.createProduct({
    userId,
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateProductById = async (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  } = req.body;

  const userId = req.user.id;

  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.updateProductById({
    id,
    userId,
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getProductById = async (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.getProductById({
    id
  });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllUnderKadaluwarsa = async (req, res, next) => {
  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.getAllProductUnderKadaluwarsa();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllAfterKadaluwarsa = async (req, res, next) => {
  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.getAllProductAfterKadaluwarsa();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteProductById = async (req, res, next) => {
  const {
    id
  } = req.params;

  const userId = req.user.id;

  const {
    status,
    statusCode,
    message,
    data
  } =
  await productService.deleteProductById({
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
  createProduct,
  updateProductById,
  getAllUnderKadaluwarsa,
  getAllAfterKadaluwarsa,
  getProductById,
  deleteProductById,
};