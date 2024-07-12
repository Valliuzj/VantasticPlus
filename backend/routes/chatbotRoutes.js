const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot/chatbot');

router.post('/chatbot', chatbotController.chatbot);

module.exports = router;