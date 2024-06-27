const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addPostController = require("../controllers/posts/addPost");
const addCommentController = require("../controllers/posts/addComment");
const getSinglePostController = require("../controllers/posts/getSinglePost");
const getAllPostsController = require("../controllers/posts/getAllPosts");

router.post("/addPost", protect, addPostController.addPost);
router.post("/addComment", protect, addCommentController.addComment);
router.get("/getSinglePost/:postID", getSinglePostController.getSinglePost);
router.get("/getAllPosts", getAllPostsController.getAllPosts);

module.exports = router;