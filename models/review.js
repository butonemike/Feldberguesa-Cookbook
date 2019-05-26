var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    recipeId: Number,
    userId: Number,
    reviewBody: String,
    rating: Number,
    dateDeleted: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);