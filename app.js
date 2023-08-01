const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const fileUpload = require ('express-fileupload') // image code 
let session  = require('express-session') // msg show
let flash = require ('connect-flash'); // msg show


//msg show 
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave:false,
  saveUninitialized:false,
}));
app.use(flash());


// image upload code
app.use(fileUpload({
  useTempFiles : true,
}));

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//static file css
app.use(express.static('public'))

// ejs html css
app.set('view engine', 'ejs')
// Database Connection
const connectDB = require ('./db/connectdb')
connectDB()


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
//route
app.use('/',web)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/About', (req, res) => {
//   res.send('About')
// })
// create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})