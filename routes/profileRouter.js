const express = require("express");
const {
  updateProfile,
  getUserProfile,
  follow,
  unfollow,
} = require("../controllers/profileController");
const { protect } = require("../utils/auth");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/me").patch(updateProfile);
router.route("/").get(getUserProfile);
router.route("/follow").patch(follow);
router.route("/unfollow").patch(unfollow);

module.exports = router;
