import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
const jwtUtil = require("../utils/jwtUtils");

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const tokken = authHeader && authHeader.split(" ")[1]; // Extract token from Authorization header
    console.log(`tokkken ${tokken}`)
    if (!tokken) {
        return res.status(401).json({ message: "Token Required" });
    }

    try {
        // First, try verifying the access token
        const decoded = jwt.verify(tokken, process.env.ACCESS_JWT_SECRET as string) as JwtPayload;
        console.log("Access token verified:", decoded);

        // Attach user to the request (if access token is valid)
        req.user = { id: decoded.id, role: decoded.role };
        return next(); // If valid, proceed to the next middleware or route handler

    } catch (err) {
        console.log(`Access token verification failed: ${err}`);

        // If the access token is expired or invalid, check the refresh token
        if (err instanceof JsonWebTokenError) {
            // Extract refresh token from the Authorization header
 
            // Validate the refresh token using a utility function
            const refreshTokenPayload = jwtUtil.verifyRefreshToken(tokken);

            if (!refreshTokenPayload) {
                return res.status(403).json({ message: "Invalid or Expired Refresh Token" });
            }

            // If refresh token is valid, attach the user info to the request
            req.user = { id: refreshTokenPayload.id, role: refreshTokenPayload.role };

            // Proceed with the next handler (you could issue a new access token if required)
            return next();
        } else {
            // Invalid access token or other errors
            return res.status(403).json({ message: "Invalid Token" });
        }
    }
};

export default authenticateToken;
