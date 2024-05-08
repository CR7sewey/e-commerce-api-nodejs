const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "must provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "must provide a rating title"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 chars"],
    },
    comment: {
      type: String,
      required: [true, "must provide product description"],
      maxlength: [1000, "Description cannot be more than 1000 chars"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

// compound indexes - unique, https://www.mongodb.com/community/forums/t/setting-unique-compound-index-in-schema-definition/4393
// onlu one review per prodcut
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
