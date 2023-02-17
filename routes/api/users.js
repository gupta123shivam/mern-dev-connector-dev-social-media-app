const {
  getUser,
  getAllUser,
  updateDetails,
  updatePassword,
  deleteUser,
  deleteAllUser,
} = require("../../controllers/userContoroller");
const express = require("express");
const router = express.Router();
const { authenticateUserMiddleware } = require("../../middleware");
// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public

// TODO Setup anothe rauthprization so that only admin can view all users and delete all user
// TODO Just set up another checkPermissionAdmin in
router.route("/").get(getAllUser).delete(deleteAllUser);

router
  .route("/update-password")
  .patch(authenticateUserMiddleware, updatePassword);
router
  .route("/update-details")
  .patch(authenticateUserMiddleware, updateDetails);

router
  .use(authenticateUserMiddleware)
  .route("/:id")
  .get(authenticateUserMiddleware, getUser)
  .delete(authenticateUserMiddleware, deleteUser);

module.exports = router;
