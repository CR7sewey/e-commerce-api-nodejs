require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateToken = ({ user }) => {
  const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyToken = ({ token }) =>
  jwt.verify(token, process.env.TOKEN_SECRET_KEY);

module.exports = { generateToken, verifyToken };
