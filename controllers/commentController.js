const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const Comment = require("../models/Comment");
const Tweet = require("../models/Tweet");
const QueryOptions = require("../utils/queryOptions");

// @DESC     CREATE A COMMENT
// @ROUTE    POST /api/v1/tweets/:tweetId/comments
// @ACCESS   PRIVATE
exports.createComment = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.tweetId);

  // HANDLE TWEET NOT EXIST
  if (!tweet) {
    return next(
      new CustomError(`No such tweet with id ${req.params.tweetId}`, 404)
    );
  }

  req.body.tweet = tweet._id;
  req.body.user = req.user.id;
  let comment = await Comment.create(req.body);

  // POPULAE USER HANDLE
  comment = await comment.execPopulate({
    path: "user",
    select: "handle photo",
  });

  res.status(201).json({
    status: "success",
    data: { comment },
  });
});

// @DESC     GET ALL COMMENTS OF A TWEET
// @ROUTE    GET /api/v1/tweets/:tweetId/comments
// @ACCESS   PRIVATE
exports.getComments = asyncHandler(async (req, res, next) => {
  const query = Comment.find({ tweet: req.params.tweetId }).populate({
    path: "user",
    select: "handle photo",
  });

  // ENABLE QUERY OPTIONS
  const comments = await new QueryOptions(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate().query;

  res.status(200).json({
    status: "success",
    data: { comments },
  });
});

// @DESC     DELETE A COMMENT
// @ROUTE    DELETE /api/v1/comments/:id
// @ACCESS   PRIVATE
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  // HANDLE COMMENT NOT EXIST
  if (!comment) {
    return next(
      new CustomError(`No such comment with id ${req.params.id}`, 404)
    );
  }

  // HANDLE USER NOT OWNER OF COMMENT
  if (comment.user.toString() !== req.user.id) {
    return next(new CustomError(`User not authorized`, 401));
  }

  await comment.remove();
  res.status(204).json({
    status: "success",
    data: { comment },
  });
});
