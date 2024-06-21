const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('', require('./routes/usersRoutes'));
app.use('', require('./routes/postsRoutes'));

module.exports = app;