var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: Array,
    instructions: Array,
    skillLevel: String,
    timePrep: Number,
    timeCook: Number,
    timeWait: Number,
    timeTotal: Number,
    servings: Number,
    categories: Array,
    heroImageUrl: String,
    imageUrl: String,
    images: [String],
    rating: Number,
    addedBy: String,
    userId: String,
    deletedAt: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);