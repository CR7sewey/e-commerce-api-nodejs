const Order = require("../models/Order");
const Product = require("../models/Product");
const BadRequest = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const NotFound = require("../errors/not-found");
const checkPermissions = require("../utils/checkPermissions");

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
  const { shippingFee, tax, items } = req.body;

  if (!items || items.length < 1) {
    throw new BadRequest("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new BadRequest("Please provide tax and shipping fee");
  }
  let orderItems = [];
  let subTotal = 0;
  //const [{ product: id, amount }] = items;
  for (const item of items) {
    const { product: id, amount } = item;
    // First val - Prdouct exists?
    const productExists = await Product.findOne({ _id: id });
    if (!productExists) {
      throw new NotFound("Doesn't exists this product - " + item.product);
    }
    // Stock is enough?
    const stockAvailable = await Product.findOne({
      _id: id,
      inventory: { $gte: amount },
    });
    if (!stockAvailable) {
      throw new BadRequest(
        "There's not enough inventory available - " + item.product
      );
    }
    const { name, price, image, _id } = stockAvailable;
    orderItems = [...orderItems, { amount, name, price, image, product: _id }]; // adding orders (items)
    subTotal += price * amount;
  }
  console.log(subTotal, orderItems);

  return res.json({ msg: "order successfull" });
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
