const Tweet = require("../models/Tweet");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError.js");
const QueryOptions = require("../utils/queryOptions");

// @DESC     GET TWEETS / GET TWEETS OF A USER
// @ROUTE    GET /api/v1/tweets
// @ROUTE    GET /api/v1/users/:userId/tweets
// @ACCESS   PUBLIC
exports.getTweets = asyncHandler(async (req, res, next) => {
  // HANDLE GET TWEETS BY UESR
  const filter = {};
  if (req.params.userId) filter.user = req.params.userId;

  // ENABLE QUERY OPTIONS
  const query = Tweet.find(filter);
  const tweets = await new QueryOptions(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate().query;

  res.status(200).json({
    status: "success",
    data: { tweets },
  });
});

// @DESC     GET A TWEET
// @ROUTE    GET /api/v1/tweets/:id
// @ACCESS   PUBLIC
exports.getTweet = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.id);

  // HANDLE TWEET NOT EXIST
  if (!tweet) {
    return next(new CustomError(`No tweet with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: { tweet },
  });
});

// @DESC     CREATE A TWEET
// @ROUTE    POST /api/v1/tweets
// @ACCESS   PRIVATE
exports.createTweet = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const tweet = await Tweet.create(req.body);

  res.status(201).json({
    status: "success",
    data: { tweet },
  });
});
