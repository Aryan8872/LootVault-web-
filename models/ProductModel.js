const mongoose = require('mongoose')
const productCategory = require('./ProductCategory')


const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },

    productPrice:{
        type:int,
        required:true

    },
    productDescription:{
        type:Text,
        required:true

    },
    productImagePath:{
        type:String,
        required:true
    },
    productCategory:{
        type:productCategory,
        required:true
    }

})

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel;