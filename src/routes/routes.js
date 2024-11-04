const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactcontroller');
const userController = require('../controller/userController');
const AI = require('../schema/AIModel');
const toolController = require('../controller/toolController');
const emailcontroler = require('../controller/emailcontroller');
// const reviewController = require('../controller/reviewcontroller');

// Route to create a new review for a specific tool
router.post('/tools/:toolId/reviews', reviewController.createReview);
router.get('/tools/:toolId/reviews', reviewController.getReviewsByToolId);
// POST route for creating a new email address
router.post('/emails', emailcontroler.createEmail);
router.post('/addTool', toolController.addTool);
router.post("/login", userController.login);
router.post('/signup', userController.signup);
router.post('/contact', contactController.submitContactForm);
router.get("/getprofiledata/:id", userController.getprof);
router.put("/updateprofile/:id", userController.updateprof);
router.put("/updatestatus/:id",userController.updatestatus);
router.get("/getsignup", userController.getsignup);
router.put('/ai/:id/updateFilter', toolController.updateFilter);
router.put('/updatetoolstatus/:id', toolController.updateAIStatus);
router.get('/contacts',contactController.getAllContacts)
// Define route for '/AI'
router.get('/AI', toolController.getAI);
router.delete('/deleteTool/:toolId', toolController.deleteTool);
router.put('/tools/:toolId', toolController.updateToolData);
// Get all AI tools
router.get('/AI', async (req, res) => {
    try {
      const tools = await AI.find().maxTimeMS(30000);
      res.json(tools);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Get a single AI tool by name
  router.get('/tool/:toolName', async (req, res) => {
    try {
      const tool = await AI.findOne({ toolName: req.params.toolName }).maxTimeMS(30000);
      if (!tool) {
        return res.status(404).json({ message: 'Tool not found' });
      }
      res.json(tool);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;