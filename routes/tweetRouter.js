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

router.use(protect);

router.route("/").get(getTweets).post(createTweet);
router.route("/:id").get(getTweet).delete(deleteTweet);
router.route("/:id/like").patch(likeTweet);
router.route("/:id/unlike").patch(unlikeTweet);

module.exports = router;
