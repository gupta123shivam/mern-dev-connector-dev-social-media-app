const {
  authenticateUser: authenticateUserMiddleware,
} = require("./authenticate");
const { errorHandlerMiddleware } = require("./error-handler");
const { notFound: notFoundMiddleware } = require("./not-found");

module.exports = {
  authenticateUserMiddleware,
  errorHandlerMiddleware,
  notFoundMiddleware,
};
