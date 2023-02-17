const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unathorized");

const CustomError = {
  CustomAPIError,
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
};

module.exports = CustomError;
