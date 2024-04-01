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

// Controller function to get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller function to get a specific contact by ID
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
