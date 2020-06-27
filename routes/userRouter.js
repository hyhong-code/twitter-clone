const express = require("express");

const { protect } = require("../utils/auth");

const { register, login, loadMe } = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/loadme").get(protect, loadMe);

module.exports = router;
