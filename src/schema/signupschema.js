const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
   
    name:String,
    email:String,
    number:String,
    dob:String,
    username:String,
    password:String,
    gender:String,
    city: String,
    state: String,
    country: String,
    role:String,
    status:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Users', UsersSchema);