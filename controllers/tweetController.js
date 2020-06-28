const Tweet = require("../models/Tweet");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError.js");
const QueryOptions = require("../utils/queryOptions");
const Profile = require("../models/Profile");
const path = require("path");
const sharp = require("sharp");

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
  let tweet = await Tweet.create(req.body);
  tweet = await tweet.execPopulate({ path: "user", select: "handle" });

  // HANDLE PHOTO UPLOAD
  if (req.files && req.files.file) {
    const fileName = `tweet-${tweet._id}.jpeg`;
    await sharp(req.files.file.data)
      .resize(1024, 576)
      .jpeg()
      .toFile(
        path.resolve(`${__dirname}/../client/public/uploads/tweets/${fileName}`)
      );

    // UPDATAE FILENAME TO DB
    tweet.photo = fileName;
    await tweet.save({ validateBeforeSave: true });
  }

  res.status(201).json({
    status: "success",
    data: { tweet },
  });
});

// @DESC     DELETE A TWEET
// @ROUTE    DELETE /api/v1/tweets/:id
// @ACCESS   PRIVATE
exports.deleteTweet = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.id);

  // HANDLE TWEET NOT EXISTS
  if (!tweet) {
    return next(new CustomError(`No tweet with id ${req.params.id}`, 404));
  }

  console.log(tweet, req.user);

  // HANDLE TWEET DOES NOT BELONGS TO USER
  if (tweet.user._id.toString() !== req.user.id) {
    return next(new CustomError(`Tweet does not belong to user`, 401));
  }

  await tweet.remove();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// @DESC     Like A TWEET
// @ROUTE    PATCH /api/v1/tweets/:id/like
// @ACCESS   PRIVATE
exports.likeTweet = asyncHandler(async (req, res, next) => {
  // const tweet = await Tweet.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $addToSet: { likes: req.user.id },
  //   },
  //   { new: true, runValidators: true }
  // );

  const tweet = await Tweet.findById(req.params.id);

  // HANDLE TWEET NOT EXIST
  if (!tweet) {
    return next(new CustomError(`No such tweet with id ${req.params.id}`, 404));
  }

  // HANDLE USER ALREADY LIKED THIS TWEET
  if (tweet.likes.includes(req.user.id)) {
    return next(new CustomError(`You already liked this tweet`, 400));
  }

  tweet.likes.unshift(req.user.id);
  await tweet.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    data: { tweet },
  });
});

// @DESC     UNLIKE A TWEET
// @ROUTE    PATCH /api/v1/tweets/:id/unlike
// @ACCESS   PRIVATE
exports.unlikeTweet = asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findById(req.params.id);

  // HANDLE TWEET NOT EXIST
  if (!tweet) {
    return next(new CustomError(`No such tweet with id ${req.params.id}`, 404));
  }

  // HANDLE USER NOT YET LIKED THE TWEET
  if (!tweet.likes.includes(req.user.id)) {
    return next(new CustomError(`You have not yet liked this tweet`, 400));
  }

  tweet.likes = tweet.likes.filter((like) => like.toString() !== req.user.id);
  await tweet.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    data: { tweet },
  });
});
