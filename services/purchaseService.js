const purchaseRepository = require("../repositories/purchaseRepository");

class purchaseService {
  static async createPurchase({
    userId,
    productId,
    supplierId,
    transactionDate,
    amount,
    purchasePrice,
    transactionCode,
    id,
    productStock
  }) {
    try {
      if (!productId) {
        return {
          status: false,
          statusCode: 400,
          message: "Produk Id harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      if (!supplierId) {
        return {
          status: false,
          statusCode: 400,
          message: "Supplier Id harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      if (!transactionDate) {
        return {
          status: false,
          statusCode: 400,
          message: "Tanggal transaksi harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      if (!amount) {
        return {
          status: false,
          statusCode: 400,
          message: "Jumlah harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      if (!purchasePrice) {
        return {
          status: false,
          statusCode: 400,
          message: "Harga pembelian harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      if (!transactionCode) {
        return {
          status: false,
          statusCode: 400,
          message: "Kode transaksi harus diisi.",
          data: {
            createdPurchase: null,
          },
        };
      }

      const createdPurchase = await purchaseRepository.createPurchase({
        userId,
        productId,
        supplierId,
        transactionDate,
        amount,
        purchasePrice,
        transactionCode,
        id,          
        productStock, 
      });

      return {
        status: true,
        statusCode: 201,
        message: "Berhasil membuat pembelian.",
        data: {
          createdPurchase: createdPurchase,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          createdPurchase: null,
        },
      };
    }
  }

  static async updatePurchaseById({
    id,
    userId,
    productId,
    supplierId,
    transactionDate,
    amount,
    purchasePrice,
  }) {
    try {
      const getPurchaseById = await purchaseRepository.getPurchaseById({
        id,
      });

      if (getPurchaseById.userId == userId) {
        if (!productId) {
          productId = getPurchaseById.productId;
        }

        if (!supplierId) {
          supplierId = getPurchaseById.supplierId;
        }

        if (!transactionDate) {
          transactionDate = getPurchaseById.transactionDate;
        }

        if (!amount) {
          amount = getPurchaseById.amount;
        }

        if (!purchasePrice) {
          purchasePrice = getPurchaseById.purchasePrice;
        }

        const updatePurchaseById = await purchaseRepository.updatePurchaseById({
          id,
          productId,
          supplierId,
          transactionDate,
          amount,
          purchasePrice,
        });

        return {
          status: true,
          statusCode: 200,
          message: "Pembelian berhasil diperbarui.",
          data: {
            updatePurchaseById: updatePurchaseById,
          },
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Sumber tidak ada.",
          data: {
            updatePurchaseById: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: err.message,
        data: {
          updatedSupplier: null,
        },
      };
    }
  }

  static async getPurchaseById({ id }) {
    try {
      const getPurchaseById = await purchaseRepository.getPurchaseById({
        id,
      });

      return {
        status: true,
        statusCode: 200,
        message: "data pembelian berhasil ditampilkan",
        data: getPurchaseById,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_purchase_by_id: null,
        },
      };
    }
  }

  static async getPurchaseLaporan({ month, year }) {
    try {
      const getPurchaseLaporan = await purchaseRepository.getPurchaseLaporan({
        month,
        year
      });

      return {
        status: true,
        statusCode: 200,
        message: "data pembelian berhasil ditampilkan",
        data: getPurchaseLaporan,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_purchase_laporan: null,
        },
      };
    }
  }

  static async getAllPurchase() {
    try {
      const getAllPurchase = await purchaseRepository.getAllPurchase();

      return {
        status: true,
        statusCode: 200,
        message: "Pembelian berhasil ditampilkan",
        data: {
          getAllPurchase: getAllPurchase,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          getAllPurchase: null,
        },
      };
    }
  }

  static async deletePurchaseById({ id, userId }) {
    try {
      const getPurchaseById = await purchaseRepository.getPurchaseById({
        id,
      });

      if (getPurchaseById.userId == userId) {
        const deletePurchaseById = await purchaseRepository.deletePurchaseById({
          id,
        });

        return {
          status: true,
          statusCode: 200,
          message: "Pembelian berhasil dihapus.",
          data: {
            deletePurchaseById: deletePurchaseById,
          },
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Sumber tidak ada.",
          data: {
            deletePurchaseById: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: err.message,
        data: {
          deleteSupplier: null,
        },
      };
    }
  }
}

module.exports = purchaseService;
