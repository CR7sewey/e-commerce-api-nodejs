const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/bad-request");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userWithEmail = await User.findOne({ email });
  if (email && userWithEmail) {
    // double check!
    throw new BadRequest("Email already exists!");
  }

  // first register user is a admin
  const isFirstAcc = (await User.countDocuments({})) === 0;
  const role = isFirstAcc ? "admin" : "user";

  const user = await User.create({ name, email, password, role }); // not ...req.body to not pass directly the role if inserted in postman!
  const userToken = { name, id: user._id, role: user.role };
  const token = generateToken({ user: userToken });
  return res.status(StatusCodes.CREATED).json({ user: userToken, token });
};

const login = async (req, res) => {
  return res.send("Login");
};

const logout = async (req, res) => {
  return res.send("Logout");
};

module.exports = { register, login, logout };
