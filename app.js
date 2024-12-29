const express = require("express");
const connectdb = require("./config/db");
const userRoute = require("./routes/CustomerRouter"); // Ensure this file exists and is correctly named

const app = express();

// Connect to the database
connectdb();

// Middleware for parsing JSON
app.use(express.json());

// Serve static files (e.g., images)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userRoute);

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
