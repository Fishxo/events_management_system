//importing pakcages 
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const session = require('express-session');

//handling the middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

//setting the session 

app.use(session({
  secret: 'yourSecretKey',  // anything random, used to sign session ID
  resave: false,
  saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour

}));
//declaring in the userId in every ejs page using session
app.use((req, res, next) => {
  res.locals.attenderId = req.session.attenderId;
  next();
});

//getting the route folder 
app.use('/',require('./route/first'))

//connecting to the database
mongoose.connect('mongodb://localhost:27017/event_mgts_system')
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))



//server listining
app.listen(3000,(req,res)=>{
    console.log('server is running')
})