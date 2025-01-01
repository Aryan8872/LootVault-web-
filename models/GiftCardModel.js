const mongoose = require('mongoose');
const productCategory = require('./ProductCategory');

const giftcardSchema = new mongoose.Schema({
    giftcardName: {
        type: String,
        required: true
    },

    giftcardPrice: {
        type: Number, 
        required: true
    },

    giftcardDescription: {
        type: String,
        required: true
    },

    giftcardImagePath: {
        type: String,
        required: true
    },
    giftcardPlatform:{
        type:String,
        required:true 
    }
    , giftcardType:{
        type:String,
        required:true
    }

    // productCategory: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: productCategory, 
    //     required: true
    // }
});

const giftcardModel = mongoose.model('GiftCard', giftcardSchema);

module.exports = giftcardModel;
