// src/schema/reviewschema.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewContent: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool', // Reference to the Tool model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
