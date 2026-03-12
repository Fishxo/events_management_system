const express = require('express');
const mongoose = require('mongoose')

//schema for registration attender to events 
const registerSchema = new mongoose.Schema({
    attenderId :{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Attender'
    },
    eventId :{
        type : mongoose.Schema.Types.ObjectId, 
        ref :'Event'
    },
    registerAt :{
        type : Date,
        default : Date.now,
    }
    
})

module.exports =  mongoose.model('registration',registerSchema)