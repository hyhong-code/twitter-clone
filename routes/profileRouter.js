const express = require("express");
const {
  updateProfile,
  getUserProfile,
} = require("../controllers/profileController");
const { protect } = require("../utils/auth");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/me").patch(updateProfile);
router.route("/").get(getUserProfile);

module.exports = router;
