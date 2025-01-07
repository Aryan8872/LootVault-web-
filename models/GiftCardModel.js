const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
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
    giftcardPlatform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true
    },
    giftcardType: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GiftCardCategory',
        required: true
    }
});

const giftCardModel = mongoose.model('GiftCard', giftCardSchema);

module.exports = giftCardModel;
