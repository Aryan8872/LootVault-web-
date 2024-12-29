const mongoose = require('mongoose');
const productCategory = require('./ProductCategory');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number, // Use Number instead of Int16Array
        required: true
    },

    productDescription: {
        type: String,
        required: true
    },

    productImagePath: {
        type: String,
        required: true
    },

    // productCategory: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: productCategory, 
    //     required: true
    // }
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
