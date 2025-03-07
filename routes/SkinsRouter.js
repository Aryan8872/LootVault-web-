const express = require("express");
const router = express.Router();
const {
    findSkinsById,

    addSkin,

    deleteSkinsById,
    updateSkinsById,
    findAllSkins

} = require("../config/controller/SkinController");


// Game routes
router.get("/", findAllSkins); 
router.post("/add", addSkin); 
router.get("/:id", findSkinsById);
router.delete("/:id", deleteSkinsById); 
router.patch("/:id", updateSkinsById); 


module.exports = router;
