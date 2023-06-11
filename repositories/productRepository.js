const sequelize = require("sequelize");
const {
  Op
} = require("sequelize");
const {
  products,
  users,
  categorys,
  brands,
  units
} = require("../models");

class productRepository {
  // ------------------------- Create Product ------------------------- //
  static async createProduct({
    userId,
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  }) {
    const createProduct = products.create({
      userId,
      categoryId,
      brandId,
      unitId,
      productName,
      productPrice,
      productStock,
      expiredDate,
    });

    return createProduct;
  }
  // ------------------------- Update Product ------------------------- //
  static async updateProductById({
    id,
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  }) {
    const updateProductById = await products.update({
      categoryId,
      brandId,
      unitId,
      productName,
      productPrice,
      productStock,
      expiredDate,
    }, {
      where: {
        id,
      },
    });

    return updateProductById;
  }

  static async getProductById({
    id
  }) {
    const getById = await products.findOne({
      where: {
        id
      },
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: categorys,
          attributes: ['categoryName']
        },
        {
          model: brands,
          attributes: ['brandName']
        },
        {
          model: units,
          attributes: ['unitName']
        }
      ],
    });
    return getById;
  }
  
  // ------------------------- Get Produk Sebelum Kadaluwarsa ------------------------- //
  static async getAllProductUnderKadaluwarsa() {
    const now = new Date().toISOString().split("T")[0];
    const searchByDescription = await products.findAll({
      where: {
        expiredDate: {
          [Op.gte]: now,
        },
      },
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: categorys,
          attributes: ['categoryName']
        },
        {
          model: brands,
          attributes: ['brandName']
        },
        {
          model: units,
          attributes: ['unitName']
        }
      ],
      order: [
        ["expiredDate", "ASC"]
      ],
    });

    return searchByDescription;
  }

  static async getAllProductAfterKadaluwarsa() {
    const now = new Date().toISOString().split("T")[0];

    const searchByDescription = await products.findAll({
      where: {
        expiredDate: {
          [Op.lte]: now,
        },
      },
      include: [{
        model: users,
        attributes: ['email','role']},
        {
          model: categorys,
          attributes: ['categoryName']
        },
        {
          model: brands,
          attributes: ['brandName']
        },
        {
          model: units,
          attributes: ['unitName']
        }
      ],
      order: [
        ["expiredDate", "DESC"]
      ],
    });

    return searchByDescription;
  }

  static async deleteProductById({
    id
  }) {
    const deleteProductById = products.destroy({
      where: {
        id,
      },
    });

    return deleteProductById;
  }
}

module.exports = productRepository;