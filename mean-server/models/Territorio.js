const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    Fecha: {
        type: String,
        required: true,
        unique: true
    },
    Territorios: {
        type: Array
    }
});

module.exports = mongoose.model('territorios', PostSchema);
