const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectdb = require("./config/db");
const userRoute = require("./routes/CustomerRouter");
const GameRouter = require("./routes/GameRouter");
const skinRouter = require("./routes/SkinsRouter");
const GiftCardRouter = require('./routes/GiftCardRouter');
const authRoute = require("./routes/authRoute");
const authenticateToken = require("./middlewares/authMiddleWare");
const seedDatabase = require("./scripts/seed");

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

// Secure routes for products
app.use("/api/game", authenticateToken, GameRouter);
app.use("/api/skins", authenticateToken, skinRouter);
app.use("/api/giftcard", authenticateToken, GiftCardRouter);

// Root route handler
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
