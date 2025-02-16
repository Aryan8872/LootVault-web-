const gameCategoryModel = require("../../models/GameCategory")


const getAllCategories=async (req,res)=> {
 const categories = await gameCategoryModel.find();
 console.log(categories)
 if (!categories) {
    return res.status(404).json({ message: 'no categories found' });
  }

  return res.status(200).json(categories)
  
}

module.exports = getAllCategories