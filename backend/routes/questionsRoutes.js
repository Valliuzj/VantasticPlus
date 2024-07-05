const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const addQuestionController = require("../controllers/questions/addQuestion");

router.post("/addQuestion", addQuestionController.addQuestion);

module.exports = router;