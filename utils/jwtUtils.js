const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_JWT_SECRET;

if (!secretKey) {
    throw new Error("ACcESS_JWT_SECRET is not defined in the environment variables.");
}

exports.generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
