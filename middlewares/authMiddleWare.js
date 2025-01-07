const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.ACCESS_JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) return res.status(401).json({ message: 'Access Token Required' });

    jwt.verify(token, secretAccessKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });
        req.user = user; // Attach user data to the request
        next();
    });
};

module.exports = authenticateToken;
