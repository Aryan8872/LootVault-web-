    const mongoose = require('mongoose');

    const skinSchema = new mongoose.Schema({
        skinName: {
            type: String,
            required: true
        },
        skinPrice: {
            type: Number,
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
        skinPlatform: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Platform',
            required: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GameCategory',
            required: true
        }
    });

    const skinModel = mongoose.model('Skin', skinSchema);

    module.exports = skinModel;
