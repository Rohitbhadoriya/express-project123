const mongoose = require ('mongoose')
const local_url = "mongodb://127.0.0.1:27017/brokerportal"
const live_url = "mongodb+srv://rohitbhadauriya575:ram123@cluster0.zncmzlg.mongodb.net/brokerportal?retryWrites=true&w=majority"
const connectdb = () =>{
    return mongoose.connect(live_url)
    .then( () =>{
        console.log("connected sucessfully")
    }).catch( (err) =>{
        console.log (err);
    }

    )
}
module.exports = connectdb