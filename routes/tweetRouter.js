const express = require("express");

const { protect } = require("../utils/auth");
const {
  getTweets,
  getTweet,
  createTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet,
} = require("../controllers/tweetController");

const commentRouter = require("./commentRouter");

const router = express.Router({ mergeParams: true });

router.use("/:tweetId/comments", commentRouter);

router.route("/").get(getTweets).post(protect, createTweet);
router.route("/:id").get(getTweet).delete(protect, deleteTweet);
router.route("/:id/like").patch(protect, likeTweet);
router.route("/:id/unlike").patch(protect, unlikeTweet);

module.exports = router;
