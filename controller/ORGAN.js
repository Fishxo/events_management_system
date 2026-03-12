const event = require("../models/event");

exports.CREATEevent = (req,res) => {
    res.render('CREATEeventsForOrgan')
}

//getting the delete requiest from organizer and deleting an event
exports.delete = async(req,res) => {
    const {eventId} = req.body;
     try{
        //getting session
        const organizerId = req.session.attenderId;

        const eve = await event.find({organId : organizerId})
        await event.findByIdAndDelete(eventId)
        res.render('MINEeventsFOROrgan',{eve})
     }catch(err){
        console.log(err)
        res.send('sorry could not delete it')
     }
}