const express = require('express');
const router = express.Router();
const admin = require('../controller/ADMINhomepage')

//using for cotrole the admin home page activity

//getting an ejs page for creating an event 
router.get('/CREATEevents',admin.createEVENT)

//reciving the datas that come from the form from an ejs page 
router.post('/createEvent',admin.createdEvent)

//fetcing the whole events to the admin using the button of view all event 
router.get('/VIEWSallevents',admin.viewALLevents)

//getting the edit requiest for an event
router.get('/:allId/edit',admin.EVENTedit)

//getting the updated event and saving to databse
router.post('/:eveId/update',admin.UPDATEDevent)

//getting the delete requiest from view all activity page 
router.post('/:eveId/delete',admin.DELETEevent)

//getting the page to manage the total events 
router.get('/MANAGEevents',admin.MANAGEevent)

//getting admin home page to admin
router.get('/ADMINhomepage',admin.adminhomepage)

//getting the users managing page 
router.get('/MANAGEattender',admin.MANAGEattender)

module.exports = router;