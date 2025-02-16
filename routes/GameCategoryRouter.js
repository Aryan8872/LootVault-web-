const express = require("express")
const router = express.Router()

const getAllCategories = require("../config/controller/GameCategoryController")


router.get("/all",getAllCategories)

module.exports = router;