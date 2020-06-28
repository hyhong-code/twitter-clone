const express = require("express");
const { updateProfile } = require("../controllers/profileController");
const { protect } = require("../utils/auth");

const router = express.Router({ mergeParams: true });

router.route("/me").patch(protect, updateProfile);

module.exports = router;
