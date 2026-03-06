const express = require('express')
const router = express.Router();
const attend = require('../controller/ATTENDERsignin')

//getting the sign in page for the new attenders
router.get('/signin',attend.signin)

//reciving the data from the attender sign in page
router.post('/signinn',attend.signinn)

//getting the log in page for the attenders thos sign in befor
router.get('/login',attend.login)

//reciving the data from the attender log in page
router.post('/loginn',attend.loginn)


module.exports = router;