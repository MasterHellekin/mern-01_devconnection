const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const postsController = require("../../controllers/posts");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  postsController.postAddPost
);

// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get("/", auth, postsController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get("/:id", auth, postsController.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, postsController.deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, postsController.putLikePost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, postsController.putUnlikePost);

// @route   POST api/posts/comments/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  postsController.postAddCommentPost
);

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete("/comment/:id/:comment_id", auth, postsController.deleteComment);

module.exports = router;
