const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addQuestionController = require("../controllers/questions/addQuestion");
const getQuestionController = require("../controllers/questions/getSingleQuestion");
const getQuestionByCategoryController = require("../controllers/questions/getQuestionByCategory");

router.post("/addQuestion", addQuestionController.addQuestion);
router.get("/getSingleQuestion", getQuestionController.getSingleQuestion);
router.get("/getQuestionByCategory", getQuestionByCategoryController.getQuestionByCategory);

module.exports = router;