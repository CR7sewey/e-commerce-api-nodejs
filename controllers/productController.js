const getAllProducts = async (req, res) => {
  res.send("product 1");
};
const getSingleProduct = async (req, res) => {
  res.send("product 2");
};
const createProduct = async (req, res) => {
  res.send("product 3");
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
