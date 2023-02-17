require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/index");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    throw new CustomError.BadRequestError(
      "Auth Headers not present or have bad configuration"
    );
  }

  // const token = authHeader.split(" ")[1];
  const token = authHeader;
  if (!token) {
    throw new CustomError.UnauthenticatedError(
      "Authorization Failed. Did not receive Bearer token"
    );
  }

  // Verify with jwt
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    // If error in jwt verification, throw an error,
    // which is handled in error-handler middleware
    if (err) {
      throw new CustomError.UnauthenticatedError(
        "Could not verify the JWT token"
      );
    }
    // Attach the user and his permissions to the req object
    req.user = { ...payload.user };
    next();
  });
};

module.exports = { authenticateUser };
