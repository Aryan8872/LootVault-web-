const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const productModel = require('../../models/ProductModel');

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for image uploads
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
  }
};

// Initialize multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

// Controller to find all products
const findAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to find a product by ID
const findProductById = async (req, res) => {
  try {
    const productById = await productModel.findById(req.params.id);
    if (!productById) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(productById);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to add a new product, including image upload
const addProduct = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const productData = {
        ...req.body,
      };

      if (req.file) {
        productData.imagePath = `/uploads/${req.file.filename}`; // Save the image path
      }

      const newProduct = new productModel(productData);
      const savedProduct = await newProduct.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

// Controller to update a product by ID, including image upload
const updateProductById = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.imagePath = `/uploads/${req.file.filename}`; // Save the image path
      }

      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true } // Return the updated document
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

// Controller to delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  findAllProducts,
  findProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
