const express = require("express");
const {
  updateProfile,
  getUserProfile,
} = require("../controllers/profileController");
const { protect } = require("../utils/auth");

const router = express.Router({ mergeParams: true });

router.route("/me").patch(protect, updateProfile);
router.route("/").get(protect, getUserProfile);

module.exports = router;
