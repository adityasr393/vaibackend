const Email = require('../schema/email');

// Controller function to handle POST request for creating a new email address
const createEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email address already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email address already exists' });
    }

    // Create a new email address document
    const newEmail = new Email({ email });
    await newEmail.save();

    // Return the newly created email address
    res.status(201).json(newEmail);
  } catch (error) {
    // Handle any errors
    console.error('Error creating email address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createEmail };
