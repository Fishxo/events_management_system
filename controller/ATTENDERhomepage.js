//importing the mmodels 
const Attender = require('../models/ATTENDER');
const event = require('../models/event')
const registered = require('../models/REGISRTRATIONevents')

//getting the attender homepage from the attender homepage
exports.home = async(req,res) =>{
      try{
        // Save user info in session
       const attenderId = req.session.attenderId;
       if(!attenderId){return res.redirect('/ATTE/login')}
       const user = await Attender.findById(attenderId)

        // optional, for greetings
        //getting the upcoming events in attender page
                const now = new Date()
                const weeklater = new Date();
                weeklater.setDate(now.getDate() + 7)

                const upcomin = await event.find({
                    startDateTime: {$gt:now,$lt:weeklater} })

                    const upcome = await event.countDocuments({
                        startDateTime :{$gt:now,$lt:weeklater}
                    })
                const even = await event.countDocuments()
                
                // Fetch events
                const events = await event.find();

                //showing the amount of the attenders have joined 
                const join = await registered.countDocuments({attenderId});

                 res.render('ATTENDERhome',{user,events,upcome,upcomin,even,join})
      }catch(err){
        console.log(err)
        res.send('could not get the homepage')
      }
   
}                 

//getting the events from user side 
exports.FETCHevents = async(req,res) =>{
    
     try {
        
        const allev = await event.find();
        res.render('ATTENDERallevent',{allev})
     }catch(err){
        console.log(err)
        res.send('could not get the events')
     }
}

//to requiest to be organizer from attender
exports.TOBEorganizer = async (req, res) => {
    try {
        const userId = req.params.userId; // get user ID from URL
        const user = await Attender.findById(userId);

        if (!user) return res.send("User not found");

        if (user.organizerRequest === "pending")
            return res.send("Request already pending");
        if (user.role === "organizer")
            return res.send("You are already an organizer");

        user.organizerRequest = "pending";
        await user.save();

        res.send("Organizer request sent successfully");

    } catch (err) {
        console.error(err);
        res.send("Something went wrong");
    }
};

//requiesing to join the event from the attender side 
exports.registering = async(req,res) =>{
    const attenderId = req.session.attenderId;
    const {eventId} = req.params;     
       
    try{
        //cheching if they already registered
        const exist = await registered.findOne({eventId,attenderId})
         if(exist){
            return res.send('you already joined this event')
         }
    
         //creating registration for event if they are not registered already
         const register = new registered({eventId,attenderId})
         await register.save()
         console.log(attenderId)
         console.log(eventId)

         return res.send('you joined the event')

    }catch(err){
        console.log(err)
        return res.send('could not join')
    }

}

//getting the attender registered events and and fetching to the database
exports.MYevents = async(req,res) =>{
    const userId = req.session.attenderId;
            try{
                    const regi = await registered.find({attenderId:req.session.attenderId})
                    .populate('eventId')
                    .populate('attenderId')
                    res.render('ATTENDERMyEvents',{regi,userId})
            }catch(err){
                console.log(err)
                res.send('could not fetch your events')
            }
}
//getting events for organizer that created by organizer
exports.MINEevents = async(req,res) =>{
   const organizerId = req.session.attenderId;
   try{
    const eve = await event.find({organId:organizerId})
   console.log(organizerId)
    res.render('MINEeventsFOROrgan',{eve,organizerId})
   }catch(err){
    console.log(err)
    res.send('could not get this page')
   }
}

//getting delet requiest to registered events from the attender
exports.deleteMYevents = async(req,res) =>{
        const attenderId = req.session.attenderId;
        const {eventId} = req.params;
         try{
         await registered.findOneAndDelete({eventId,attenderId});
         const regi = await registered.find({attenderId:req.session.attenderId})
         .populate('attenderId')
         .populate('eventId')
          res.render('ATTENDERMyEvents',{regi})
         }catch(err){
            console.log(err)
            return res.send('could not delete the event')
         }
}



//getting attender account info page
exports.account = async(req,res) =>{
    const {userId} = req.params;
     try{
        const user = await Attender.findById(userId)
        res.render('ATTENDERaccount',{user})
     }catch(err){
        console.log(err)
        res.send('something is wrong')
     }
}

//getting page for updating the attender information
exports.accountupdate = async(req,res) =>{
    const {userId} = req.params;
     try{
        const user = await Attender.findById(userId)
        res.render('ATTENDERaccountupdate',{user})
     }catch(err){
        console.log(err)
        res.send('could not find it')
     }
}

//reciving the updated infos and saving to the database
exports.accupdated = async(req,res) =>{
    const {userId} = req.params;
    const {attendname,attendusername,attendemail,attendbio} = req.body;

      try{
        const accup = await Attender.findById(userId)
         if(!accup){
            return res.send('the user is not found')
         }
        accup.attendname = attendname;
        accup.attendusername = attendusername;
        accup.attendemail = attendemail;
        accup.attendbio = attendbio;

        await accup.save();
        return res.send('account updated successfully')
      }catch(err){
        console.log(err)
        return res.send('somthing is wrong')
      }

}

//getting the attender activity history in account section
exports.accounthistory = async(req,res) =>{
    const {userId} = req.params;
            try{
                const use = await Attender.findById(userId)
                const eves = await registered.find({attenderId:userId}).populate('eventId')
                const own = await  event.find({organId:userId})

                res.render('ATTENDERactivityhistory',{use,eves,own})
            }catch(err){
                console.log(err)
                return res.send('could not open this page ')
            }

}

//gettint the requiest to to get the security update
exports.ACCOUNTsecurity = async(req,res) =>{
    const {userId} = req.params;
            try{
                const user = await Attender.findById(userId)
                const message = req.session.securityMessage || '';
                req.session.securityMessage = null;
                res.render('ATTENDERacountsecurity',{user, message})
            }catch(err){
                console.log(err)
                res.send('could not open this page')
            }
}

//getting the updated password infos and save to database
exports.UPDATEDpassword = async(req,res) =>{
    const {userId} = req.params;
    const {attendpassword} = req.body;

     try{
            const core = await Attender.findById(userId)

            core.attendpassword = attendpassword;

            await core.save()
            return res.send('you have changed the password well')
     }catch(err){
        console.log(err)
        return res.send(('could not make it '))
     }
}