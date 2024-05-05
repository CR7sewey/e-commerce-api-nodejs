const Review = require("../models/Review");

const createReview = (req, res) => {
  res.send("review 1");
};
const getAllReviews = (req, res) => {
  res.send("review 2");
};

const getSingleReview = (req, res) => {
  res.send("review 3");
};

const updateReview = (req, res) => {
  res.send("review 4");
};

const deleteReview = (req, res) => {
  res.send("review 5");
};

module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getSingleReview,
  deleteReview,
};
