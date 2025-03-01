const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const jwt = require("../utils/jwtUtils");
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import { userModel } from "../models/UserModel";
import authenticateToken from "../middlewares/authMiddleWare";
import { MulterError } from "multer";
const upload = require("../middlewares/uploads")

let refreshTokens: string[] = []; // Store refresh tokens temporarily (use a database in production)
const secretAccessKey = process.env.ACCESS_JWT_SECRET;
const secretRefreshKey = process.env.REFRESH_JWT_SECRET;
console.log(typeof authenticateToken); // Should print "function"

interface userPayload {
    fullName: string;
    email: string;
    username: string;
    phoneNo: string;
    password: string;
}

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const { user, tokens } = await authService.login(email, password);
        
        refreshTokens.push(tokens.refreshtoken);
        
        res.status(200).json({
            accessToken: tokens.accesstoken,
            refreshToken: tokens.refreshtoken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/register",  async (req: Request, res: Response) => {
    try {
      upload(req, res, async (err:Error |MulterError) => {
        if (err) {
          console.log(`Error occurred while uploading image: ${err}`);
          return res.status(500).json({ message: 'Image upload failed' });
        }
  
        const { fullName, email, username, phoneNo, password, role, image } = req.body;
  
        // Check if all required fields are provided  
        if (!fullName || !email || !username || !phoneNo || !password) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Prepare the user data object
        const userData:any = {
          fullName,
          email,
          username,
          phoneNo,
          password: hashedPassword,
          role:"buyer",
        };
  
        // Handle Image Path for Web and Flutter
        if (req.file) {
          userData.image = req.file.filename;
        } else if (image) {
          userData.image = image;
        }
  
        // Save to database
        const newUser = new userModel(userData);
        const savedUser = await newUser.save();
  
        res.status(201).json(savedUser);
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user" });
    }
});

router.post("/logout", (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json({ message: "Logged out successfully" });
});

router.put("/:id", (req: Request, res: Response) => {
    try {
        console.log(`update vitra ko id ${req.params.id}`)
      upload(req, res, async (err:Error|MulterError) => {
        if (err) {
          console.log(`Error occurred while uploading image: ${err}`);
          return res.status(500).json({ message: 'Image upload failed' });
        }
  
        const { id } = req.params; // Get the userId from the URL
        const { fullName, email, username, phoneNo, password, role, image } = req.body;
  
        // Find the user by ID
        const user = await userModel.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Optionally hash the password if it is provided
        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }
  
        // Update fields if provided
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.phoneNo = phoneNo || user.phoneNo;
        user.role = role || user.role;
  
        // Handle Image Path for Web and Flutter
        if (req.file) {
          user.image = req.file.filename;
        } else if (image) {
          user.image = image;
        }
  
        // Save updated user
        const updatedUser = await user.save();
  
        res.status(200).json(updatedUser);
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
export default router;
