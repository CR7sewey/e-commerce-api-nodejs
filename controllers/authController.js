const register = async (req, res) => {
  return res.send("Register");
};

const login = async (req, res) => {
  return res.send("Login");
};

const logout = async (req, res) => {
  return res.send("Logout");
};

module.exports = { register, login, logout };
