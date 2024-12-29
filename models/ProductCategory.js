const mongoose = require('mongoose')


const productCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    }
})

const productCategory = mongoose.model("ProductCategory",productCategorySchema)

module.exports = productCategory;