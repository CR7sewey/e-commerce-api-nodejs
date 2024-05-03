const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 chars"],
    },
    price: {
      type: Number,
      required: [true, "must provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "must provide product description"],
      maxlength: [1000, "Description cannot be more than 1000 chars"],
    },
    image: {
      type: String,
      default: "/upload/messi.jpeg",
    },
    category: {
      type: String,
      required: [true, "must provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "must provide product company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: [true, "must provide product color"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
