const event = require('../models/event');
const admin = require('../models/ADMINlogin');
const router = require('../route/ADMINhomepage');
const attender = require('../models/ATTENDER');

//getting a form for creating a new event
exports.createEVENT = (req,res) =>{
    res.render('CREATEevents')
}


//recived the datas for creating events and save to the database
exports.createdEvent = async (req, res) => {
    try {
        const { title, description, startDateTime, endDateTime, location, category, price, capacity } = req.body;

        // convert to Date objects
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        // 1️⃣ Event start should not be in the past
        if (start < new Date()) {
            return res.send('Event start time cannot be in the past');
        }

        // 2️⃣ End must be after start
        if (end <= start) {
            return res.send('End time must be after start time');
        }

        // 3️⃣ Event must last at least 30 minutes
        if ((end - start) / 1000 / 60 < 30) {
            return res.send('Event must last at least 30 minutes');
        }

        // 4️⃣ No overlapping event at the same location
        const overlapping = await event.findOne({
            location,
            startDateTime: { $lt: end },
            endDateTime: { $gt: start }
        });

        if (overlapping) {
            return res.send('Another event exists at the same time and location');
        }

        // save the event
        await event.create({
            title,
            description,
            startDateTime: start,
            endDateTime: end,
            location,
            category,
            price,
            capacity
        });

        return res.send('Event created successfully');
        
    } catch (err) {
        console.log(err);
        return res.send('Something went wrong');
    }
};


//viewing the whole events do admin usind view all event button 
exports.viewALLevents = async(req,res) => {
      try{
        
        const ad = await admin.find()
        const allev = await event.find()
        res.render('ADMINviewallevents',{allev,ad})
      }catch(err){
        console.log(err)
        return res.send('could not fetch events')

      }
}


//getting the edit requiest and passing to update page
exports.EVENTedit = async(req,res) => {
    //declaring the event id here
    const {allId} = req.params;
    try{
       const eve = await event.findById(allId);
        res.render('UPDATEeventpage',{eve})
    }catch(err){
        console.log(err)
        res.send('somthing is wrong')
    }
}

//gettign the updated evenet and saving to the database 
exports.UPDATEDevent = async(req,res) =>{
    const { title, description, startDateTime, endDateTime, location, category, price, capacity } = req.body;
    const {eveId} = req.params;

      try{
        
        //declaring the new document using the database model
        const newEVENT = await event.findById(eveId)
         if(!newEVENT){
            return  res.send('ther is no event in by this id')
         }

            newEVENT.title = title,
            newEVENT.description = description,
            newEVENT.startDateTime = startDateTime,
            newEVENT.endDateTime = endDateTime,
            newEVENT.location = location,
            newEVENT.category = category,
            newEVENT.price = price,
            newEVENT.capacity = capacity,
        
            //saving to database
            await newEVENT.save()
            return res.send('event updated success')
      }catch(err){
        console.log(err)
        res.send('could not saved your updates')
      }
}

//getting a delete event requiest and delete from the database
exports.DELETEevent = async(req,res) =>{
    //declaring the event id to use 
    const {eveId} = req.params;
     try{
        const ad = await admin.find();
        //deleting the selected event
        await event.findByIdAndDelete(eveId)
       const allev = await event.find()
        res.render('ADMINviewallevents',{allev,ad})
     }catch(err){
        console.log(err)
        return res.send('sorry could not deleted')
     }
}

//getting the page to manage the events in admin dashbourd
exports.MANAGEevent = async(req,res) =>{
   try{
    //declaring to new variable to get the whole events
    const even = await event.find()
        res.render('MANAGEevent',{even})
   }catch(err){
    console.log(err)
    res.send('could not get the managing event page')
   }
}

exports.adminhomepage = async(req,res) =>{
     try{
        const attend = await attender.countDocuments();
        const even = await event.countDocuments();
    res.render('ADMINhomepage',{even,attend})
     }catch(err){
        console.log(err)
        res.send('total number of event has some problem')
     }
}

//getting the user management page from admin dashbord
exports.MANAGEattender = async(req,res) =>{
    try{
        const attend = await attender.find();
         res.render('MANAGEattender',{attend})
    }catch(err){
        console.log(err)
        res.send('could not get attender managing page')
    }
}

//getting the edit requiest and the update ejs page 
exports.EDITattender = async(req,res) =>{
    //declaring the attender id to use 
    const {userId} = req.params;
     try{
        const attend = await attender.findById(userId);
        res.render('UPDATEattender',{attend})
     }catch(err){
        console.log(err)
        res.send('could not find the attender update page')
     }
}

//getting the updated infos about the attender and save to database 
exports.UPDATEEattender = async(req,res) =>{
    const {attendname,attendusername,attendemail,attendpassword} = req.body;
         const {userId} = req.params;
     try{
      const att = await attender.findById(userId);
      const attend = await attender.find();
      if(!att){
        return res.send('no user found by this userId')
      }
       att.attendname = attendname,
       att.attendusername = attendusername,
       att.attendemail = attendemail,
       att.attendpassword = attendpassword,
         await att.save();
         res.render('MANAGEattender',{attend})
     }catch(err){
        console.log(err)
        res.send('sorry could not update the user')
     }
}

//getting the requiest to be the organizer
// Controller: adminController.js


exports.pendings = async (req, res) => {
  try {
    // Get all users who requested to be organizer
    const requests = await attender.find({ organizerRequest: "pending" });
    
    // Render admin page with requests
    res.render("ADMINpendingview", { requests });
  } catch (err) {
    console.error(err);
    res.send("Error fetching requests");
  }
};


//handling the attender status after the admin approve or denined the attender requiest 
exports.handleOrganizerRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action } = req.body; // action = "approve" or "deny"
    // Get all users who requested to be organizer
    const requests = await attender.find({ organizerRequest: "pending" });

    const user = await attender.findById(userId);
    if (!user) return res.send("User not found");

    if (action === "approve") {
      user.role = "organizer";
      user.organizerRequest = "approved";
    } else if (action === "deny") {
      user.organizerRequest = "rejected";
    }

    await user.save();
    res.render("ADMINpendingview",{requests}); // reload admin page
  } catch (err) {
    console.error(err);
    res.send("Error updating request");
  }
};

