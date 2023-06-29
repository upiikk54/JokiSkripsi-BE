const express = require("express");
const app = express();
const PORT = 8811;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// ------------------- Import Controller ------------------- //
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const brandController = require("./controllers/brandController");
const unitController = require("./controllers/unitController");
const categoryController = require("./controllers/categoryController");
const supplierController = require("./controllers/supplierController");
const purchaseController = require("./controllers/purchaseController");
const salesTransactionController = require("./controllers/salesTransactionController");
// ------------------- End Import Controller ------------------- //

// ------------------- Import Controller ------------------- //
const middlewares = require("./middlewares/auth");
// ------------------- End Import Controller ------------------- //

// ------------------- Define Routes Auth ------------------- //
app.post("/v1/auth/register", authController.handleRegister);
app.post("/v1/auth/login", authController.handleLogin);
app.get("/v1/auth/me", middlewares.authenticate, authController.currentUser);
// ------------------- End Define Routes Auth ------------------- //

// ------------------- Define Routes Brand ------------------- //
app.post(
  "/v1/brand/create",
  middlewares.authenticate,
  brandController.handleCreateBrand
);
app.put(
  "/v1/brand/update/:id",
  middlewares.authenticate,
  brandController.handleUpdateBrand
);
app.delete(
  "/v1/brand/delete/:id",
  middlewares.authenticate,
  brandController.handleDeleteBrand
);
app.get("/v1/brand", middlewares.authenticate, brandController.handleGetAllBrand);
app.get(
  "/v1/brand/:id",
  middlewares.authenticate,
  brandController.handleGetBrandById
);
// ------------------- End Define Routes Brand ------------------- //

// ------------------- Define Routes Units ------------------- //
app.post(
  "/v1/unit/create",
  middlewares.authenticate,
  unitController.handleCreateUnit
);
app.put(
  "/v1/unit/update/:id",
  middlewares.authenticate,
  unitController.handleUpdateUnit
);
app.delete(
  "/v1/unit/delete/:id",
  middlewares.authenticate,
  unitController.handleDeleteUnit
);
app.get("/v1/unit", middlewares.authenticate, unitController.handleGetAllUnit);
app.get(
  "/v1/unit/:id",
  middlewares.authenticate,
  unitController.handleGetUnitById
);
// ------------------- End Define Routes Units ------------------- //

// ------------------- Define Routes Category ------------------- //
app.post(
  "/v1/category/create",
  middlewares.authenticate,
  categoryController.handleCreateCategory
);
app.put(
  "/v1/category/update/:id",
  middlewares.authenticate,
  categoryController.handleUpdateCategory
);
app.delete(
  "/v1/category/delete/:id",
  middlewares.authenticate,
  categoryController.handleDeletecategory
);
app.get("/v1/category", middlewares.authenticate, categoryController.handleGetAllCategory);
app.get(
  "/v1/category/:id",
  middlewares.authenticate,
  categoryController.handleGetCategoryById
);
// ------------------- End Define Routes Category ------------------- //

// ------------------- Define Routes Product ------------------- //
app.post(
  "/v1/create-product",
  middlewares.authenticate,
  productController.createProduct
);
app.get(
  "/v1/get-under-kadaluwarsa",
  middlewares.authenticate,
  productController.getAllUnderKadaluwarsa
);
app.get(
  "/v1/get-after-kadaluwarsa",
  middlewares.authenticate,
  productController.getAllAfterKadaluwarsa
);
app.get(
  "/v1/product/:id",
  middlewares.authenticate,
  productController.getProductById
);
app.put(
  "/v1/update-product/:id",
  middlewares.authenticate,
  productController.updateProductById
);
app.delete(
  "/v1/delete-product/:id",
  middlewares.authenticate,
  productController.deleteProductById
);
// ------------------- Define Routes Product ------------------- //

// ------------------- Define Routes Product ------------------- //
app.get("/v1/supplier",
  middlewares.authenticate,
  supplierController.handleGetAllSupplier);
app.get(
  "/v1/supplier/:id",
  middlewares.authenticate,
  supplierController.handleGetSupplierById
);
app.post(
  "/v1/supplier-create",
  middlewares.authenticate,
  supplierController.handleCreateSupplier
);
app.put(
  "/v1/update-supplier/:id",
  middlewares.authenticate,
  supplierController.handleUpdateSupplier
);
app.delete(
  "/v1/delete-supplier/:id",
  middlewares.authenticate,
  supplierController.handleDeleteSupplier
);
// ------------------- Define Routes Product ------------------- //

// ------------------- Define Routes Product ------------------- //
app.get("/v1/purchase",
  middlewares.authenticate,
  purchaseController.getAllPurchase);
app.get(
  "/v1/purchase/:id",
  middlewares.authenticate,
  purchaseController.getPurchaseById
);
app.get(
  "/v1/purchase-laporan",
  middlewares.authenticate,
  purchaseController.getPurchaseLaporan
);
app.post(
  "/v1/purchase-create",
  middlewares.authenticate,
  purchaseController.createPurchase
);
app.put(
  "/v1/update-purchase/:id",
  middlewares.authenticate,
  purchaseController.updatePurchaseById
);
app.delete(
  "/v1/delete-purchase/:id",
  middlewares.authenticate,
  purchaseController.deletePurchaseById
);
// ------------------- Define Routes Product ------------------- //

// ------------------- Define Routes Product ------------------- //
app.get(
  "/v1/sales-transaction",
  middlewares.authenticate,
  salesTransactionController.getAllSalesTransaction
);
app.get(
  "/v1/sales-transaction/:id",
  middlewares.authenticate,
  salesTransactionController.getSalesTransactionById
);
app.get(
  "/v1/sales-transaction-laporan",
  middlewares.authenticate,
  salesTransactionController.getSalesTransactionLaporan
);
app.post(
  "/v1/sales-transaction/create",
  middlewares.authenticate,
  salesTransactionController.createSalesTransaction
);
app.put(
  "/v1/sales-transaction/:id",
  middlewares.authenticate,
  salesTransactionController.updateSalesTransactionById
);
app.delete(
  "/v1/sales-transaction/delete/:id",
  middlewares.authenticate,
  salesTransactionController.deleteSalesTransactionById
);
// ------------------- Define Routes Product ------------------- //

// ------------------- Listen Server ------------------- //
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      process.env.PORT || PORT
    }`
  );
});
// ------------------- End Listen Server ------------------- //