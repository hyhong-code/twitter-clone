const User = require("../models/User");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");

// @DESC     REGISTER A USER
// @ROUTE    POST /api/v1/users/register
// @ACCESS   PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.signJwtToken();
  res.status(201).json({
    status: "success",
    data: { token },
  });
});

// @DESC     LOGIN A USER
// @ROUTE    POST /api/v1/users/login
// @ACCESS   PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
  const { handle, password } = req.body;
  const user = await User.findOne({ handle });

  // HANDLE USER NOT EXIST
  if (!user) {
    return next(new CustomError(`No such user with handle ${handle}`, 404));
  }

  // HANDLE PASSWORD INCORRECT
  if (!(await user.isCorrectPassword(password))) {
    return next(new CustomError(`Invalid credentials`, 401));
  }

  // SIGN JWT
  const token = user.signJwtToken();
  res.status(200).json({
    status: "success",
    data: { token },
  });
});

// @DESC     LOAD CURRENT USER
// @ROUTE    POST /api/v1/users/loadMe
// @ACCESS   PRIVATE
exports.loadMe = asyncHandler(async (req, res, next) => {
  const { id, handle, email } = req.user;
  res.status(200).json({
    status: "success",
    data: {
      user: { id, handle, email },
    },
  });
});
