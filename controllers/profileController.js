const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { Profile, User, Post } = require("../models");
const { checkPermissions, isUserLoggedIn } = require("../utils");
const { validationResult } = require("express-validator");
const request = require("request");
require("dotenv").config();

const getCurrentProfile = async (req, res) => {
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);
  const profile = await Profile.findOne({ user: req.user.userId }).populate(
    "user",
    ["username", "avatar"]
  );
  if (!profile) {
    throw new CustomError.NotFoundError(
      `There is no Profile for user with id ${req.user.userId} .`
    );
  }

  // It is redundant if only user with role user are present.
  //If any editor or admin is present, then even if admin has not created the profilr,
  // but will have access to all the profiles, there checking permissions will be neccesity
  // Check if user has permissions to look up for this query
  // checkPermissions(req.user, profile.user);

  res.status(StatusCodes.OK).json(profile);
};
const getProfileById = async (req, res) => {
  const { id: resourceId } = req.params;
  if (!resourceId) {
    throw new CustomError.BadRequestError(
      "No profile id provided in parameters"
    );
  }

  // Profile whose info/resource was requested
  const resource = await Profile.findOne({ _id: resourceId })
    .select({
      password: 0,
    })
    .populate("user", ["avatar", "username"]);
  if (!resource) {
    throw new CustomError.NotFoundError(
      `No profile was found with Id ${resourceId}`
    );
  }

  await isUserLoggedIn(req.user.userId);

  // Check if user has permissions to look up for this query
  checkPermissions(req.user, resource.user._id);
  const profile = resource;
  res.status(StatusCodes.OK).json(profile);
};
const getProfileByUserId = async (req, res) => {
  // here resourceId is user id in profile
  const { id: resourceId } = req.params;
  if (!resourceId) {
    throw new CustomError.BadRequestError(
      "No profile id provided in parameters"
    );
  }

  // Profile whose info/resource was requested
  const resource = await Profile.findOne({ user: resourceId })
    .select({
      password: 0,
    })
    .populate("user", ["avatar", "username"]);
  if (!resource) {
    throw new CustomError.NotFoundError(
      `No profile was found with Id ${resourceId}`
    );
  }
  const profile = resource;
  res.status(StatusCodes.OK).json(profile);
};
const getAllProfile = async (req, res) => {
  const profiles = await Profile.find({}).populate("user", [
    "username",
    "avatar",
  ]);
  if (profiles.length < 1) {
    throw new CustomError.NotFoundError(`There are no Profiles in database .`);
  }

  // It is redundant if only user with role user are present.
  //If any editor or admin is present, then even if admin has not created the profilr,
  // but will have access to all the profiles, there checking permissions will be neccesity
  // Check if user has permissions to look up for this query
  // checkPermissions(req.user, profile.user);

  res.status(StatusCodes.OK).json(profiles);
};
// create and update profile
const createProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  const profile = await Profile.findOne({ user: req.user.userId });
  if (profile) {
    if (handle) profile.handle = handle;
    if (company) profile.company = company;
    if (website) profile.website = website;
    if (location) profile.location = location;
    if (bio) profile.bio = bio;
    if (status) profile.status = status;
    if (githubusername) profile.githubusername = githubusername;
    // Skills - Spilt into array
    if (typeof skills !== "undefined") {
      profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Social
    profile.social = {};
    if (youtube) profile.social.youtube = youtube;
    if (twitter) profile.social.twitter = twitter;
    if (facebook) profile.social.facebook = facebook;
    if (linkedin) profile.social.linkedin = linkedin;
    if (instagram) profile.social.instagram = instagram;

    await profile.save().then((profile) => {
      return res.status(StatusCodes.CREATED).json(profile);
    });
  } else {
    // create the profile

    // check if the provided handle exists already or not
    const userWithHandle = await Profile.findOne({
      handle: profileFields.handle,
    });
    if (userWithHandle) {
      throw new CustomError.BadRequestError("That handle already exists");
    }

    new Profile(profileFields)
      .save()
      .then((profile) => res.status(StatusCodes.CREATED).json(profile));
  }
};

// Delete Profile, user and all posts
const deleteProfile = async (req, res) => {
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);
  const profile = await Profile.findOne({ user: req.user.userId }).select(
    "user"
  );
  if (!profile) {
    throw new CustomError.NotFoundError(
      `There is no Profile for user with id ${req.user.userId} .`
    );
  }

  // Check if this user has paermission s to remove the profile
  checkPermissions(req.user, profile.user);
  await Post.findManyAndRemove({ user: req.user.userId });
  await Profile.findOneAndRemove({ user: req.user.userId });
  await User.findOneAndRemove({ _id: req.user.userId });

  //TODO Remove Posts

  res.status(StatusCodes.OK).json(profile);
};

const addProfileExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);

  const { title, company, location, from, to, current, description } = req.body;
  await Profile.findOne({ user: req.user.userId }).then((profile) => {
    if (!profile) {
      throw new CustomError.NotFoundError(
        `There is no Profile for user with id ${req.user.userId} .`
      );
    }

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then((profile) => res.status(StatusCodes.OK).json(profile));
  });
};

const deleteProfileExperience = async (req, res) => {
  const { exp_id } = req.params;
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);

  await Profile.findOne({ user: req.user.userId }).then((profile) => {
    if (!profile) {
      throw new CustomError.NotFoundError(
        `There is no Profile for user with id ${req.user.userId} .`
      );
    }

    // Get experiences after removing the exp to be removed
    profile.experience = profile.experience.filter(
      (item) => item.id !== exp_id
    );

    profile.save().then((profile) => res.status(StatusCodes.OK).json(profile));
  });
};

const addProfileEducation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;
  await Profile.findOne({ user: req.user.userId }).then((profile) => {
    if (!profile) {
      throw new CustomError.NotFoundError(
        `There is no Profile for user with id ${req.user.userId} .`
      );
    }

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    // Add to exp array
    profile.education.unshift(newEdu);

    profile.save().then((profile) => res.status(StatusCodes.OK).json(profile));
  });
};

const deleteProfileEducation = async (req, res) => {
  const { edu_id } = req.params;
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);

  await Profile.findOne({ user: req.user.userId }).then((profile) => {
    if (!profile) {
      throw new CustomError.NotFoundError(
        `There is no Profile for user with id ${req.user.userId} .`
      );
    }

    // Get experiences after removing the exp to be removed
    profile.education = profile.education.filter((item) => item.id !== edu_id);

    profile.save().then((profile) => res.status(StatusCodes.OK).json(profile));
  });
};

const getGithubUserRepo = async (req, res) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.GITHUB_OAUTH_CLIENT_SECRET}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };

  request(options, (err, response, body) => {
    if (err) {
      throw new Error(err);
    }
    if (response.statusCode !== 200) {
      throw new CustomError.NotFoundError("No Github profile found");
    }
    res.status(StatusCodes.OK).json(JSON.parse(body));
  });
};

module.exports = {
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
};
