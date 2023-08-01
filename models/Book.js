const mongoose = require ('mongoose')
const Bookschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    
    },
    email:{
        type:String,
        required:true
    
    },
    mobile:{
        type:String,
        required:true
    
    },
    address:{
        type:String,
        required:true
    
    },

},{timestmaps:true})
const BookModel = mongoose.model('book',Bookschema)
module.exports =BookModel
