const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('successfully connected top database');
  } catch (e) {
    console.error(`error occurred while connecting to database: ${e}`);
  }
};
