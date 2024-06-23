const mongoose = require("mongoose");

exports.connectDB = async function () {
  const URI = process.env.MONGODB_URI;
  const connectionParams = {};

  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(URI, connectionParams);
    console.info("Connection established");
  } catch (err) {
    console.error("Error: " + err.message);
    process.exit(1);
  }
};
