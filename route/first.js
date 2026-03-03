const express = require('express');
const router = express.Router();
const firstPage = require('../controller/firstPage')
const adminlogin = require('../controller/adminlogin');

//reciving the first requiest from index page
router.get('/',firstPage.first)

// getting the admin login page
router.get('/admin',adminlogin.adminlogin)

// getting the attender sign in page 
router.use('/ATTE',require('./ATTENDERsignin'))

module.exports = router;