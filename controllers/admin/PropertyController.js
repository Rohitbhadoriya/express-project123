const PropertyModel = require('../../models/Property') // database calling
const CategoryModel  = require ('../../models/Category')
const cloudinary =require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dvhcd5oaz', 
    api_key: '377969336692132', 
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00' 
  });


class PropertyController{
   static addproperty=async(req,res)=>{
    try{
        const{name,image}=req.data1
        const data = await PropertyModel.find()
        const category = await CategoryModel.find()
       // console.log(data);
        res.render('admin/property/addproperty',{d:data,message:req.flash('success'),n:name,img:image,c:category   })
    }catch(error){
        console.log(error)
    }
   } 
   static insertproperty=async(req,res)=>{
    try{
       // console.log(req.files.image);
       const imagefile = req.files.image // error na aye is liye or dyanmic h sab 
       //image upload codeq
       const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        folder:"propertyImage"
       })
      // console.log(image_upload);
        const result = new PropertyModel({
         name:req.body.name,
         address:req.body.address,
         category:req.body.category,
         price:req.body.price,
            size:req.body.size,
            image:{
                public_id: image_upload.public_id,
                url:image_upload.secure_url
            }

        })
     await result.save()
     res.redirect('/admin/addproperty')
    }catch(error){
        console.log(error);
    }
   } 

   static viewproperty=async(req,res)=>{
    try{
        const{name,image}=req.data1
        //console.log(req.params.id);
        const data = await PropertyModel.findById(req.params.id)
        res.render('admin/property/view',{d:data ,n:name,img:image})
    }catch(error){
        console.log(error);
    }
   } 
   static editproperty = async(req,res)=>{
    try{
        const{name,image}=req.data1
       // console.log(req.params.id);
        const data = await PropertyModel.findById(req.params.id)
        res.render('admin/property/edit',{d:data ,n:name,img:image})
    }catch(error){
        console.log(error);
    }
   }
   static updateproperty = async(req,res)=>{
    try{
        if(req.files){
            const property = await PropertyModel.findById(req.params.id)
            const imageid = property.image.public_id
            // console.log(imageid)
            //image delete
            await cloudinary.uploader.destroy(imageid)
            // second update image
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
             folder:"propertyImage"
            })
            var data = {
        name:req.body.name,
         address:req.body.address,
         category:req.body.category,
         price:req.body.price,
            size:req.body.size,
            image:{
                public_id: image_upload.public_id,
                url:image_upload.secure_url
            }
            }

        }else{
            var data = {
                name:req.body.name,
                address:req.body.address,
                category:req.body.category,
                price:req.body.price,
                size:req.body.size, 
            }

        }
       // console.log(req.files.image)
       const id = req.params.id
        await PropertyModel.findByIdAndUpdate(id,data)
        req.flash('success', 'Success')
        res.redirect('/admin/addproperty')
        
    }catch(error){
        console.log(error);
    }
   }
   static propertydelete = async(req,res)=>{
    try{
        const property = await PropertyModel.findById(req.params.id)
        const imageid = property.image.public_id
        // console.log(imageid)
            //image delete
            await cloudinary.uploader.destroy(imageid)
       // console.log(req.params.id);
        const data = await PropertyModel.findByIdAndDelete(req.params.id)
        req.flash('success', 'Delete')
        res.redirect('/admin/addproperty')
    }catch(error){
        console.log(error);
    }
   }
  
}
module.exports=PropertyController