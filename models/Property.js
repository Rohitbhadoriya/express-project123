const mongoose = require ('mongoose')
const Propertyschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    size:{
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
const PropertyModel = mongoose.model('property',Propertyschema)
module.exports = PropertyModel
