const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// attender schema
const attenderSchema = new mongoose.Schema({
    attendname: String,
    attendusername: String,
    attendemail:{
        type:String,
        unique:true
    },
    attendpassword: String,

    role:{
        type:String,
        enum:["attendee","organizer","admin"],
        default:"attendee"
    },

    organizerRequest:{
        type:String,
        enum:["none","pending","rejected","approved"],
        default:"none"
    },
    attendbio:{
        type:String,
    },
    TwoStepCode:String,
    codeExpiry:Date,
});

// creating the model
const Attender = mongoose.model('Attender', attenderSchema);

module.exports = Attender;