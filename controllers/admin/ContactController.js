const ContactModel = require("../../models/Contact");

class ContactController{
    static addcontact = async(req,res)=>{
        try{
            const{name,image}=req.data1
            const data = await ContactModel.find()
            res.render('admin/contact/addcontact',{d:data ,n:name,img:image})
        }catch(error){
            console.log(error);
        }
    }
    static insertcontact = async(req,res)=>{
        try{
            const result  = new ContactModel({
                name:req.body.name
            })
            await result.save()
            res.redirect('/admin/addcontact')
        }catch(error){
            console.log(error);
        }
    }
    static contactview = async(req,res)=>{
        try{
            const{name,image}=req.data1
            const data  = await ContactModel.findById(req.params.id)
            res.render('admin/contact/view',{d:data, n:name,img:image})
        }catch(error){
            console.log(error);
        }

    }
    static editcontact = async(req,res)=>{
        try{
            const{name,image}=req.data1
            const data = await ContactModel.findById(req.params.id)
            res.render('/admin/addcontact',{d:data, n:name,img:image})
        }catch(error){
            console.log(error);
        }
    }
    static updatecontact = async (req,res)=>{
        try{
            const id  = req.params.id
            const data = await ContactModel.findByIdAndUpdate(id,{

            })
            res.redirect('/admin/addcontact')
        }catch(error){
            console.log(error);
        }
    }

}
module.exports=ContactController