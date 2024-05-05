const BadRequest = require("../../jobester-api/errors/bad-request-error");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  res.send("product 1");
};
const getSingleProduct = async (req, res) => {
  res.send("product 2");
};
const createProduct = async (req, res) => {
  const { name, category, company, colors } = req.body;

  if (!name || !category || !company || !colors) {
    throw new BadRequest(
      "You need to provide all the required info about the product."
    );
  }

  let product = await Product.findOne({ ...req.body, user: req.user._id });
  if (product) {
    throw new BadRequest("This product already exists.");
  }
  product = await Product.create({ ...req.body, user: req.user._id });
  return res.status(StatusCodes.CREATED).json({ product });
};
const updateProduct = async (req, res) => {
  res.send("product 4");
};
const deleteProduct = async (req, res) => {
  res.send("product 5");
};
const uploadImage = async (req, res) => {
  res.send("product 6");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
