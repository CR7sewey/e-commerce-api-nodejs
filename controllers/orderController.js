const getAllOrders = async (req, res) => {
  res.send("orders 1");
};

const getSingleOrder = async (req, res) => {
  res.send("orders 2");
};

const getCurrentUserOrders = async (req, res) => {
  res.send("orders 3");
};

const createOrder = async (req, res) => {
  res.send("orders 4");
};

const updateOrder = async (req, res) => {
  res.send("orders 5");
};

module.exports = {
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
};
