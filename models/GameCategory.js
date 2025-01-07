const mongoose = require('mongoose');

const gameCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness
    }
});

const gameCategoryModel = mongoose.model('GameCategory', gameCategorySchema);

module.exports = gameCategoryModel;
