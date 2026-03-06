//importing the mmodels 
const Attender = require('../models/ATTENDER');
const event = require('../models/event')



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