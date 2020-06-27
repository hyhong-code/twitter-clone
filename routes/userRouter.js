const express = require("express");

const { protect } = require("../utils/auth");
const { register, login, loadMe } = require("../controllers/userControllers");

const tweetRouter = require("./tweetRouter");
const router = express.Router();

router.use("/:userId/tweets", tweetRouter);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/loadme").get(protect, loadMe);

module.exports = router;
