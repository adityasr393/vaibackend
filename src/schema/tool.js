// Tool.js

const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  toolDescription: {
    type: String,
    required: true
  },
  visitLink: {
    type: String,
    required: true
  },
  pricingPrice:{
    type:String, 
    
  },
  pricingType:{
    type:String, 
    
  },
  firebaseImageUrl: {
    type: String,
    required: true
  }
},{ collection: 'your_collection_name' }); 

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
