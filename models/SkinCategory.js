const mongoose = require('mongoose');

const skinCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});

const skinCategoryModel = mongoose.model('SkinCategory', skinCategorySchema);

module.exports = skinCategoryModel;
