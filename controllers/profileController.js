const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const sharp = require("sharp");
const path = require("path");

// @DESC     UPDATE LOGGED IN USER PROFILE
// @ROUTE    PATCH /api/v1/profile/me
// @ACCESS   PRIVATE
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // HANDLE PROFILE PICTURE
  if (req.files && req.files.file) {
    const fileName = `user-${req.user.id}.jpeg`;
    const filePath = path.resolve(
      `${__dirname}/../client/public/uploads/users/${fileName}`
    );
    await sharp(req.files.file.data).resize(400, 400).jpeg().toFile(filePath);

    // SAVE FILENAME TO DB
    profile.photo = fileName;
    await profile.save({ validateBeforeSave: true });
  }

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

// @DESC     GET A USER'S PROFILE
// @ROUTE    GET /api/v1/users/:userId/profile/
// @ACCESS   PRIVATE
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId });

  // HANDLE PROFILE NOT EXIST
  if (!profile) {
    return next(
      new CustomError(`No such profile with user id ${req.params.userId}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

// @DESC     FOLLOW A USER
// @ROUTE    PATCH /api/v1/users/:userId/profile/follow
// @ACCESS   PRIVATE
exports.follow = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId });
  const myProfile = await Profile.findOne({ user: req.user.id });

  // HANDLE USER PROFILE NOT EXIST
  if (!profile) {
    return next(new CustomError(`No user with id ${req.params.userId}`, 404));
  }

  // HANDLE ALREADY FOLLOW USER
  if (profile.followers.includes(myProfile._id)) {
    return next(new CustomError(`You are already following this user`, 400));
  }

  // FOLLOW THE USER
  profile.followers.unshift(myProfile._id);
  myProfile.following.unshift(profile._id);
  await profile.save({ validateBeforeSave: true });
  await myProfile.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

// @DESC     UNFOLLOW A USER
// @ROUTE    PATCH /api/v1/users/:userId/profile/unfollow
// @ACCESS   PRIVATE
exports.unfollow = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId });
  const myProfile = await Profile.findOne({ user: req.user.id });

  // HANDLE USER PROFILE NOT EXIST
  if (!profile) {
    return next(new CustomError(`No user with id ${req.params.userId}`, 404));
  }

  // HANDLE ALREADY FOLLOW USER
  if (!profile.followers.includes(myProfile._id)) {
    return next(new CustomError(`You are now yet following this user`, 400));
  }

  // UNFOLLOW THE USER
  profile.followers = profile.followers.filter(
    (follower) => follower.toString() !== myProfile._id.toString()
  );
  myProfile.following = myProfile.following.filter(
    (following) => following.toString() !== profile._id.toString()
  );
  await profile.save({ validateBeforeSave: true });
  await myProfile.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

// @DESC     GET FOLLOWING AND FOLLOWERS
// @ROUTE    GET /api/v1/profile/:profileId
// @ACCESS   PRIVATE
exports.getFollow = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findById(req.params.profileId);

  // HANDLE PROFILE NOT EXIST
  if (!profile) {
    return next(
      new CustomError(`No such profile with id ${req.params.profileId}`, 404)
    );
  }

  profile = await profile.execPopulate("followers following");

  res.status(200).json({
    status: "success",
    data: profile,
  });
});
