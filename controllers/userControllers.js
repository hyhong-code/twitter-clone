const User = require("../models/User");
const CustomError = require("../utils/customError");
const asyncHandler = require("../utils/asyncHandler");

//@DESC     REGISTER A USER
//@ROUTER   POST /api/v1/users/register
//@ACCESS   PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ status: "success", data: { user } });
});
