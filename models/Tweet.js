const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "A tweet must be at least 5 characters long"],
      maxlength: [140, "A tweet must be at least 140 characters long"],
    },
    photo: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

TweetSchema.virtual("profile", {
  ref: "Profile",
  localField: "user",
  foreignField: "user",
  justOne: true,
});

TweetSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "tweet",
  justOne: false,
});

TweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "handle",
  })
    .populate({
      path: "profile",
      select: "photo ",
    })
    .populate({
      path: "comments",
    });
  next();
});

module.exports = mongoose.model("Tweet", TweetSchema);
