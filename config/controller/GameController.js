const gameModel = require("../../models/GameModel");
const skinModel = require("../../models/SkinModel");

const upload = require("../../middlewares/uploads");
const { default: mongoose } = require("mongoose");

const findAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || "gamePrice";
    const order = req.query.order || "desc";
    const category = req.query.category;

    const query = {};
    if (category) {
      query.category = category;
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const games = await gameModel.find(query)
      .populate("category", "categoryName")
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    const total = await gameModel.countDocuments(query);

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      games,
    };
    console.log(response)
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}


// Controller to find a product by ID
const findGamesById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const game = await gameModel.findById(id).populate('gamePlatform', 'platformName').populate('category', 'categoryName');
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const addGame = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(`Error occurred while saving game: ${err}`);
        return res.status(500).json({ message: 'Image upload failed' });
      }
      console.log(req.body)

      const { gameName, gamePrice, gameDescription, gamePlatform, gameType, popularity, category, gameImagePath } = req.body;

      // Check if all required fields are provided  
      if (!gameName || !gamePrice || !gameDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Prepare the game data object
      const gameData = {
        gameName,
        gamePrice: parseFloat(gamePrice), // Convert price to a number
        gameDescription,
        gamePlatform,
        gameType,
        popularity,
        category,
      };

      // Handle Image Path for Web and Flutter
      if (req.file) {
        // Web: File is uploaded
        gameData.gameImagePath = req.file.filename;
      } else if (gameImagePath) {
        // Flutter: Image is sent as filename
        gameData.gameImagePath = gameImagePath;
      }

      // Save to database
      const newGame = new gameModel(gameData);
      const savedGame = await newGame.save();

      res.status(201).json(savedGame);
    });
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const updateGameById = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(`Error occurred while uploading image: ${err}`);
        return res.status(500).json({ message: 'Image upload failed' });
      }

      // Log the body for debugging
      console.log('Updated request body:', req.body);

      const { gameName, gamePrice, gameDescription, gamePlatform, category, gameImagePath } = req.body;

      // Check if all required fields are provided  
      if (!gameName || !gamePrice || !gameDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Prepare the game data object
      const updateData = {
        gameName,
        gamePrice: parseFloat(gamePrice), // Convert price to a number
        gameDescription,
        gamePlatform,
        category,
      };

      // Handle Image Path for Web and Flutter
      if (req.file) {
        // If new image uploaded, use the new image path
        updateData.gameImagePath = req.file.filename;
      } else if (gameImagePath) {
        // Flutter: If no new image uploaded, use the existing image path
        updateData.gameImagePath = gameImagePath;
      }

      // Perform the database update
      const updatedGame = await gameModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true } // Return the updated document
      );

      if (!updatedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }

      // Respond with the updated product
      res.status(200).json(updatedGame);
    });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Controller to delete a product by ID
const deleteGameById = async (req, res) => {
  try {
    const deletedProduct = await gameModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const searchGames = async (req, res) => {
  try {
    const { q, page = 1, limit = 5 } = req.query;

    if (!q) {
      return res.status(400).json({
        error: true,
        message: "Search query is required"
      });
    }

    const searchQuery = {
      $or: [
        { gameName: { $regex: q, $options: 'i' } },
        { gameDescription: { $regex: q, $options: 'i' } },
        { gamePlatform: { $regex: q, $options: 'i' } },
        { gameType: { $regex: q, $options: 'i' } }
      ]
    };

    const games = await gameModel.find(searchQuery)
      .populate("category", "categoryName")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await gameModel.countDocuments(searchQuery);

    const totalPages = Math.ceil(total / parseInt(limit));
    const hasMore = page < totalPages;

    res.status(200).json({
      error: false,
      total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      hasMore,
      games
    });

  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({
      error: true,
      message: "Error performing search"
    });
  }
};



const advancedSearchGames = async (req, res) => {
  try {
    const {
      q,
      minPrice,
      maxPrice,
      category,
      platform,
      page = 1,
      limit = 10,
      sortBy = "gamePrice",
      order = "asc",
      type, // "game", "skin", or both
    } = req.query;

    const searchQuery = {};
    const priceField = type === "skin" ? "skinPrice" : "gamePrice";

    // Text search
    if (q) {
      searchQuery.$or = [
        { gameName: { $regex: q, $options: 'i' } },
        { gameDescription: { $regex: q, $options: 'i' } },
        { skinName: { $regex: q, $options: 'i' } },
        { skinDescription: { $regex: q, $options: 'i' } },
      ];
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      searchQuery[priceField] = {};
      if (minPrice !== undefined) searchQuery[priceField].$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) searchQuery[priceField].$lte = parseFloat(maxPrice);
    }

    // Category filter
    if (category) {
      const categoriesArray = category.split(",");
      if (categoriesArray.every(id => mongoose.Types.ObjectId.isValid(id))) {
        searchQuery.category = { $in: categoriesArray.map(id => new mongoose.Types.ObjectId(id)) };
      }
    }

    // Platform filter
    if (platform && mongoose.Types.ObjectId.isValid(platform)) {
      searchQuery.gamePlatform = new mongoose.Types.ObjectId(platform);
      searchQuery.skinPlatform = new mongoose.Types.ObjectId(platform);
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Fetch Games
    let games = [];
    let skins = [];
  
      games = await gameModel.find(searchQuery)
        .populate("category", "categoryName")
        .populate("gamePlatform", "platformName")
        .sort(sortOptions)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit));
    
   
      skins = await skinModel.find(searchQuery)
        .populate("category", "categoryName")
        .populate("skinPlatform", "platformName")
        .sort(sortOptions)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit));
    

    // Combine Results
    const results = [...games, ...skins];
    console.log(`results ${results}`)
    results.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * (order === 'asc' ? 1 : -1));

    res.status(200).json({
      error: false,
      total: results.length,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      games: results,
    });

  } catch (err) {
    console.error('Advanced search error:', err);
    res.status(500).json({
      error: true,
      message: "Error performing advanced search"
    });
  }
};




module.exports = {
  findAllGames,
  searchGames,
  findGamesById,
  advancedSearchGames,
  addGame,
  updateGameById,
  deleteGameById,

}