const { upload } = require("./ProductController");

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

  module.exports={
    findGiftCardById,
    addGiftCard,
    deleteGiftCardById,
    findAllGiftCard,
    updateGiftCardById
  }