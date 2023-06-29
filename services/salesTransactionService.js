const salesTransactionRepository = require("../repositories/salesTransactionRepository");

class salesTransactionService {
  static async createSalesTransaction({
    userId,
    productId,
    transactionDate,
    amount,
    transactionCode,
  }) {
    try {
      if (!productId) {
        return {
          status: false,
          statusCode: 400,
          message: "Produk Id harus diisi.",
          data: {
            createSalesTransaction: null,
          },
        };
      }

      if (!transactionDate) {
        return {
          status: false,
          statusCode: 400,
          message: "Tanggal transaksi harus diisi.",
          data: {
            createSalesTransaction: null,
          },
        };
      }

      if (!amount) {
        return {
          status: false,
          statusCode: 400,
          message: "Jumlah harus diisi.",
          data: {
            createSalesTransaction: null,
          },
        };
      }

      if (!transactionCode) {
        return {
          status: false,
          statusCode: 400,
          message: "Kode transaksi harus diisi.",
          data: {
            createSalesTransaction: null,
          },
        };
      }

      const createSalesTransaction =
        await salesTransactionRepository.createSalesTransaction({
          userId,
          productId,
          transactionDate,
          amount,
          transactionCode,
        });

      return {
        status: true,
        statusCode: 201,
        message: "Berhasil membuat transaksi penjualan.",
        data: {
          createSalesTransaction: createSalesTransaction,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 401,
        message: "Sumber tidak ada.",
        data: {
          createSalesTransaction: null,
        },
      };
    }
  }

  static async updateSalesTransactionById({
    id,
    userId,
    productId,
    transactionDate,
    amount,
  }) {
    try {
      const getSalesTransactionById =
        await salesTransactionRepository.getSalesTransactionById({
          id,
        });

      if (getSalesTransactionById.userId == userId) {
        if (!productId) {
          productId = getSalesTransactionById.productId;
        }

        if (!transactionDate) {
          transactionDate = getSalesTransactionById.transactionDate;
        }

        if (!amount) {
          amount = getSalesTransactionById.amount;
        }

        const updateSalesTransactionById =
          await salesTransactionRepository.updateSalesTransactionById({
            id,
            productId,
            transactionDate,
            amount,
          });

        return {
          status: true,
          statusCode: 200,
          message: "Sales transaction berhasil diperbarui.",
          data: {
            updateSalesTransactionById: updateSalesTransactionById,
          },
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Sumber tidak ada.",
          data: {
            updateSalesTransactionById: null,
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

  static async getSalesTransactionById({ id }) {
    try {
      const getSalesTransactionById =
        await salesTransactionRepository.getSalesTransactionById({
          id,
        });

      return {
        status: true,
        statusCode: 200,
        message: "data sales transaction berhasil ditampilkan",
        data: getSalesTransactionById,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_sales_transaction_by_id: null,
        },
      };
    }
  }

  static async getSalesTransactionLaporan({ month, year }) {
    try {
      const getSalesTransactionLaporan = await salesTransactionRepository.getSalesTransactionLaporan({
        month,
        year
      });

      return {
        status: true,
        statusCode: 200,
        message: "data sales transaction berhasil ditampilkan",
        data: getSalesTransactionLaporan,
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          get_salesTransaction_laporan: null,
        },
      };
    }
  }

  static async getAllSalesTransaction() {
    try {
      const getAllSalesTransaction =
        await salesTransactionRepository.getAllSalesTransaction();

      return {
        status: true,
        statusCode: 200,
        message: "Sales transaction berhasil ditampilkan",
        data: {
          getAllSalesTransaction: getAllSalesTransaction,
        },
      };
    } catch (err) {
      return {
        status: false,
        statusCode: 500,
        message: err.message,
        data: {
          getAllSalesTransaction: null,
        },
      };
    }
  }

  static async deleteSalesTransactionById({ id, userId }) {
    try {
      const getSalesTransactionById =
        await salesTransactionRepository.getSalesTransactionById({
          id,
        });

      if (getSalesTransactionById.userId == userId) {
        const deleteSalesTransactionById =
          await salesTransactionRepository.deleteSalesTransactionById({
            id,
          });

        return {
          status: true,
          statusCode: 200,
          message: "Sales transaction berhasil dihapus.",
          data: {
            deleteSalesTransactionById: deleteSalesTransactionById,
          },
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Sumber tidak ada.",
          data: {
            deleteSalesTransactionById: null,
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
}

module.exports = salesTransactionService;
