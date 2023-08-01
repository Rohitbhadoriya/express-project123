const express = require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const PropertyController = require('../controllers/admin/PropertyController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/admin/ContactController')
const checkLogin = require ('../middleware/auth')
const SliderController = require('../controllers/admin/SliderController')
const BookController = require('../controllers/admin/BookController')
const route = express.Router()

//FrontController
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/property',FrontController.property)
route.get('/propertylist/:name',FrontController.propertylist)
route.get('/details/:id',FrontController.propertydetails)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)


// admin part
route.get('/admin/dashboard',checkLogin,AdminController.dashboard)
route.get('/register',AdminController.register)
route.post('/admininsert',AdminController.admininsert)
route.post('/verifylogin',AdminController.verifylogin)
route.get('/logout',AdminController.logout)

// admin Property Controller
route.get('/admin/addproperty',checkLogin,PropertyController.addproperty)
route.post('/admin/insertproperty',checkLogin,PropertyController.insertproperty)
route.get('/admin/propertyView/:id',checkLogin,PropertyController.viewproperty)
route.get('/admin/propertyEdit/:id',checkLogin,PropertyController.editproperty)
route.post('/admin/updateproperty/:id',checkLogin,PropertyController.updateproperty)
route.get('/admin/propertydelete/:id',checkLogin,PropertyController.propertydelete)

// admin category Controller
route.get('/admin/addcategory',checkLogin,CategoryController.addcategory)
route.post('/admin/insertcategory',checkLogin,CategoryController.insertcategory)
route.get('/admin/categoryView/:id',checkLogin,CategoryController.viewcategory)
route.get('/admin/categoryedit/:id',checkLogin,CategoryController.categoryedit)
route.post('/admin/updatecategory/:id',checkLogin,CategoryController.updatecategory)
route.get('/admin/deletecategory/:id',checkLogin,CategoryController.deletecategory)
//admin about controller
route.get('/admin/addabout',checkLogin,AboutController.addabout)
route.post('/admin/insertabout',checkLogin,AboutController.insertabout)
route.get('/admin/aboutview/:id',checkLogin,AboutController.aboutview)
route.get('/admin/aboutedit/:id',checkLogin,AboutController.aboutedit)
route.post('/admin/updateedit/:id',checkLogin,AboutController.updateedit)
route.get('/admin/aboutdelete/:id',checkLogin,AboutController.aboutdelete )

// admin contact controller
route.get('/admin/addcontact',checkLogin,ContactController.addcontact)
route.post('/admin/insertcontact',checkLogin,ContactController.insertcontact)
route.get('/admin/contactview/:id',checkLogin,ContactController.contactview)
route.get('/admin/contactedit/:id',checkLogin,ContactController.editcontact)
route.post('/admin/updatecontact/:id',checkLogin,ContactController.updatecontact)
// admin slider controller
route.get('/admin/addslider',checkLogin,SliderController.addslider)
route.post('/admin/insertslider',checkLogin,SliderController.insertslider)
route.get('/admin/sliderview/:id',checkLogin,SliderController.sliderview)
route.get('/admin/slideredit/:id',checkLogin,SliderController.editslider)
route.post('/admin/updateslider/:id',checkLogin,SliderController.updateslider)
// Book Controller
route.post('/bookproperty',BookController.insertbook)


module.exports=route