const express = require("express");

const { protect } = require("../utils/auth");
const {
  getTweets,
  getTweet,
  createTweet,
  deleteTweet,
} = require("../controllers/tweetController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getTweets).post(protect, createTweet);
router.route("/:id").get(getTweet).delete(protect, deleteTweet);

module.exports = router;
