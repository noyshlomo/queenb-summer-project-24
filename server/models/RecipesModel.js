const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    imgLink: {
        type: String,
        required: true
    },
    submissionTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    prepSteps: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    userId: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);