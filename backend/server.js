require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = require('./app');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});