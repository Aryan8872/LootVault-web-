const mongoose = require('mongoose');

const giftCardCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});

const giftCardCategoryModel = mongoose.model('GiftCardCategory', giftCardCategorySchema);

module.exports = giftCardCategoryModel;
