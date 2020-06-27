const User = require("../models/User");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

// AUTHENTICATE USER
exports.protect = asyncHandler(async (req, res, next) => {
  // EXTRACT BEARER TOKEN
  let token;
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  // HANDLE NO TOKEN
  if (!token) {
    return next(new CustomError(`No token, please login`, 401));
  }

  // HANDLE TEMPERED TOKEN
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new CustomError(`Token invalid, please login again`, 401));
  }

  const user = await User.findById(decoded.id);

  // HANDLE USER DELETED
  if (!user) {
    return next(new CustomError(`User not found`, 404));
  }

  req.user = user;
  next();
});
