const express = require('express');
const router = express.Router();
const attend = require('../controller/ATTENDERhomepage')

//getting the attender the fetch events to user
router.get('/events',attend.FETCHevents)

//recieving the requiest from the user to be organizer
router.post('/:userId/reuiestORGANIZER',attend.TOBEorganizer)

module.exports = router;
