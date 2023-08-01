
const CategoryModel = require("../../models/Category")
const cloudinary =require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dvhcd5oaz', 
    api_key: '377969336692132', 
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00' 
  });

class CategoryController{
static addcategory = async (req,res)=>{
try{
    const{name,image}=req.data1
    const data = await CategoryModel.find()
        //console.log(data);
    res.render('admin/category/addcategory',{d:data, n:name,img:image})
}catch(error){
    console.log(error)
}
}
static insertcategory = async(req,res)=>{
    try{
       // console.log(req.files.image);
        const imagefile = req.files.image
        //image upload code
        const images_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:"categoryImage"
        })
         //console.log(images_upload);
       const r =new CategoryModel({
             name:req.body.name,
             image:{
                public_id: images_upload.public_id,
                url:images_upload.secure_url
            }

         })
        await r.save()
        res.redirect('/admin/addcategory')
    }catch(error){
        console.log(error);
    }
}
static viewcategory=async(req,res)=>{
    try{
        const{name,image}=req.data1
        //console.log(req.params.id);
        const data = await CategoryModel.findById(req.params.id)
       // console.log(data);
        //res.render('admin/property/addproperty',{d:data})
        res.render('admin/category/view',{d:data ,n:name,img:image});
    }catch(error){
        console.log(error);
    }
   } 
   static categoryedit =async(req,res)=>{
    try{
        const{name,image}=req.data1
        //console.log(req.params.id);
        const data = await CategoryModel.findById(req.params.id)
        res.render('admin/category/edit',{d:data ,n:name,img:image})
    }catch(error){
        console.log(error);
    }
   }   
   static updatecategory = async(req,res)=>{
    try{
        if(req.files){
            const category = await CategoryModel.findById(req.params.id)
            const imageid = category.image.public_id
            // console.log(imageid)
            //image delete
            await cloudinary.uploader.destroy(imageid)
            // second update image
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
             folder:"categoryImage"
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
        await CategoryModel.findByIdAndUpdate(id,data)
        res.redirect('/admin/addcategory')
    }catch(error){
        console.log(error);
    }
   }
   static deletecategory = async (req,res) =>{
    try{
        const data  = await CategoryModel.findByIdAndDelete (req.params.id)
        res.redirect('/admin/addcategory')
    }catch(error){
        console.log(error);
    }
   }
}
module.exports=CategoryController