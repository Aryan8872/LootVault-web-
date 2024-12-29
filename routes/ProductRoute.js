const express = require("express");
const router = express.Router();
const {
  findAllProducts, // Match these names with the controller exports
  addProduct,
  findProductById,
  deleteProductById,
  updateProductById,
} = require("../config/controller/ProductController");

router.get("/", findAllProducts); // GET all products
router.post("/add", addProduct); // POST new product
router.get("/:id", findProductById); // GET product by ID
router.delete("/:id", deleteProductById); // DELETE product by ID
router.patch("/:id", updateProductById); // UPDATE product by ID

module.exports = router;
