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
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

TweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "handle",
  });
  next();
});

module.exports = mongoose.model("Tweet", TweetSchema);
