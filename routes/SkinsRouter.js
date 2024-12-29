const express = require("express");
const router = express.Router();
const {
    findAllSkins,
    findSkinsById,

    addSkin,

    deleteSkinsById,
    updateSkinsById

} = require("../config/controller/ProductController");


// Game routes
router.get("/", findAllSkins); 
router.post("/add", addSkin); 
router.get("/:id", findSkinsById);
router.delete("/:id", deleteSkinsById); 
router.patch("/:id", updateSkinsById); 


module.exports = router;
