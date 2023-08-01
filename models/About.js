const mongoose = require ('mongoose')
const Aboutschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    
    },
    image:{
        public_id:{
        type:String,
        },
        url:{
            type:String
        }
    },

},{timestmaps:true})
const AboutModel = mongoose.model('about',Aboutschema)
module.exports = AboutModel