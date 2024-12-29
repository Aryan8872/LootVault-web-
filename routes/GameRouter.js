const express = require("express");
const router = express.Router();
const {
  findAllGames,
  findGamesById,

  addGame,

  deleteGameById,

  updateGameById

} = require("../config/controller/ProductController");


// Game routes
router.get("/", findAllGames);
router.post("/add", addGame); 
router.get("/:id", findGamesById); 
router.delete("/:id", deleteGameById);
router.patch("/:id", updateGameById); 


module.exports = router;
