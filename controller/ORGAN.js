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
      //making validation before creating it for organizer

      //convert the event starting date and end date into date object 
      const start = new Date(startDateTime);
      const end  = new Date(endDateTime)

      //event starting date should not be in the past 
      if (start < new Date()){
         return res.send('the event starting date can not be the past')
      }
      //the event end date can not be befor the starting date 
      if(end < start){
         return res.send('the event end date should be after starting date')
      }
      //the event should last at least 30 minute long
      if(end - start/1000/60 < 30){
         return res.send('the event should last at least 30 minute')
      }
      //stoping the event overlapping when they get created 
      const overlapping = await event.findOne({
         location,
         startDateTime :{ $lt:end},
         endDateTime : {$gt:start}
      })
      //send message to stop overlapping
      if(overlapping){
         return res.send('sorry there is another event the same exact place and time')

      }

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
       
        res.render('MINEeventsFOROrgan',{eve,organizerId})
     }catch(err){
        console.log(err)
        res.send('sorry could not delete it')
     }
}