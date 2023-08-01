const AdminModel = require('../models/Admin')
const jwt = require ('jsonwebtoken') // 

const checkLogin = async (req,res,next)=>{
       // console.log("rohit");
       const{token}=req.cookies;
      // console.log(token);
      if (!token){
       req.flash('error', 'Unauthorized user, Please Login!')
       return res.redirect('/login')
      }
      else{
       const verify_token = jwt.verify(token,'ro123356adsfg')
       //console.log(verify_token);
       const data = await AdminModel.findOne({_id:verify_token.ID})
      // console.log(data);
      req.data1 = data;
       next()
      }
}

module.exports=checkLogin