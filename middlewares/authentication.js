const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");
require("dotenv").config();

const tokenExists = async (req, res, next) => {
  let token = req.signedCookies.token;
  if (!token) {
    const authorization = req.headers.authorization;
    token = authorization.split(" ")[1];
    if (!authorization && token.startsWith("Bearer")) {
      res.setHeader("WWW-Authenticate", "Basic");
      throw new UnauthenticatedError("You need to log in to access this page!");
    }
    if (token === "null") {
      res.setHeader("WWW-Authenticate", "Basic");
      throw new UnauthenticatedError("You need to log in to access this page!"); // noy logged in
    }
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours = 24 x 60 minutes x 60 seconds x 1000 (bcs in milis)
    });
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
    //req.user = {id: dados._id, name: dados.name, role: dados.role}
    req.user = user;
    next();
  } catch (e) {
    throw new UnauthenticatedError("Invalid or Expired token");
  }
};

module.exports = tokenExists;
