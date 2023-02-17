const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // Return if user tries to look up his/her own id
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  }

  // Otherwise throw an 401 error
  throw new CustomError.UnauthorizedError(
    "Not Authorized to access the resource"
  );
};

module.exports = checkPermissions;
