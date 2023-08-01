const mongoose = require ('mongoose')
const Categoryschema = new mongoose.Schema({
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
const CategoryModel = mongoose.model('category',Categoryschema)
module.exports = CategoryModel
