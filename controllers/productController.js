const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  // TODO: PAGINATION AND FILTERING
  const products = await Product.find({});
  return res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  /*if (!id) {
    throw new BadRequest("You need to provide an ID.");
  }*/
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFound("There is no product with this ID.");
  }
  return res.status(StatusCodes.OK).json({ product });
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
  // check readme for notes!
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("You need to provide an ID.");
  }
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    throw new NotFound("There is no product with this ID.");
  }
  return res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequest("You need to provide an ID.");
  }
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFound("There is no product with this ID.");
  }
  await Product.deleteOne({ _id: id });
  return res.status(StatusCodes.OK).json({ msg: "Success. Product removed!" });
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
