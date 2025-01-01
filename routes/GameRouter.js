const express = require("express");
const router = express.Router();
const {
    findAllGames,
    findGamesById,
    addGame,
    deleteGameById,
    updateGameById,
} = require("../config/controller/ProductController");
const gameModel = require("../models/GameModel");

router.get("/advanced-search", async (req, res) => {
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
});

router.get("/search", async (req, res) => {
    try {
        const { q, page = 1, limit = 5 } = req.query;
        
        if (!q) {
            return res.status(400).json({
                error: true,
                message: "Search query is required"
            });
        }

        // Create a search query using regex for partial matching
        const searchQuery = {
            $or: [
                { gameName: { $regex: q, $options: 'i' } },
                { gameDescription: { $regex: q, $options: 'i' } },
                { gamePlatform: { $regex: q, $options: 'i' } },
                { gameType: { $regex: q, $options: 'i' } }
            ]
        };

        // Execute the search query with pagination
        const games = await gameModel.find(searchQuery)
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await gameModel.countDocuments(searchQuery);

        // Calculate pagination info
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
});

// Main route for getting and sorting games
router.get("/", async (req, res) => {
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
});

// Parameter routes should come last
router.post("/add", addGame);
router.get("/:id", findGamesById);
router.delete("/:id", deleteGameById);
router.patch("/:id", updateGameById);

module.exports = router;