const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addPostController = require("../controllers/posts/addPost");

router.post("/addPost", protect, addPostController.addPost);

module.exports = router;