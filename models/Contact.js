const mongoose = require ('mongoose')
const Contactschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    
    }
},{timestmaps:true})
const ContactModel = mongoose.model('contact',Contactschema)
module.exports = ContactModel
