//Event.model.js

// Importing mongoose and geocoder modules require this Event model
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const geocoder = require('../utils/geocoder');

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      maxlength: 150
    },
    date: {
        type: Date,
        default: Date.now, 
        required: true
    },
    address: {
      type: String,
      //required: [true, 'Please add an address']
    },
    city:{
      type: String,
    },
    location: {
      type: {
        //type: Schema.Types.ObjectId, ref: 'City'
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String
    },
    photoUrl: {
        type: String,
    },
    type : {
      type: String
    },
    host: { 
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    attendees: [{ 
      type: Schema.Types.ObjectId, ref: 'User' 
    }],
    comments: [{ 
      type: Schema.Types.ObjectId, ref: 'Comment'
    }],

  },
  {
    timestamps: true
  }
);

//Geocode and create location
eventSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  console.log(loc)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});


module.exports = model('Event', eventSchema);





