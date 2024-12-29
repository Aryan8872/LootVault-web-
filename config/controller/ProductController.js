const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const gameModel = require('../../models/GameModel');
const giftcardModel = require('../../models/GiftCardModel');
const skinModel = require('../../models/SkinModel');

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



/////////////////////////////////////////////////////////////////////////Game Controller //////////////////////////////////
const findAllGames = async (req, res) => {
  try {
    const games = await gameModel.find();
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to find a product by ID
const findGamesById = async (req, res) => {
  try {
    const gameById = await gameModel.findById(req.params.id);
    if (!gameById) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(gameById);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addGame = async (req, res) => {
  // Use multer's upload.single middleware to handle file uploads
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { gameName, gamePrice, gameDescription, gamePlatform, gameType } = req.body;

      // Check if all required fields are provided
      if (!gameName || !gamePrice || !gameDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Prepare the product data object, including the image path if uploaded
      const gameData = {
        gameName,
        gamePrice: parseFloat(gamePrice), // Make sure to convert price to a number
        gameDescription,
        gamePlatform,
        gameType
      };

      // If there's an uploaded file, set the image path
      if (req.file) {
        gameData.gameImagePath = `/uploads/${req.file.filename}`; // Save the image path
      }

      const newGame = new gameModel(gameData);

      const savedProduct = await newGame.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};


const updateGameById = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.imagePath = `/uploads/${req.file.filename}`; // Save the image path
      }

      const updatedProduct = await gameModel.findByIdAndUpdate(
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
const deleteGameById = async (req, res) => {
  try {
    const deletedProduct = await gameModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//////////////////////////////////////////////////////////////////////////////GiftCardController/////////////////////////////////////////////////
const addGiftCard = async (req,res) => {

  upload.single('image')(req, res, async (err) => {

    if (err) {
      console.log(`errror occured while saving card + ${err}`)
    }

    try {

      const { cardName, cardPrice, platform, type, imagePath } = req.body;

      if (!cardName || !cardPrice || !platform || !type) {
        console.log("missing fields")
      }

      const cardData = {
        cardName,
        cardPrice,
        platform,
        type
      }

      if (req.file) {
        cardData.imagePath = `/uploads/${req.file.filename}`
      }
      //saving data to model 
      const newCard = giftcardModel(data);
      const savedCard = newCard.save();

      res.status(201).json(savedCard)
    }
    catch (e) {
      console.log(e)
    }


  }
  )
}



const findGiftCardById = async (req,res) => {
  try{
    const cardData = await giftcardModel.findById(req.params.id);

    if(!cardData){
      return res.status(404).json({message:`Card not found with id: ${req.params.id} `})
    }
    res.status(201).json(cardData)
  }
  catch(e){
    console.log(e)

  }
}

const updateGiftCardById = async (req,res) => {
  upload.single(req,res,async(err)=>{

    if(err){
      return res.status(400).json({message:err})
    }

    try{
      const updatedCardData = {...req.body}

      if(req.file){
        updatedCardData.imagePath = `/uploads/${req.file.filename}`
      }

      const updatedCard = giftcardModel.findByIdAndUpdate(req.params.id,updatedCardData,{new:true})

      if (!updatedCard) {
        return res.status(404).json({ message: 'Product not found' });
      }

    }catch(e){
      console.log(e)
    }

  })

}

const findAllGiftCard = async (req,res) => {
  try {
    const products = await giftcardModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const deleteGiftCardById = async (req,res) => {
  try {
    const deletedProduct = await giftcardModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}


//////////////////////////////////////////////////////////////////////////////// Skins controller//////////////////////////////////////

const addSkin = async (req,res) => {
  upload.single(req,res,async(err)=>{

    if(err){
      return res.status(400).json({message:err})
    }

    try{
      const updatedCardData = {...req.body}

      if(req.file){
        updatedCardData.imagePath = `/uploads/${req.file.filename}`
      }

      const updatedCard = giftcardModel.findByIdAndUpdate(req.params.id,updatedCardData,{new:true})

      if (!updatedCard) {
        return res.status(404).json({ message: 'Product not found' });
      }

    }catch(e){
      console.log(e)
    }

  })

}

const findSkinsById = async (req,res) => {
  try{
    const cardData = await giftcardModel.findById(req.params.id);

    if(!cardData){
      return res.status(404).json({message:`Card not found with id: ${req.params.id} `})
    }
    res.status(201).json(cardData)
  }
  catch(e){
    console.log(e)

  }

}

const updateSkinsById = async (req,res) => {
  upload.single(req,res,async(err)=>{

    if(err){
      return res.status(400).json({message:err})
    }

    try{
      const updatedCardData = {...req.body}

      if(req.file){
        updatedCardData.imagePath = `/uploads/${req.file.filename}`
      }

      const updatedCard = skinModel.findByIdAndUpdate(req.params.id,updatedCardData,{new:true})

      if (!updatedCard) {
        return res.status(404).json({ message: 'Product not found' });
      }

    }catch(e){
      console.log(e)
    }

  })

}

const findAllSkins = async () => {
  try {
    const products = await skinModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}

const deleteSkinsById = async (req,res) => {
  try {
    const deletedProduct = await skinModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}


module.exports = {
  findAllGames,
  findAllGiftCard,
  findAllSkins,

  findGamesById,
  findGiftCardById,
  findSkinsById,

  addGame,
  addGiftCard,
  addSkin,

  updateGameById,
  updateGiftCardById,
  updateSkinsById,

  deleteGameById,
  deleteGiftCardById,
  deleteSkinsById
};
