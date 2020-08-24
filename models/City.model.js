//City.model.js

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