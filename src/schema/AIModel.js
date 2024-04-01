const mongoose = require('mongoose');

const AISchema = new mongoose.Schema({
  toolTitle: String, // Change 'toolName' to 'toolTitle'
  toolDescription: String, // Change 'description' to 'toolDescription'
  pricingType: String,
  pricingPrice:String, // Change 'pricingTag' to 'pricingType'
  visitLink: String,
  category: String, // You can add or remove fields as needed
  firebaseImageUrl: String ,// Add field for Firebase Storage URL
  status:{
    type:Boolean,
    default:false
},filter: {
  type: String,
  enum: ['new', 'popular', 'featured'], // Define enum values
  default: 'new' // Set default value to 'new'
}
}, { collection: 'your_collection_name' ,timestamps:true}); // Specify the collection name as 'AI'

const AI = mongoose.model('your_collection_name', AISchema);

module.exports = AI;
