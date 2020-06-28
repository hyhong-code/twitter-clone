const express = require("express");
const { protect } = require("../utils/auth");
const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").post(createComment).get(getComments);
router.route("/:id").delete(deleteComment);

module.exports = router;
