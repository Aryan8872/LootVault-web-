const mongoose = require('mongoose');
const productCategory = require('./ProductCategory');

const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },

    gamePrice: {
        type: Number, // Use Number instead of Int16Array
        required: true
    },

    gameDescription: {
        type: String,
        required: true
    },

    gameImagePath: {
        type: String,
        required: true
    },
    gamePlatform:{
        type:String,
        required:true
    }
    , gameType:{
        type:String,
        required:true
    }

});

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;
