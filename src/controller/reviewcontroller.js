

// Controller function to create a new review
const Review = require('../schema/reviewschema');
const Tool = require('../schema/tool');
const ai = require('../schema/AIModel');
// Controller function to create a new review for a specific tool
exports.createReview = async (req, res) => {
  try {
    const { toolId, reviewContent, rating } = req.body;
    
    // Validate input data
    if (!toolId || !reviewContent || !rating) {
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
      productId: toolId // Set the productId to the ID of the tool
    });
    await review.save();

    // Add the review to the tool's reviews array
    // tool.reviews.push(review._id);
    let obj = await tool.save();
    console.log(obj,'-----------------90099')
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





// Controller function to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const tool = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a single review by ID
exports.getReviewsByToolId = async (req, res) => {
  try {
    const { toolId } = req.params;

    // Find the tool by its ID
    const ai = await ai.findById(toolId).populate('t');
    if (!ai) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    // Find all reviews associated with the tool
    const reviews = await Review.find({ productId: toolId });

    // Return the reviews in the response
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
    const review = await Review.findByIdAndUpdate(req.params.id, {
      reviewContent,
      rating
    }, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
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
    res.status(500).json({ error: 'Internal server error' });
  }
};
