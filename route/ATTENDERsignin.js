const express = require('express')
const router = express.Router();
const attend = require('../controller/ATTENDERsignin')

//getting the attenders sign in page 
router.get('/signin',attend.signin)

//reciving the data from the attender sign in page
router.post('/signinn',attend.signinn)

//getting the attender log in page
router.get('/login',attend.login)

//reciving the data from the attender log in page
router.post('/loginn',attend.loginn)

module.exports = router;