import express from "express";
import { findAll, findByid, deleteByid, updateUserbyid, uploadImage, findUser } from "../config/controller/CustomerController";

import upload from "../config/controller/ProductController";
import authenticateToken from "../middlewares/authMiddleWare";

const router = express.Router();

// Routes
router.get("/", findAll);
router.get("/:id", findByid);
router.delete("/:id", deleteByid);
router.patch("/:id", updateUserbyid);
router.get("/getUser",findUser)

// Correct file upload handling
router.post("/uploadImage", upload, uploadImage); // Use `upload.single('image')` to handle the file upload.

module.exports = router;
