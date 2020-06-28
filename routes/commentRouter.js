const express = require("express");
const { protect } = require("../utils/auth");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

router.route("/").post(protect, createComment).get(protect, getComments);
router.route("/:id").delete(protect, deleteComment);

module.exports = router;
