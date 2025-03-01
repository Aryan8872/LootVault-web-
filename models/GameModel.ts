import mongoose from "mongoose";


interface IGame extends Document {
    gameName: string;
    gamePrice: string;
    gameDescription: string;
    gameImagePath: string;
    gamePlatform: mongoose.Schema.Types.ObjectId;
    category: string;
  }


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
        required: false
    },
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameCategory',
        required: true
    },
    gamePlatform:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true
    },
    
});

const gameModel:mongoose.Model<IGame> = mongoose.model<IGame>('Game', gameSchema);

module.exports = gameModel;
