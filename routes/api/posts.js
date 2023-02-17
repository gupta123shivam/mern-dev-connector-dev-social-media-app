const {
  getAllPosts,
  getPostsByUserId,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likeAPost,
  unlikeAPost,
  addAComment,
  removeAComment,
} = require("../../controllers/postController");

const express = require("express");
const router = express.Router();
const { authenticateUserMiddleware: auth } = require("../../middleware");
const { check } = require("express-validator");

// ==========================================
// Checks
const createPostChecks = [check("text", "text is required").not().isEmpty()];
const createCommentChecks = [check("text", "text is required").not().isEmpty()];
// =============================================
// Routes
router
  .route("/")
  .get(auth, getAllPosts)
  .post([auth, ...createPostChecks], createPost);

router.route("/user/:id").get(auth, getPostsByUserId);
router.route("/like/:id").put(auth, likeAPost);
router.route("/unlike/:id").put(auth, unlikeAPost);
router.route("/comments/:id").post([auth, ...createCommentChecks], addAComment);
router.route("/comments/:id/:comment_id").delete(auth, removeAComment);
router.route("/:id").get(auth, getPostById).delete(auth, deletePost);

module.exports = router;
