import { userModel } from "../../models/UserModel";
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const jwt = require("../../utils/jwtUtils");

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Updated return types for Express
export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const findByid = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const userById = await userModel.findById(id);
        if (!userById) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userById);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


export const findUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Extract the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // Bearer token

        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        // Step 2: Decode the token to get user data (usually the user ID or _id)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET as string); 
            console.log(`decoded:`, decoded); // Log to inspect the decoded payload
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        // Step 3: Get the user ID from the decoded token
        const userId = decoded.id; // Assuming the decoded token contains userId (you can adjust based on your token structure)
        
        // Step 4: Validate if the userId is a valid MongoDB ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "Invalid user ID formatawdaw" });
            return;
        }

        // Step 5: Find the user in the database using the decoded userId
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Step 6: Send the user data as a response
        res.json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.username, // Add any other user fields here
            },
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const deleteByid = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully", data: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateUserbyid = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
export const uploadImage = async (req: MulterRequest, res: Response):Promise<void> => {
  console.log('Request received:', req.body);
  console.log('File received:', req.file);

  if (!req.file) {
     res.status(400).send({ message: "Please upload a file" });
     return
  }

  res.status(200).json({
    success: true,
    filename: req.file.filename,
  });
};

  