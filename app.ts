const express = require("express");
import {Request,Response} from "express"
import path from "path";
const cors = require("cors");
require('dotenv').config();
const connectdb = require("./config/db");
const GameRouter = require("./routes/GameRouter");
const skinRouter = require("./routes/SkinsRouter");
const GiftCardRouter = require('./routes/GiftCardRouter');
const customerRoute = require("./routes/CustomerRouter")
const upload = require("./middlewares/uploads.js")
import authRoute from "./routes/authRoute";
import authenticateToken from "./middlewares/authMiddleWare";
const gameCategoryRouter = require("./routes/GameCategoryRouter")
const gamePlatformRouter = require("./routes/GamePlatformRoute")
// const seedDatabase = require("./scripts/seed");

const app = express();

// Connect to the database
connectdb();


// Middleware for parsing JSON
app.use(express.json());
app.use(cors());


app.use("/api/userData",authenticateToken,customerRoute );

// Routes for auth
app.use("/api/auth",authRoute );

// Serve static files (e.g., images)
app.use("/public/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.get('/api/images/:imageName', (req:Request, res:Response) => {
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
app.use("/api/user",authRoute)
// Secure routes for products
app.use("/api/game",authenticateToken, GameRouter);
app.use("/api/skins", skinRouter);
app.use("/api/giftcard", GiftCardRouter);

//routes for categories 
app.use("/api/category/game",gameCategoryRouter);

//routes for platofrom
app.use("/api/platform/game",gamePlatformRouter);

app.use("/api/customer",upload,(req:Request, res:Response) => {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }
  
    res.send({ message: "File uploaded successfully", file: req.file });
  });

// Root route handler
app.get("/", (req:Request, res:Response) => {
    res.send("Welcome to the API!");
});


// app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/forum", require("./routes/forumRoutes"));


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
