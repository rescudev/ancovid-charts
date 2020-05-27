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
    CCAAs: {
        type: Array
    }
});

module.exports = mongoose.model('hospitalizados', PostSchema);
