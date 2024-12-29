const express = require("express")
const router = express.Router()


router.get("/",findAllProduct)
router.post("/",createProduct)
router.get(`/:id`,findProductByid)
router.delete(`/:id`,deleteProductByid)
router.patch(`/:id`,updateProductbyid)