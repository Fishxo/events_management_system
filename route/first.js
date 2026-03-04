const express = require('express');
const router = express.Router();
const firstPage = require('../controller/firstPage')
const adminlogin = require('../controller/ADMINlogin');

//reciving the first requiest from index page
router.get('/',firstPage.first)

// getting the admin login page
router.get('/admin',adminlogin.adminlogin)

//getting the addmin login data 
router.post('/admin/loginn',adminlogin.adminloginn)

//getting an admin home page from admin home page ejs page
router.use('/ADMINhomepage',require('./ADMINhomepage'))
            
// getting the attender sign in page 
router.use('/ATTE',require('./ATTENDERsignin'))

module.exports = router;