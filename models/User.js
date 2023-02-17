const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Must provide Name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Must provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: process.env.NODE_ENV === "production",
  },
  password: {
    type: String,
    required: [true, "Must provide Passwrd"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.genAccessToken = function () {
  const accessToken = jwt.sign(
    {
      user: {
        username: this.username,
        userId: this._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
  );
  return accessToken;
};

UserSchema.methods.genRefreshToken = async function () {
  // Creating JWT signed Refresh tokens
  const refreshToken = jwt.sign(
    {
      user: {
        username: this.username,
        userId: this._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
  );
  this.refreshToken = refreshToken;
  await this.save(); // to save the changes to document

  return this.refreshToken;
};

UserSchema.methods.getRefreshToken = async function () {
  if (!this.refreshToken) {
    await this.genRefreshToken();
  }
  return this.refreshToken;
};

UserSchema.methods.loggedIn = async function () {
  this.isLoggedIn = true;
  await this.save();
};

UserSchema.methods.loggedOut = async function () {
  // Set isLoggedIn to false and also erase refreshToken
  this.isLoggedIn = false;
  this.refreshToken = "";
  await this.save();
};

UserSchema.methods.getName = function () {
  return this.username;
};

UserSchema.methods.getEmail = function () {
  return this.email;
};

UserSchema.methods.getUser = function () {
  return this.select({ password: 0 });
};

module.exports = mongoose.model("User", UserSchema);
