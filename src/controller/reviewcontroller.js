// src/controllers/reviewController.js

const Review = require('../schema/reviewschema');
const Tool = require('../schema/tool');

// Controller function to create a new review for a specific tool
exports.createReview = async (req, res) => {
  try {
    const { toolId } = req.params;
    const { reviewContent, rating } = req.body;

    // Validate input data
    if (!reviewContent || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the tool exists
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    // Create a new review
    const review = new Review({
      reviewContent,
      rating,
      productId: toolId,
    });
    await review.save();

    // Optionally add the review to the tool's reviews array
    tool.reviews.push(review._id);
    await tool.save();

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get all reviews for a specific tool
exports.getReviewsByToolId = async (req, res) => {
  try {
    const { toolId } = req.params;

    // Find all reviews associated with the tool
    const reviews = await Review.find({ productId: toolId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews for tool:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const { reviewContent, rating } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { reviewContent, rating },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
