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
});

module.exports = mongoose.model("Profile", ProfileSchema);
