const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const profileController = require("../../controllers/profile");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Public
router.get("/me", auth, profileController.getCurrentUserProfile);

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Public
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  profileController.postAddProfile
);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get("/", profileController.getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", profileController.getProfileByUserId);

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, profileController.deleteUserAndProfile);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],

  profileController.putAddProfileExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  auth,
  profileController.deleteExperienceFromProfile
);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],

  profileController.putAddProfileEducation
);

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  auth,
  profileController.deleteEducationFromProfile
);

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get("/github/:username", profileController.getUserFromGithub);

module.exports = router;
