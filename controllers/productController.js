const productService = require("../services/productService");

const createProduct = async (req, res) => {
  const {
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  } = req.body;

  const user_id = req.user.id;
  const status_expired = false;

  const { status, statusCode, message, data } =
    await productService.createProduct({
      user_id,
      product_code,
      product_name,
      product_price,
      product_stock,
      expired_date,
      status_expired,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const {
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  } = req.body;

  const user_id = req.user.id;

  const { status, statusCode, message, data } =
    await productService.updateProductById({
      id,
      user_id,
      product_code,
      product_name,
      product_price,
      product_stock,
      expired_date,
    });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const { status, statusCode, message, data } =
    await productService.getProductById({ id });

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllUnderKadaluwarsa = async (req, res, next) => {
  const { status, statusCode, message, data } =
    await productService.getAllProductUnderKadaluwarsa();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAllAfterKadaluwarsa = async (req, res, next) => {
  const { status, statusCode, message, data } =
    await productService.getAllProductAfterKadaluwarsa();

  res.status(statusCode).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;

  const user_id = req.user.id;

  const { status, statusCode, message, data } =
    await productService.deleteProductById({
      id,
      user_id,
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
