const express = require("express");

const { protect } = require("../utils/auth");
const {
  getTweets,
  getTweet,
  createTweet,
} = require("../controllers/tweetController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getTweets).post(protect, createTweet);
router.route("/:id").get(getTweet);

module.exports = router;
