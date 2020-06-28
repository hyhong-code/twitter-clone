const express = require("express");

const { protect } = require("../utils/auth");
const {
  getTweets,
  getTweet,
  createTweet,
  deleteTweet,
} = require("../controllers/tweetController");

const commentRouter = require("./commentRouter");

const router = express.Router({ mergeParams: true });

router.use("/:tweetId/comments", commentRouter);

router.route("/").get(getTweets).post(protect, createTweet);
router.route("/:id").get(getTweet).delete(protect, deleteTweet);

module.exports = router;
