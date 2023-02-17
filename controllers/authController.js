const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const User = require("../models/User");
const CustomError = require("../errors/index");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");

const getUser = async (req, res) => {

  const user = await User.findById(req.user.userId).select("username email avatar date");

  if (!user) {
    throw new CustomError.NotFoundError("No User exists with token");
  }
  res.status(StatusCodes.OK).json(user);
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new CustomError.BadRequestError(
      "Did not provide all the required fields"
    );
  }
  // Checking if a user with the provided eail already exists or NOT
  const foundUser = await User.findOne({ email }).select("-password");
  if (foundUser) {
    throw new CustomError.BadRequestError(
      `A user with the email ${email} exists. Please use another email`
    );
  }

  // Get user gravatar
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  // password hashing
  // 1. in userController
  // 2. in save hook of mongoose
  const salt = await bcryptjs.genSalt(10);
  const hashedPwd = await bcryptjs.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPwd,
    avatar,
  });

  // Attaching cookie to the response
  const refreshToken = await user.genRefreshToken();
  res.cookie("token", refreshToken, {
    // httpOnly: true,
    // sameSite: "None",
    secure: process.env.NODE_ENV === "production" ? true : false,
    // signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  // Sending back the response
  userData = { name: user.username, userId: user._id, email: user.email };
  res.status(StatusCodes.CREATED).json({
    msg: "User created",
    token: refreshToken,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please provide both email and password"
    );
  }

  // Finding is a user with email is in database
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new CustomError.UnauthenticatedError(
      `No user with email ${email} exists.`
    );
  }
  // Checking if password matches
  const match = await bcryptjs.compare(password, foundUser.password);
  if (!match) {
    throw new CustomError.UnauthenticatedError(`Wrong Password`);
  }

  // Set isLoggedIn to true;
  await foundUser.loggedIn();

  // TODO only allot new refreshToken when previous one expires
  // TODO Can implement accessToken and refreshToken concept,
  // one havin longer expiry and other one having shorter expiry
  // Attaching cookie to the response
  const refreshToken = await foundUser.genRefreshToken();
  res.cookie("token", refreshToken, {
    httpOnly: true,
    // sameSite: "None",,
    secure: process.env.NODE_ENV === "production" ? true : false,
    // signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  // Sending back the response
  res.status(StatusCodes.OK).json({
    msg: "User Logged In",
    token: refreshToken,
  });
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.token;
  if (!refreshToken) {
    throw new CustomError.BadRequestError(
      `No token was recieved in cookie named 'token'`
    );
  }

  const foundUser = await User.findOne({ refreshToken }).select({
    password: 0,
  });
  if (!foundUser || !foundUser.isLoggedIn) {
    throw new CustomError.BadRequestError(
      "No user is logged in. First log in, to logout"
    );
  }

  // Set isLoggedIn to false;
  await foundUser.loggedOut();

  // Token expires in 10 seconds
  const tokenExpirey = process.env.NODE_ENV === "production" ? 0 : 20000;
  res.cookie("token", "random", {
    httpOnly: true,
    // sameSite: "None",,
    secure: process.env.NODE_ENV === "production" ? false : true,
    // signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    expires: new Date(Date.now() + tokenExpirey),
  });

  // Sending back the response
  userData = {
    username: foundUser.username,
    userId: foundUser._id,
  };
  res.status(StatusCodes.OK).json({
    msg: "User Logged Out",
    user: userData,
    date: Date.now,
  });
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
