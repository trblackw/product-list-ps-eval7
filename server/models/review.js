const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("debug", true);
const Product = require("./product");

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    review: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      required: true,
      ref: "product"
    }
  },
  { timestamps: true }
);

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;