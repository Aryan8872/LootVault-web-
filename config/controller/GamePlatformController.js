const platformModel = require("../../models/PlatformModel");


const getAllPlatform=async (req,res)=> {
 const platfrom = await platformModel.find();
 if (!platfrom) {
    return res.status(404).json({ message: 'no categories found' });
  }

  return res.status(200).json(platfrom)
  
}

module.exports = getAllPlatform