const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    gamePrice: {
        type: Number,
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
    gamePlatform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true
    },
    gameType: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameCategory',
        required: true
    }
});

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;
