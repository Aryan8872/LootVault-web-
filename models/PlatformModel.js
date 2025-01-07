const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    platformName: {
        type: String,
        required: true,
        unique: true // Ensure platform names are unique
    }
});

const platformModel = mongoose.model('Platform', platformSchema);

module.exports = platformModel;
