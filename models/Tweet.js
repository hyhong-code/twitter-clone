const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  text: {
    type: Text,
    required: true,
    trim: true,
    minlength: [5, "A tweet must be at least 5 characters long"],
    maxlength: [140, "A tweet must be at least 140 characters long"],
  },
  user: {
    type: mongoose.Schema.OBjectId,
    ref: "Uesr",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = monoose.model("Tweet", TweetSchema);
