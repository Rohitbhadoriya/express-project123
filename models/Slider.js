const mongoose = require ('mongoose')
const Sliderschema = new mongoose.Schema({
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
const SliderModel = mongoose.model('slider',Sliderschema)
module.exports=SliderModel