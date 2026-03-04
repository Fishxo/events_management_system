//importing database model
const adlog = require('../models/ADMINlogin');
//getting the admin login page 
exports.adminlogin = (req,res) =>{
    res.render('ADMINlogin')
}

//reciviing the data from the admin login page
exports.adminloginn = async(req,res) => {
    const {adminemail,adminpassword} = req.body;

    //using try catch here 
    try{
         const adm = await adlog.findOne({adminemail:adminemail});
          //making validation
          if(!adm){
            return res.send('this email is not exist');
          } if(adm.adminpassword !== adminpassword){
            return res.send('you using the wrong passsword')
          }
          res.render('ADMINhomepage')
    }catch(err){
        console.log(err)
        return res.send('somthing is wrong')
    }
}