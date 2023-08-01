const SliderModel = require('../../models/Slider');
const cloudinary =require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dvhcd5oaz', 
    api_key: '377969336692132', 
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00' 
  });
class SliderController{
static addslider = async(req,res)=>{
    try{
        const{name,image}=req.data1
        const data = await SliderModel.find()
        res.render('admin/slider/addslider',{d:data, n:name,img:image})
    }catch(error){
        console.log(error);
    }
}
static insertslider = async(req,res)=>{
    try{
        const imagefile = req.files.image
        const images_upload  =await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:"sliderImage"
        })
        const result  = new SliderModel({
            name:req.body.name,
            image:{
                public_id: images_upload.public_id,
                url:images_upload.secure_url
           }

        })
        await result.save()
        res.redirect('/admin/addslider')

    }catch(error){
        console.log(error);
    }
}
    static sliderview = async(req,res)=>{
        try{
            const{name,image}=req.data1
            const data = await SliderModel.findById(req.params.id)
            res.render('admin/slider/view',{d:data ,n:name,img:image});
        }catch(error){
            console.log(error);
        }
    }
    static editslider = async(req,res)=>{
        try{
            const{name,image}=req.data1
            const data = await SliderModel.findById(req.params.id)
            res.render('admin/slider/edit',{d:data ,n:name,img:image});
        }catch(error){
            console.log(error);
        }
    }
    static updateslider = async(req,res)=>{
        try{
            if(req.files){
                const slider = await SliderModel.findById(req.params.id)
                const imageid = slider.image.public_id
                // console.log(imageid)
                //image delete
                await cloudinary.uploader.destroy(imageid)
                // second update image
                const imagefile = req.files.image
                //image upload code
                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
                 folder:"sliderImage"
                })
                var data = {
                    name:req.body.name, 
                    image:{
                        public_id: image_upload.public_id,
                        url:image_upload.secure_url
                    }
       
                 } 
            }else{
                var data = {
                    name:req.body.name,
                }
            }
            const id = req.params.id
            await SliderModel.findByIdAndUpdate(id,data)
            res.redirect('/admin/addslider')
        }catch(error){
            console.log(error);
        }
       }
}
module.exports=SliderController
