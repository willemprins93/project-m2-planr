///////////////////////////////////////////////////
// USER MODEL

User.model.js

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
        firstname: {
            type: String,
            trim: true,
            required: [true, 'Firstname is required.'],
            unique: true
            },
        lastname: {
            type: String,
            trim: true,
            required: [true, 'Lastname is required.'],
            unique: true
            },
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    photoUrl: {
      type: String
    },
    eventsHosting: [{
        type: Schema.Types.ObjectId, ref: 'Event'
    }],
    eventsAttending: [{
      type: Schema.Types.ObjectId, ref: 'Event'
  }],
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);



//////////////////////////////////////////////////////
// EVENT MODEL

Event.model.js

const { Schema, model } = require('mongoose')

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
    location: { 
      type: Schema.Types.ObjectId, ref: 'City' 
    },
    description: {
      type: String,
      maxlength: 140
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
  },
  {
    timestamps: true
  }
);

module.exports = model('Event', eventSchema);



////////////////////////////////////////////////////
// CITY MODEL

City.model.js

const { Schema, model } = require('mongoose')

const citySchema = new Schema(
  { 
    name: { 
      type: String,
      required :true
    },
    photoUrl: {
      type: String
    }
  },
    {
      timestamps: true
    }
);

module.exports = model('City', citySchema);