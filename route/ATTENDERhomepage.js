const express = require('express');
const router = express.Router();
const attend = require('../controller/ATTENDERhomepage')

//getting the attendr homepage from attender homepage 
router.get('/home',attend.home)

//getting the attender the fetch events to user
router.get('/events',attend.FETCHevents)

//recieving the requiest from the user to be organizer
router.post('/:userId/reuiestORGANIZER',attend.TOBEorganizer)

//requiesting for events to join 
router.post('/:eventId/register',attend.registering)

//getting the registered events from the attender side
router.get('/myevents',attend.MYevents)

//getting the event created by orgainizer for organizer
router.get('/MINEevents',attend.MINEevents)

//deletng the register event in specifice
router.post('/:eventId/deleteMYevent', attend.deleteMYevents)

//getting the account page from the attender side 
router.get('/:userId/account',attend.account)

module.exports = router;
