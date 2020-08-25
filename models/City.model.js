//City.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//var ObjectId = mongoose.Schema.Types.ObjectId;

const citySchema = new Schema(
  { 

    name: { 
      type: String,
      required :true
    },
    photoUrl: {
      type: String
    },
    // _id: {
    //   type:String
    // }
  },
    {
      timestamps: true
    }
);

module.exports = model('City', citySchema);