const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const getAllUsers = async (req, res) => {
  return res.send("Users 1");
};

const getSingleUser = async (req, res) => {
  return res.send("Users 2");
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
