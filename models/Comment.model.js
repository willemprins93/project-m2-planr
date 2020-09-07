const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, ref: 'User'
   },
    date: { 
      type: Date, 
      default: Date.now
    },
    text: { 
      type: String,
      maxlength: 200 
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('Comment', commentSchema);

