const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connectDB;
