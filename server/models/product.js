const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("debug", true);

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
