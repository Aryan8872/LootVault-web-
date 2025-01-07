const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const jwt = require("../utils/jwtUtils");

let refreshTokens = []; // Store refresh tokens temporarily (use a database in production)

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const tokens = await authService.login(email, password);
        refreshTokens.push(tokens.refreshtoken); // Save refresh token
        res.status(200).json(tokens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/refresh", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    try {
        const payload = jwt.verifyRefreshToken(refreshToken); // Verify refresh token
        const newAccessToken = jwt.generateAccessToken({ id: payload.id });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
});

router.post("/logout", (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken); // Remove the token
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
