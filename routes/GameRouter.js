const express = require("express");
const router = express.Router();

const gameModel = require("../models/GameModel");
const { advancedSearchGames, 
    searchGames, 
    findAllGames, 
    addGame, 
    findGamesById, 
    deleteGameById, 
    updateGameById } = require("../config/controller/GameController");

router.get("/advanced-search",advancedSearchGames);

router.get("/search", searchGames)

router.get("/",findAllGames );

// Parameter routes should come last
router.post("/add", addGame);
router.get("/:id", findGamesById);
router.delete("/:id", deleteGameById);
router.patch("/:id", updateGameById);

module.exports = router;