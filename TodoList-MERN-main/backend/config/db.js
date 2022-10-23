const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const appDb = await mongoose.connect(process.env.MONGO_URI);

    console.log(`*** MongoDB connected: ${appDb.connection.host} ***`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
