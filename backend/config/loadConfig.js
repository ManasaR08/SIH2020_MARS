const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27018/ParaDemic',
  JWT: process.env.JWT || 'secret',
  TWILIO: process.env.TWILIO,
  TWILIO_AUTH: process.env.TWILIO_AUTH
};
