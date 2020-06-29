const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  photo: {
    type: String,
    default: "default.png",
  },
  address: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Profile",
      },
    ],
  },
  following: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Profile",
      },
    ],
  },
});

// POPULATE USER HANDLE
ProfileSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "handle",
  });
  next();
});

module.exports = mongoose.model("Profile", ProfileSchema);
