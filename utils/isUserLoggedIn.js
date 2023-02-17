const CustomError = require("../errors");
const User = require("../models/User");

const isUserLoggedIn = async (_id) => {
  const user = await User.findOne({ _id }).select("-password");
  if (user && user.isLoggedIn) {
    return;
  }
  throw new CustomError.UnauthorizedError(
    "User requesting the data is not logged in. Please log in first"
  );
};
module.exports = isUserLoggedIn;
