const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const jwt = require("../utils/jwtUtils");
import { Request,Response } from "express";
const bcrypt = require("bcrypt")
import { userModel } from "../models/UserModel";
import authenticateToken from "../middlewares/authMiddleWare";
let refreshTokens:string[] = []; // Store refresh tokens temporarily (use a database in production)
const secretAccessKey = process.env.ACCESS_JWT_SECRET;
const secretRefreshKey = process.env.REFRESH_JWT_SECRET;
console.log(typeof authenticateToken); // Should print "function"

interface userPayload{
    fullName:string,
    email:string,
    username:string,
    phoneNo:string,
    password:string
}
interface AuthRequest extends Request {
    user?: {
        id: string;
        email:string;
        role: string;
    };
}
router.post("/login", async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;
    
        // Authenticate user and get user data and tokens
        const { user, tokens } = await authService.login(email, password);
    
        // Save refresh token
        refreshTokens.push(tokens.refreshtoken);
    
        // Respond with tokens and user data, including the role
        res.status(200).json({
          accessToken: tokens.accesstoken,
          refreshToken: tokens.refreshtoken,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,  // Make sure role is included
          },
        });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
});
router.post("/register", async(req:Request,res:Response)=>{
    try {
        const salt = await bcrypt.genSalt();
        const { fullName, email, username, phoneNo, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            fullName,
            email,
            username,
            phoneNo,
            password: hashedPassword,
            role: "buyer", // Ensure default role is buyer
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error registering user" });
    }
}
);

router.post("/apply-for-seller", authenticateToken, async (req: Request, res: Response) => {
    try {
        // Explicitly cast req as AuthRequest
        const authReq = req as AuthRequest;
        const userEmail = authReq.user?.id; // Get email from the JWT token

        if (!userEmail) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // Find the user by email and update their role
        const updatedUser = await userModel.findOneAndUpdate(
            { email: userEmail }, // Search by email instead of _id
            { role: "seller" },    // Change role to seller
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Role updated to seller", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating role" });
    }
});


router.post("/refresh", (req:Request, res:Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
    }
    console.log(refreshToken)

    try {
        const payload = jwt.verifyRefreshToken(refreshToken); 
        console.log("Payload Object:", JSON.stringify(payload));
        const newAccessToken = jwt.generateRefreshToken(
            { id: payload.id },
            secretRefreshKey,
            { expiresIn: "15m" }
        );    
        console.log("New Access Token Generated:", newAccessToken);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
    
});

router.post("/logout", (req:Request, res:Response) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken); // Remove the token
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;
