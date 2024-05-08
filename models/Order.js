const mongoose = require("mongoose");

const SingleCartItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide product name"],
  },
  price: {
    type: Number,
    required: [true, "must provide product price"],
    default: 0,
  },
  image: {
    type: String,
    required: [true, "must provide product image"],
  },
  amount: {
    type: Number,
    required: [true, "must provide product amount"],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product", // reference to User model
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleCartItemSchema],
    status: {
      type: String,
      enum: ["pending", "delivered", "failed", "paid", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
    clientSecret: { type: String, required: true },
    paymentId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
