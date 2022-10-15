const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('DB connection established');
  } catch (error) {
    console.log(error);
    throw new Error('DB initialization error');
  }
};

module.exports = {
  dbConnection,
};
