//importing pakcages 
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

//handling the middleware
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

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