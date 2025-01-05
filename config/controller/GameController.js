const { upload } = require("./ProductController");

const findAllGames =  async (req, res) => {
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
      const game = await Game.findById(id);
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
    // Use multer's upload.single middleware to handle file uploads
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const { gameName, gamePrice, gameDescription, gamePlatform, gameType } = req.body;
  
        // Check if all required fields are provided
        if (!gameName || !gamePrice || !gameDescription) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        // Prepare the product data object, including the image path if uploaded
        const gameData = {
          gameName,
          gamePrice: parseFloat(gamePrice), // Make sure to convert price to a number
          gameDescription,
          gamePlatform,
          gameType
        };
  
        // If there's an uploaded file, set the image path
        if (req.file) {
          gameData.gameImagePath = `/uploads/${req.file.filename}`; // Save the image path
        }
  
        const newGame = new gameModel(gameData);
  
        const savedProduct = await newGame.save();
  
        res.status(201).json(savedProduct);
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  };
  
  
  const updateGameById = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      try {
        const updateData = { ...req.body };
        if (req.file) {
          updateData.imagePath = `/uploads/${req.file.filename}`; // Save the image path
        }
  
        const updatedProduct = await gameModel.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true } // Return the updated document
        );
  
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
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
  
  
  const advancedSearchGames =  async (req, res) => {
    try {
        const {
            q,
            minPrice,
            maxPrice,
            gameType,
            platform,
            page = 1,
            limit = 5,
            sortBy = "gamePrice",
            order = "asc"
        } = req.query;
  
        // Build the search query
        const searchQuery = {};
  
        // Text search across multiple fields
        if (q) {
            searchQuery.$or = [
                { gameName: { $regex: q, $options: 'i' } },
                { gameDescription: { $regex: q, $options: 'i' } }
            ];
        }
  
        // Price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            searchQuery.gamePrice = {};
            if (minPrice !== undefined) searchQuery.gamePrice.$gte = parseFloat(minPrice);
            if (maxPrice !== undefined) searchQuery.gamePrice.$lte = parseFloat(maxPrice);
        }
  
        // Game type filter
        if (gameType) {
            searchQuery.gameType = { $regex: gameType, $options: 'i' };
        }
  
        // Platform filter
        if (platform) {
            searchQuery.gamePlatform = { $regex: platform, $options: 'i' };
        }
  
        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;
  
        // Execute search with filters, sorting, and pagination
        const games = await gameModel.find(searchQuery)
            .sort(sortOptions)
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));
  
        // Get total count for pagination
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