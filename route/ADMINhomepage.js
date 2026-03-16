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
router.get('/controllerATTENDER',admin.MANAGEattender)

//getting requiest to update the attender from manage attender page
router.get('/:userId/editt',admin.EDITattender)

//reciiving the updated attender data 
router.post('/:userId/updatee',admin.UPDATEEattender)

//reciving the attenders pending requiest
router.get('/Pending',admin.pendings)

//getting the admin login reqiest and redirect admin login page 
router.get('/logout',admin.logout)
// Approve or deny a request
router.post("/:userId/requests", admin.handleOrganizerRequest);

//getting the list of organizer and management of them them page 
router.get('/organMGT',admin.organMgt)

//viewing the delait information about organizer from organizer management page 
router.get('/:userId/view',admin.ORGANview)

//getting thr requiest to remove the organizer from the organizer
router.post('/:userId/remove',admin.removeORGI)

module.exports = router;