const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomError = require("../errors/index");
const { checkPermissions } = require("../utils");

const getUser = async (req, res) => {
  const { id: resourceUserId } = req.params;
  if (!resourceUserId) {
    throw new CustomError.BadRequestError("No id provided in parameters");
  }

  // User whose info/resource was requested
  const resourceUser = await User.findOne({ _id: resourceUserId }).select({
    password: 0,
  });
  if (!resourceUser) {
    throw new CustomError.NotFoundError(
      `No user was found with userId ${resourceUserId}`
    );
  }

  // requestUser who is requesting info userId came from authenticating the user with jwt
  const requestUser = await User.findOne({ _id: req.user.userId }).select(
    "isLoggedIn"
  );
  if (!requestUser?.isLoggedIn) {
    throw new CustomError.UnauthorizedError(
      "Please log in first to access to this functionality"
    );
  }

  // Check if user has permissions to look up for this query
  checkPermissions(req.user, resourceUser._id);
  const { avatar, username, email } = resourceUser;
  res.status(StatusCodes.OK).json({ user: { avatar, username, email } });
};

const getAllUser = async (req, res) => {
  const users = await User.find({}).select("username email avatar").exec();
  res.status(StatusCodes.OK).json({ count: users.length, users });
};

const updatePassword = async (req, res) => {
  res.send("register");
};

const updateDetails = async (req, res) => {
  res.send("register");
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const deletedUser = await User.findOneAndDelete({ _id: userId }).select(
    "username email"
  );
  if (!deletedUser) {
    throw new CustomError.NotFoundError(
      `No user with id ${userId} exists in database.`
    );
  }
  res.json({ deletedUser });
};

const deleteAllUser = async (req, res) => {
  const deletedUsers = await User.deleteMany({});
  res.json({ msg: "Delete Successful", count: deletedUsers.deletedCount });
};

module.exports = {
  getUser,
  getAllUser,
  updateDetails,
  updatePassword,
  deleteUser,
  deleteAllUser,
};
