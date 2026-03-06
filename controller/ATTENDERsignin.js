
//importing the attender model
const attend = require('../models/ATTENDER')
const eve = require('../models/event')

//getting the attender signin page 
exports.signin = (req,res) =>{
    res.render('ATTENDERsignin')
}

//reciving the data from the attender sign in page
exports.signinn = async(req,res) =>{
    const {attendname,attendusername,attendemail,attendpassword} = req.body
        
    //creating a new attender
    try {
        const newAttender = new attend({
            attendname,
            attendusername,
            attendemail,
            attendpassword
        })
        // check if email already exists in DB
        const existing = await attend.findOne({ attendemail: attendemail })
        if(existing){
            return res.status(400).send('email already exists')
        }
        await newAttender.save()
        res.send('you are signed in successfully')
    }catch(err){
        console.log(err)
        res.send('there was an error signing in')
    }
}

//getting the attender log in page
exports.login = (req,res) =>{
    res.render('ATTENDERlogin')
}


//reciving the data from the attender log in page
exports.loginn = async(req,res) =>{
    const {attendemail,attendpassword} = req.body

    try {
        const events = await eve.find();
        const user = await attend.findOne({ attendemail: attendemail })
        const userId = user._id;
        if(user.attendpassword !== attendpassword){
            return res.status(400).send('invalid password')
        }
        res.render('ATTENDERhome',{user,userId,events})
    }catch(err){
        console.log(err)
        res.send('there was an error logging in')
    }
}
