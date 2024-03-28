const Contact = require('../schema/contactschema'); 

// Controller function to handle contact form submissions
exports.submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        console.error('Error saving contact form submission:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};