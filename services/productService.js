const productRepository = require("../repositories/productRepository");

class transactionService {
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
    try {
      if (!categoryId) {
        return {
          status: false,
          statusCode: 400,
          message: "Kategori produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!brandId) {
        return {
          status: false,
          statusCode: 400,
          message: "Merk produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!unitId) {
        return {
          status: false,
          statusCode: 400,
          message: "Satuan produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!productName) {
        return {
          status: false,
          statusCode: 400,
          message: "Nama produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!productPrice) {
        return {
          status: false,
          statusCode: 400,
          message: "Harga produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!productStock) {
        return {
          status: false,
          statusCode: 400,
          message: "Harga produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      if (!expiredDate) {
        return {
          status: false,
          statusCode: 400,
          message: "Harga produk harus diisi.",
          data: {
            createdProduct: null,
          },
        };
      }

      const createProduct = await productRepository.createProduct({
        userId,
        categoryId,
        brandId,
        unitId,
        productName,
        productPrice,
        productStock,
        expiredDate,
      });

      return {
        status: true,
        statusCode: 201,
        message: "Berhasil membuat produk.",
        data: {
          createdProduct: createProduct,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          createdProduct: null,
        },
      };
    }
  }

  static async updateProductById({
    id,
    userId,
    categoryId,
    brandId,
    unitId,
    productName,
    productPrice,
    productStock,
    expiredDate,
  }) {
    const getProductById = await productRepository.getProductById({
      id,
    });

    if (getProductById.userId == userId) {
      if (!categoryId) {
        categoryId = getProductById.categoryId;
      }

      if (!brandId) {
        brandId = getProductById.brandId;
      }

      if (!unitId) {
        unitId = getProductById.unitId;
      }

      if (!productName) {
        productName = getProductById.productName;
      }

      if (!productPrice) {
        productPrice = getProductById.productPrice;
      }

      if (!productStock) {
        productStock = getProductById.productStock;
      }

      if (!expiredDate) {
        expiredDate = getProductById.expiredDate;
      }

      const updateProductById = await productRepository.updateProductById({
        id,
        categoryId,
        brandId,
        unitId,
        productName,
        productPrice,
        productStock,
        expiredDate,
      });

      return {
        status: true,
        statusCode: 200,
        message: "Product berhasil diperbarui.",
        data: {
          updateProductById: updateProductById,
        },
      };
    } else {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          updateProductById: null,
        },
      };
    }
  }

  static async getAllProductUnderKadaluwarsa() {
    try {
      const getAllProductUnderKadaluwarsa =
        await productRepository.getAllProductUnderKadaluwarsa();

      return {
        status: true,
        statusCode: 200,
        message: "data product berhasil ditampilkan",
        data: getAllProductUnderKadaluwarsa,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_under_kadaluwarsa: null,
        },
      };
    }
  }

  static async getProductById({
    id
  }) {
    try {
      const getProductById = await productRepository.getProductById({
        id
      });

      return {
        status: true,
        statusCode: 200,
        message: "data product berhasil ditampilkan",
        data: getProductById,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_product_by_id: null,
        },
      };
    }
  }

  static async getAllProductAfterKadaluwarsa() {
    try {
      const getAllProductAfterKadaluwarsa =
        await productRepository.getAllProductAfterKadaluwarsa();

      return {
        status: true,
        statusCode: 200,
        message: "data product berhasil ditampilkan",
        data: getAllProductAfterKadaluwarsa,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_after_kadaluwarsa: null,
        },
      };
    }
  }

  static async deleteProductById({
    id,
    userId
  }) {
    const getProductById = await productRepository.getProductById({
      id,
    });

    if (getProductById.userId == userId) {
      const deleteProductById = await productRepository.deleteProductById({
        id,
      });

      return {
        status: true,
        statusCode: 200,
        message: "Produk berhasil dihapus.",
        data: {
          deleteProductById: deleteProductById,
        },
      };
    } else {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          deleteProductById: null,
        },
      };
    }
  }
}

module.exports = transactionService;