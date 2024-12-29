const express = require("express");
const router = express.Router();
const {
    findAllGiftCard,
    findGiftCardById,

    addGiftCard,

    deleteGiftCardById,
    updateGiftCardById

} = require("../config/controller/ProductController");


// Game routes
router.get("/", findAllGiftCard); // GET all products
router.post("/add", addGiftCard); // POST new product
router.get("/:id", findGiftCardById); // GET product by ID
router.delete("/:id", deleteGiftCardById); // DELETE product by ID
router.patch("/:id", updateGiftCardById); // UPDATE product by ID


module.exports = router;
