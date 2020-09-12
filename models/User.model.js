//User.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      firstName: {
        type: String,
        trim: true,
        required: [true, "Firstname is required."],
      },
      lastName: {
        type: String,
        trim: true,
        required: [true, "Lastname is required."],
      },
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: '/images/green-ava.png'
    },
    eventsHosting: [
      {
        type: Schema.Types.ObjectId, ref: "Event",
      },
    ],
    eventsAttending: [
      {
        type : Schema.Types.ObjectId, ref: "Event",
      },
    ],
    comments: [{ 
      type: Schema.Types.ObjectId, ref: 'Comment'
    }],
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);