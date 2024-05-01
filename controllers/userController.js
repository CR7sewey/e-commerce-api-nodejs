const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");

const UnauthenticatedError = require("../errors/unauthenticated");

const getAllUsers = async (req, res) => {
  const actualUser = req.user;
  if (actualUser.role !== "admin") {
    throw new BadRequest("You are not authorized to access this route.");
  }
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const actualUser = req.user;
  if (actualUser.role !== "admin") {
    throw new BadRequest("You are not authorized to access this route.");
  }
  const { id } = req.params;
  const user = await User.findOne({ role: "user", _id: id }).select(
    "-password"
  );
  if (!user) {
    throw new NotFound("User does not exists."); // or not allowed if admin
  }
  return res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  return res.send("Users 3");
};

const updateUser = async (req, res) => {
  return res.send("Users 4");
};

const updateUserPassword = async (req, res) => {
  return res.send("Users 5");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
