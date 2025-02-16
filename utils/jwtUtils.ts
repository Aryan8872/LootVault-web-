import jwt from "jsonwebtoken";

const secretAccessKey = process.env.ACCESS_JWT_SECRET;
const secretRefreshKey = process.env.REFRESH_JWT_SECRET;

// Ensure the secret keys exist
if (!secretAccessKey) {
    throw new Error("ACCESS_JWT_SECRET is not defined in the environment variables.");
}

if (!secretRefreshKey) {
    throw new Error("REFRESH_JWT_SECRET is not defined in the environment variables.");
}

// Define token payload interface for TypeScript
interface TokenPayload {
    id: string;
    role: string;
}

// Generate Access Token (Expires in 15 minutes)
export const generateAccessToken = (payload: TokenPayload): string => {
    // console.log(payload)
    return jwt.sign(payload, secretAccessKey, { expiresIn: "2m" });
};

// Generate Refresh Token (Expires in 7 days for better security)
export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, secretRefreshKey, { expiresIn: "7d" });
};

// Verify Access Token Safely
export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, secretAccessKey) as TokenPayload;
    } catch (error) {
        console.error("Invalid Access Token:", error);
        return null;
    }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, secretRefreshKey) as TokenPayload;
    } catch (error) {
        console.error("Invalid Access Token:", error);
        return null;
    }
};
