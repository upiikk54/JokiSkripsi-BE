const productRepository = require("../repositories/productRepository");

class transactionService {
  static async createProduct({
    user_id,
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  }) {
    try {
      if (!product_code) {
        return {
          status: false,
          statusCode: 400,
          message: "Kode produk pemasukan harus diisi.",
          data: {
            created_product: null,
          },
        };
      }

      if (!product_name) {
        return {
          status: false,
          statusCode: 400,
          message: "Nama produk pemasukan harus diisi.",
          data: {
            created_product: null,
          },
        };
      }

      if (!product_price) {
        return {
          status: false,
          statusCode: 400,
          message: "Harga produk pemasukan harus diisi.",
          data: {
            created_product: null,
          },
        };
      }

      if (!product_stock) {
        return {
          status: false,
          statusCode: 400,
          message: "Stok produk harus diisi.",
          data: {
            created_product: null,
          },
        };
      }

      if (!expired_date) {
        return {
          status: false,
          statusCode: 400,
          message: "Tanggal kadaluwarsa harus diisi.",
          data: {
            created_product: null,
          },
        };
      }

      const createProduct = await productRepository.createProduct({
        user_id,
        product_code,
        product_name,
        product_price,
        product_stock,
        expired_date,
      });

      return {
        status: true,
        statusCode: 201,
        message: "Berhasil membuat pemasukan.",
        data: {
          created_product: createProduct,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          created_product: null,
        },
      };
    }
  }

  static async updateProductById({
    id,
    user_id,
    product_code,
    product_name,
    product_price,
    product_stock,
    expired_date,
  }) {
    const getProductById = await productRepository.getProductById({
      id,
    });
    // console.log(getProductById);

    if (getProductById.user_id == user_id) {
      if (!product_code) {
        product_code = getProductById.product_code;
      }

      if (!product_name) {
        product_name = getProductById.product_name;
      }

      if (!product_price) {
        product_price = getProductById.product_price;
      }

      if (!product_stock) {
        product_stock = getProductById.product_stock;
      }

      if (!expired_date) {
        expired_date = getProduct.expired_date;
      }

      const updateProductById = await productRepository.updateProductById({
        id,
        product_code,
        product_name,
        product_price,
        product_stock,
        expired_date,
      });

      return {
        status: true,
        statusCode: 200,
        message: "Pengeluaran berhasil diperbarui.",
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

  static async getProductById({ id }) {
    try {
      const getProductById = await productRepository.getProductById({ id });

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

  static async deleteProductById({ id, user_id }) {
    const getProductById = await productRepository.getProductById({
      id,
    });

    if (getProductById.user_id == user_id) {
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
