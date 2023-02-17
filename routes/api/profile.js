const {
  getCurrentProfile,
  getProfileById,
  getProfileByUserId,
  getAllProfile,
  createProfile,
  deleteProfile,
  addProfileExperience,
  deleteProfileExperience,
  addProfileEducation,
  deleteProfileEducation,
  getGithubUserRepo,
} = require("../../controllers/profileController");
const express = require("express");
const router = express.Router();
const { authenticateUserMiddleware } = require("../../middleware");
const { check } = require("express-validator");
// ========================================================
// Checks
const createProfileChecks = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

const addProfileExperienceChecks = [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From data is required").not().isEmpty(),
];

const addProfileEducationChecks = [
  check("school", "Title is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldofstudy", "Field of Study data is required").not().isEmpty(),
  check("from", "From data is required").not().isEmpty(),
];
//=============================================================
// Routes
// @route   GET api/profiles/test
// @desc    Tests profiles route
// @access  Public
router.get("/", getAllProfile);
router.get('/github/:username', getGithubUserRepo)
router.get("/me", authenticateUserMiddleware, getCurrentProfile);
router.route("/user/:id").get(getProfileByUserId);

router
  .route("/")
  .post([authenticateUserMiddleware, ...createProfileChecks], createProfile)
  .delete(authenticateUserMiddleware, deleteProfile);
// =======================================
// Experience
router
  .route("/experience")
  .post(
    [authenticateUserMiddleware, ...addProfileExperienceChecks],
    addProfileExperience
  );
router
  .route("/experience/:exp_id")
  .delete([authenticateUserMiddleware], deleteProfileExperience);
// ======================================
// Education
router
  .route("/education")
  .post(
    [authenticateUserMiddleware, ...addProfileEducationChecks],
    addProfileEducation
  );
router
  .route("/education/:edu_id")
  .delete([authenticateUserMiddleware], deleteProfileEducation);
// ==============================
router.route("/:id").get(authenticateUserMiddleware, getProfileById);

module.exports = router;
