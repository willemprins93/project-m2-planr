//Event.model.js

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
