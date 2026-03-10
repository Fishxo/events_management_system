const express = require('express');
const router = express.Router();
const attend = require('../controller/ATTENDERhomepage')

//getting the attender the fetch events to user
router.get('/events',attend.FETCHevents)

//recieving the requiest from the user to be organizer
router.post('/:userId/reuiestORGANIZER',attend.TOBEorganizer)

//requiesting for events to join 
router.post('/:eventId/register',attend.registering)

//getting the registered events from the attender side
router.get('/myevents',attend.MYevents)

//deletng the register event in specifice
router.post('/:eventId/deleteMYevent', attend.deleteMYevents)
module.exports = router;
