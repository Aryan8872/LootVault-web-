const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectdb = require("./config/db");
const userRoute = require("./routes/CustomerRouter");
const GameRouter = require("./routes/GameRouter");
const skinRouter = require("./routes/SkinsRouter");
const GiftCardRouter = require('./routes/GiftCardRouter');
const authRoute = require("./routes/authRoute");
const gameCategoryRouter = require("./routes/GameCategoryRouter")
const gamePlatformRouter = require("./routes/GamePlatformRoute")

const authenticateToken = require("./middlewares/authMiddleWare");


// const seedDatabase = require("./scripts/seed");

const app = express();

// Connect to the database
connectdb();


// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// Routes for auth
app.use("/api/user", authRoute);

// Serve static files (e.g., images)
app.use("/uploads", express.static("uploads"));

app.get('/api/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images', imageName);

    // Check if the file exists
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send({ error: 'Image not found' });
        }
    });
});

// Secure routes for products
app.use("/api/game", GameRouter);
app.use("/api/skins", authenticateToken, skinRouter);
app.use("/api/giftcard", authenticateToken, GiftCardRouter);

//routes for categories 
app.use("/api/category/game",gameCategoryRouter);

//routes for platofrom
app.use("/api/platform/game",gamePlatformRouter);

// Root route handler
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
