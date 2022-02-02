const mongoose = require("mongoose");

const database = async () => {
  const uri = process.env.MONGO_DB;
  try {
    await mongoose.connect(uri, () => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = database;
