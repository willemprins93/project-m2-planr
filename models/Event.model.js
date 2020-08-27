//Event.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//var ObjectId = require('mongoose').ObjectId

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now, 
        required: true
    },
    location:{ 
      //type: Schema.Types.ObjectId, ref: 'City' 
      type : String,
    },
    description: {
      type: String,
      maxlength: 150
    },
    photoUrl: {
        type: String,
    },
    type : {
      type: [String]
    },
    host: { 
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    attendees: [{ 
      type: Schema.Types.ObjectId, ref: 'User' 
    }],
  },
  {
    timestamps: true
  }
);

module.exports = model('Event', eventSchema);
