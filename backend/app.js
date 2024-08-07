const express = require('express');
const app = express();
const cors = require('cors');
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('', require('./routes/usersRoutes'));
app.use('', require('./routes/postsRoutes'));
app.use('', require('./routes/questionsRoutes'));
app.use('', require('./routes/chatbotRoutes'));

module.exports = app;