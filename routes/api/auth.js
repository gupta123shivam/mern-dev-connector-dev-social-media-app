const {
  register,
  login,
  logout,
  getUser,
} = require("../../controllers/authController");
const express = require("express");
const router = express.Router();
const { authenticateUserMiddleware } = require("../../middleware");

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get("/", authenticateUserMiddleware, getUser);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticateUserMiddleware, logout);

module.exports = router;
