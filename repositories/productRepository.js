const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { products, users } = require("../models");

class productRepository {
  // ------------------------- Create Product ------------------------- //
  static async createProduct({
    user_id,
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  }) {
    const createProduct = products.create({
      user_id,
      product_code,
      product_name,
      product_price,
      product_stock,
      expired_date,
    });

    return createProduct;
  }
  // ------------------------- Update Product ------------------------- //
  static async updateProductById({
    id,
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  }) {
    const updateProductById = await products.update(
      {
        product_code,
        product_name,
        product_price,
        product_stock,
        expired_date,
      },
      {
        where: {
          id,
        },
      }
    );

    return updateProductById;
  }

  static async getProductById({ id }) {
    const getById = await products.findOne({
      attributes: [
        "id",
        "user_id",
        "product_code",
        "product_name",
        "product_price",
        "product_stock",
        "expired_date",
      ],
      where: { id },
    });
    // console.log(getById);
    return getById;
  }
  // ------------------------- Get Produk Sebelum Kadaluwarsa ------------------------- //
  static async getAllProductUnderKadaluwarsa() {
    const now = new Date().toISOString().split("T")[0];
    console.log(now);
    const searchByDescription = await products.findAll({
      attributes: [
        "id",
        "product_code",
        "product_name",
        "product_price",
        "product_stock",
        "expired_date",
      ],
      where: {
        expired_date: {
          [Op.gte]: now,
        },
      },
      order: [["expired_date", "ASC"]],
    });

    return searchByDescription;
  }

  static async getAllProductAfterKadaluwarsa() {
    const now = new Date().toISOString().split("T")[0];
    console.log(now);

    const searchByDescription = await products.findAll({
      attributes: [
        "id",
        "product_code",
        "product_name",
        "product_price",
        "product_stock",
        "expired_date",
      ],
      where: {
        expired_date: {
          [Op.lte]: now,
        },
      },
      order: [["expired_date", "DESC"]],
    });

    return searchByDescription;
  }

  static async deleteProductById({ id }) {
    const deleteProductById = products.destroy({
      where: {
        id,
      },
    });

    return deleteProductById;
  }
}

module.exports = productRepository;
