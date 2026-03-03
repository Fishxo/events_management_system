const express = require('express');
const mongoose = require('mongoose');

//admin login schema
const adminScgema = new mongoose.Schema({
    adminname:String,
    adminusername:String,
    adminemail:{    
        type:String,
        required:true,
        unique:true
    },
    adminpassword:{
        type:String,
        required:true
    }
})

//creating a model for the admin login schema
const Admin = mongoose.model('Admin',adminScgema)

module.exports = Admin