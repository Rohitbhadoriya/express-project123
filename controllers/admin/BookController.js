const BookModel = require("../../models/Book")
const nodemailer = require('nodemailer')
class BookController{
static insertbook = async(req,res)=>{
    try{
       // console.log(req.body)
       const {name,email}=req.body
        const r = new BookModel({
            name:req.body.name,
         email:req.body.email,
         mobile:req.body.mobile,
         address:req.body.address,
        })
        await  r.save()
        this.sendEmail(name,email)
        res.redirect('/')
    }catch(error){
        console.log(error)
    }
}
static sendEmail = async (name,email)=>{
    // console.log("email sending")
    // console.log("propertyname")
    // console.log(email)
    console.log(name,email)
    // connenct with smtp server

    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth:{
            user:"rohitbhadauriya575@gmail.com",
            pass: "iwbhsibkdgvmxjdq",
        },
    });
    let info = await transporter.sendMail({
        from:"test@gmail.com", // sender address
        to: email, // list of recivers
        subject:"create  property registration Successfully ",// Subject line
        text: "heelo", // plain text body
        html: `<b>${name}</b> Book is successfully`, // html body
    });
 // console.log("Meassge sent: %s", info.messageId);
};
}
module.exports=BookController