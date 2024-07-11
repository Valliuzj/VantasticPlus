const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addQuestionController = require("../controllers/questions/addQuestion");
const getQuestionController = require("../controllers/questions/getSingleQuestion");

router.post("/addQuestion", addQuestionController.addQuestion);
router.get("/getSingleQuestion", getQuestionController.getSingleQuestion);

module.exports = router;