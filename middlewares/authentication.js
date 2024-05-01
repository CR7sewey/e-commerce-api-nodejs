const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");
require("dotenv").config();

const tokenExists = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const [, token] = authorization.split(" ");
  if (!authorization && token.startsWith("Bearer")) {
    throw new UnauthenticatedError("You need to log in to access this page!");
  }
  if (token === "null") {
    throw new UnauthenticatedError("You need to log in to access this page!"); // noy logged in
  }
  try {
    const dados = verifyToken({ token });
    const user = await User.findOnde({
      _id: dados.id,
      name: dados.name,
      role: dados.role,
    }).select("-password");
    if (!user) {
      throw new UnauthenticatedError(
        "User invalid, please generate a new token!"
      );
    }
    req.user = user;
    next();
  } catch (e) {
    throw new UnauthenticatedError("Invalid or Expired token");
  }
};

module.exports = tokenExists;
