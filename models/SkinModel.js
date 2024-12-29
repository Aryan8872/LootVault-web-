const mongoose = require('mongoose');
const productCategory = require('./ProductCategory');

const skinSchema = new mongoose.Schema({
    skinName: {
        type: String,
        required: true
    },

    skinPrice: {
        type: Number, // Use Number instead of Int16Array
        required: true
    },

    skinDescription: {
        type: String,
        required: true
    },

    skinImagePath: {
        type: String,
        required: true
    },
    skinPlatform:{
        type:String,
        required:true
    }
    , skinType:{
        type:String,
        required:true
    }

    // productCategory: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: productCategory, 
    //     required: true
    // }
});

const skinModel = mongoose.model('Game', skinSchema);

module.exports = skinModel;
