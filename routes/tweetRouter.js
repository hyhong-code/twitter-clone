const express = require("express");

const { protect } = require("../utils/auth");
const {
  getTweets,
  getTweet,
  createTweet,
  deleteTweet,
  likeTweet,
} = require("../controllers/tweetController");

const commentRouter = require("./commentRouter");

const router = express.Router({ mergeParams: true });

router.use("/:tweetId/comments", commentRouter);

router.use(protect);

router.route("/").get(getTweets).post(createTweet);
router.route("/:id").get(getTweet).delete(deleteTweet);
router.route("/:id/like").patch(likeTweet);

module.exports = router;
