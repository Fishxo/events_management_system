const express = require('express');
const router = express.Router();
const admin = require('../controller/ADMINhomepage')

//using for cotrole the admin home page activity

//getting an ejs page for creating an event 
router.get('/CREATEevents',admin.createEVENT)

//reciving the datas that come from the form from an ejs page 
router.post('/createEvent',admin.createdEvent)

module.exports = router;