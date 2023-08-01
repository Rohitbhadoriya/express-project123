const AdminModel = require('../../models/Admin') // database calling
const cloudinary =require('cloudinary').v2;
const bcrypt = require ('bcrypt') //
const jwt  =require ('jsonwebtoken') // 
cloudinary.config({ 
    cloud_name: 'dvhcd5oaz', 
    api_key: '377969336692132', 
    api_secret: 'ck52LMl4pM1JvZikeMw0cZNtx00' 
  });
class AdminController{
    static dashboard = async(req,res)=>{
        try{
          // console.log(req.data1);
           const{name,image}=req.data1
           res.render('admin/dashboard',{n:name,img:image})
        }catch(error){
            console.log(error)
        }
    }
    static register = async (req,res) =>{
        try{

            res.render('admin/register',{message:req.flash('error')})
        }catch(error){
            confirm.log(error)
        }
    }
    static admininsert = async (req,res) =>{
        try{
            const imagefile = req.files.image
       //image upload codeq
       const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        folder:"registerImage"
       })
       const{name,email,password,cpassword} = req.body
       const admin = await AdminModel.findOne({email:email})
      // console.log(admin);
       if(admin)
       {
        req.flash('error',"Email already exists");
        res.redirect('/register')
       }else{
        if(name && email && password && cpassword ){
            if (password == cpassword) {
                try{
                    const hashpassword = await bcrypt.hash(password,10)
                    const result = new AdminModel({
                        name:name,
                        email:email,
                        password:hashpassword,
                        image:{
                            public_id: image_upload.public_id,
                            url:image_upload.secure_url
                        }
                    })
                    await result.save()
                    req.flash('success',"Registration Sucessfull please login")
                    res.redirect('/login')
                }catch(error){
                    console.log(error);
                }

            }else{
                req.flash('error',"Password && Confirm pass not match ");
                res.redirect('/register')
            }
        }else{
            req.flash('error',"All fields Required");
            res.redirect('/register')
        }
       }
            //console.log(req.files.image)
          // console.log(req.body);
        //   const r = new AdminModel({
        //     name:req.body.name,
        //     email:req.body.email,
        //     password:req.body.password,
        //     image:{
        //         public_id: image_upload.public_id,
        //         url:image_upload.secure_url
        //     }
        //   })
        //   await r.save()
        //   res.redirect('/login')
        }catch(error){
            console.log(error)
        }
    }
    static verifylogin = async (req,res)=>{
        try{
            //console.log(req.body);
            const {email,password} = req.body;
            if(email && password) {
                const admin = await AdminModel.findOne({email:email})
                if (admin != null){
                    const isMatched = await bcrypt.compare(password,admin.password)
                    if(isMatched){
                        // token genrate
                        var token = jwt.sign({ ID: admin._id }, 'ro123356adsfg');
                       // console.log(token);
                       res.cookie("token",token)
                        res.redirect('/admin/dashboard')
                    } else{
                        req.flash('error', 'Email of password is not valid')
                        return res.redirect('/login')
                    }
                } else {
                    req.flash('eroror', 'Your are not registerd user')
                    return res.redirect('/login')
                }
            } else {
                req.flash ('error','All fields Required')
                return res.redirect ('/login')
            }
        }catch(error){
        console.log(error);
        }
    }
    static logout = async (req,res)=>{
        try{
            res.clearCookie("token");
            res.redirect('/login')
        }catch(error){
            console.log(error);
        }
    }
}


module.exports=AdminController