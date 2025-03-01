const skinModel = require("../../models/SkinModel")
const upload = require("../../middlewares/uploads");


const addSkin = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { skinName, skinPrice, skinDescription,skinImagePath, category,skinPlatform } = req.body;

      // Validate required fields
      if (!skinName || !skinPrice || !skinDescription) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newSkinData = {
        skinName,
        skinPrice: parseFloat(skinPrice),
        skinDescription,
        skinPlatform,
        category,
      };

      // If an image is uploaded, set the image path
      if (req.file) {
        newSkinData.skinImagePath = req.file.filename;
      }else if (skinImagePath) {
        // Flutter: Image is sent as filename
        newSkinData.skinImagePath = skinImagePath;
      }

      // Create and save the new skin
      const newSkin = new skinModel(newSkinData);
      const savedSkin = await newSkin.save();

      res.status(201).json(savedSkin);
    } catch (error) {
      console.error("Error creating skin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};



  
  const findSkinsById = async (req,res) => {
    try{
      const cardData = await skinModel.findById(req.params.id).populate('skinPlatform', 'platformName').populate('category', 'categoryName');
  
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
  
  const findAllSkins = async (req,res) => {
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
    updateSkinsById,
    findSkinsById,
    addSkin,
    deleteSkinsById,
    findAllSkins


  }