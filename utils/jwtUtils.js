const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.ACCESS_JWT_SECRET;
const secretRefreshKey = process.env.REFRESH_JWT_SECRET;
if (!secretAccessKey) {
    throw new Error("ACcESS_JWT_SECRET is not defined in the environment variables.");
}

if (!secretRefreshKey) {
    throw new Error("REFRESH_JWT_SECRET is not defined in the environment variables.");
}

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, secretAccessKey, { expiresIn: '15m' });
};
exports.generateRefreshToken = (payload)=>{
    return jwt.sign(payload, secretRefreshKey);

}

exports.verifyAccessToken = (token) => {
    return jwt.verify(token, secretAccessKey);
};
