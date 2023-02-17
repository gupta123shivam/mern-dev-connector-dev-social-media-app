const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { checkPermissions, isUserLoggedIn } = require("../utils");
const { validationResult } = require("express-validator");
const { Profile, User, Post } = require("../models");

const getAllPosts = async (req, res) => {
  await isUserLoggedIn(req.user.userId);

  const posts = await Post.find({})
    .populate("user", ["username", "avatar"])
    .sort({ date: -1 });
  if (posts.length < 1) {
    throw new CustomError.NotFoundError(`There are no Posts in database .`);
  }

  // checkPermissions(req.user, post.user);

  res.status(StatusCodes.OK).json(posts);
};

const getPostsByUserId = async (req, res) => {
  await isUserLoggedIn(req.user.userId);

  // here resourceId is user id in profile
  const { id: resourceId } = req.params;
  if (!resourceId) {
    throw new CustomError.BadRequestError("No user id provided in parameters");
  }

  // Post whose info/resource was requested
  const resource = await Post.find({ user: resourceId })
    .select({
      password: 0,
    })
    .populate("user", ["avatar", "username"]);
  if (resource.length < 1) {
    throw new CustomError.NotFoundError(
      `No post was found for userId ${resourceId}`
    );
  }
  const posts = resource;
  res.status(StatusCodes.OK).json(posts);
};

const getPostById = async (req, res) => {
  await isUserLoggedIn(req.user.userId);
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Did not found the post with id ${postId}`
    );
  }

  // checkPermissions(req.user, post.user);

  res.status(StatusCodes.OK).json(post);
};

const createPost = async (req, res) => {
  runValidationResults(req, res);

  await isUserLoggedIn(req.user.userId);
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError("No user was found");
  }

  const postFields = {
    text: req.body.text,
    name: user.username,
    avatar: user.avatar,
    user: user._id,
  };

  const post = await Post.create(postFields);
  res.status(StatusCodes.CREATED).json(post);
};

const updatePost = async (req, res) => {
  res.send("u posts");
};

const deletePost = async (req, res) => {
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new CustomError.NotFoundError(`Post not found`);
  }

  // Check if this user has paermission s to remove the profile
  checkPermissions(req.user, post.user);
  await Post.findOneAndRemove({ _id: post._id });

  res.status(StatusCodes.OK).json(post);
};

const likeAPost = async (req, res) => {
  await isUserLoggedIn(req.user.userId);
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    throw new CustomError.NotFoundError(`Post not found`);
  }
  // TODO
  // Check if the post was by the same user or not
  // if (post.user.toString() === req.user.userId) {
  //   throw new CustomError.BadRequestError("Post can not be liked by your own");
  // }

  // Check if the post is liked by this user already
  const isAlreadyLikedByUser =
    post.likes.filter((like) => like.user.toString() === req.user.userId)
      .length > 0;
  if (isAlreadyLikedByUser) {
    throw new CustomError.BadRequestError("Post already liked");
  }

  post.likes.unshift({ user: req.user.userId });
  await post.save().then((post) => {
    return res.status(StatusCodes.OK).json(post.likes);
  });
};

const unlikeAPost = async (req, res) => {
  await isUserLoggedIn(req.user.userId);
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    throw new CustomError.NotFoundError(`Post not found`);
  }

  // Check if the post is liked by this user already
  const userId = req.user.userId;
  const isAlreadyLikedByUser =
    post.likes.filter((like) => like.user.toString() === userId).length > 0;
  if (!isAlreadyLikedByUser) {
    throw new CustomError.BadRequestError("You have not yet liked the post");
  }

  post.likes = post.likes.filter((like) => like.user.toString() !== userId);
  await post.save().then((post) => {
    return res.status(StatusCodes.OK).json(post.likes);
  });
};

const addAComment = async (req, res) => {
  await isUserLoggedIn(req.user.userId);
  const user = await User.findById(req.user.userId).select("-password");
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new CustomError.NotFoundError(`Post not found`);
  }
  // Check if the post was by the same user or not
  // if (post.user.toString() === req.user.userId) {
  //   throw new CustomError.BadRequestError("Post can not be liked by your own");
  // }

  const newComment = {
    text: req.body.text,
    name: user.username,
    avatar: user.avatar,
    user: user._id,
  };

  post.comments.unshift(newComment);
  await post.save().then((post) => {
    return res.status(StatusCodes.CREATED).json(post.comments);
  });
};

const removeAComment = async (req, res) => {
  // If user is logged in or not
  await isUserLoggedIn(req.user.userId);
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new CustomError.NotFoundError(`Post not found`);
  }
  // Pull out comment
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );
  if (!comment) {
    throw new CustomError.NotFoundError(`Comment not found`);
  }

  // Check if this user has permission s to remove the profile
  checkPermissions(req.user, comment.user);
  // Update post.comments
  post.comments = post.comments.filter(
    (c) => c._id.toString() !== req.params.comment_id
  );
  await post.save().then((post) => {
    res.status(StatusCodes.OK).json(post.comments);
  });
};

function runValidationResults(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
}

module.exports = {
  getAllPosts,
  getPostsByUserId,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likeAPost,
  unlikeAPost,
  addAComment,
  removeAComment,
};
