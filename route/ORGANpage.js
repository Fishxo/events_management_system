const express = require('express')
const router = express.Router();
const organ = require('../controller/ORGAN');

//getting the requiest from organizer to create the events 
router.get('/:organId/CREATEevents',organ.CREATEevent);

//making delete the events from the organizer page 
router.post('/:eventId/deletEOWN',organ.delete)

module.exports = router;
