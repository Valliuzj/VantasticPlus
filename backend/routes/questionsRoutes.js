const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addQuestionController = require("../controllers/questions/addQuestion");
const getQuestionController = require("../controllers/questions/getSingleQuestion");
const getQuestionByCategoryController = require("../controllers/questions/getQuestionByCategory");
const answerQuestionController = require("../controllers/questions/answerQuestion");
const likeQuestionController = require("../controllers/questions/likeQuestion");
const recommendController = require("../controllers/questions/recommend");

router.post("/addQuestion", addQuestionController.addQuestion);
router.get("/getSingleQuestion", getQuestionController.getSingleQuestion);
router.get("/getQuestionByCategory", getQuestionByCategoryController.getQuestionByCategory);
router.post("/answerQuestion", protect, answerQuestionController.answerQuestion);
router.post("/likeQuestion", protect, likeQuestionController.likeQuestion);
router.get("/recommend", protect, recommendController.recommend);

module.exports = router;