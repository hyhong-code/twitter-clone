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
    { new: true, runValidators: true }
  );

  // HANDLE PROFILE PICTURE
  if (req.files && req.files.file) {
    const fileName = `user-${req.user.id}.jpeg`;
    await sharp(req.files.file.data)
      .resize(400, 400)
      .jpeg()
      .toFile(
        path.resolve(`${__dirname}/../client/public/uploads/users/${fileName}`)
      );

    // SAVE FILENAME TO DB
    profile.photo = fileName;
    await profile.save({ validateBeforeSave: true });
  }

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

// @DESC     UPDATE A USER'S PROFILE
// @ROUTE    GET /api/v1/users/:userId/profile/
// @ACCESS   PRIVATE
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: "user",
    select: "handle",
  });

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
