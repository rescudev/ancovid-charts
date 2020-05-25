const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Fecha: {
        type: String,
        required: true,
        unique: true
    },
    ANHosp: {
        type: Number,
        required: true
    },
    ALHosp: {
        type: Number,
        required: true
    },
    ALUCI: {
        type: Number,
        required: true
    },
    CAHosp: {
        type: Number,
        required: true
    },
    CAUCI: {
        type: Number,
        required: true
    },
    COHosp: {
        type: Number,
        required: true
    },
    COUCI: {
        type: Number,
        required: true
    },
    GRHosp: {
        type: Number,
        required: true
    },
    GRUCI: {
        type: Number,
        required: true
    },
    HUHosp: {
        type: Number,
        required: true
    },
    HUUCI: {
        type: Number,
        required: true
    },
    JAHosp: {
        type: Number,
        required: true
    },
    JAUCI: {
        type: Number,
        required: true
    },
    MAHosp: {
        type: Number,
        required: true
    },
    MAUCI: {
        type: Number,
        required: true
    },
    SEHosp: {
        type: Number,
        required: true
    },
    SEUCI: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('prevalencias', PostSchema);
