const { upload } = require("./ProductController")

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
    updateSkinsById,
    findSkinsById,
    addSkin,
    deleteSkinsById,
    findAllSkins


  }