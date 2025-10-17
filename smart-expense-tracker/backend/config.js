require('dotenv').config();
module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/expense_tracker',
  jwtSecret: process.env.JWT_SECRET || 'verysecretkey',
  port: process.env.PORT || 4000,
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8001'
};
