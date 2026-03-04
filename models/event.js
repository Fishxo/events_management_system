const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  startDateTime: {
    type: Date,
    required: true
  },

  endDateTime: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    enum: [
      "Conference",
      "Workshop",
      "Seminar",
      "Music",
      "Concert",
      "Business",
      "Meetup",
      "Hackathon",
      "Exhibition",
      "Other"
    ],
    required: true
  },

  price: {
    type: Number,
    min: 0,
    default: 0
  },

  capacity: {
    type: Number,
    min: 1,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);