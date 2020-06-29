const express = require("express");
const {
  updateProfile,
  getUserProfile,
  follow,
} = require("../controllers/profileController");
const { protect } = require("../utils/auth");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/me").patch(updateProfile);
router.route("/").get(getUserProfile);
router.route("/follow").patch(follow);

module.exports = router;
