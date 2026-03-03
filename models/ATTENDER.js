const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//attender schema
const attenderSchema = new mongoose.Schema({
    attendname:String,
    attendusername:String,
    attendemail:{
        type:String,
        unique:true 
    },
    attendpassword:String
})

//creating the model
const Attender = new mongoose.model('Attender',attenderSchema)

module.exports = Attender