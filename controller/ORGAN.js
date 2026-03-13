const event = require("../models/event");
const registered = require('../models/REGISRTRATIONevents');

exports.CREATEevent = (req,res) => {
    res.render('CREATEeventsForOrgan')
}

//getting created events by the organizer and making save them
exports.createdevents = async(req,res) =>{
  //declare variable
  const {title,description,startDateTime,endDateTime,location,category,price,capacity,} = req.body;
  const organizerId = req.session.attenderId;
   try{
      const eves = new event({
         title,
         description,
         startDateTime,
         endDateTime,
         location,
         category,
         price,
         capacity,
         organId:organizerId,

      });
      await eves.save();
      return res.send('you have created event succussfully')
   }catch(err){
      console.log(err)
      return res.send('could not saved your events')
   }

}
//getting the delete requiest from organizer and deleting an event
exports.delete = async(req,res) => {
    const {eventId} = req.params;
     try{
        //getting session
        const organizerId = req.session.attenderId;

       const deletedEvent =  await event.findOneAndDelete({_id:eventId,organId:organizerId})
        if(deletedEvent){
          //removing all registration from events  
        await registered.deleteMany({ eventId: deletedEvent._id });
        }

        const eve = await event.find({organId : organizerId})
       
        res.render('MINEeventsFOROrgan',{eve})
     }catch(err){
        console.log(err)
        res.send('sorry could not delete it')
     }
}