const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("debug", true);
const Product = require("./product");

const ReviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
      min: 0,
      max: 5
    }
  },
  { timestamps: true }
);

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
