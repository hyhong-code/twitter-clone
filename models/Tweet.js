const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "A tweet must be at least 5 characters long"],
    maxlength: [140, "A tweet must be at least 140 characters long"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Uesr",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Tweet", TweetSchema);
