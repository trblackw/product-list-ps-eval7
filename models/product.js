const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
mongoose.set("debug", true);

const ProductSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number,
  image: String
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
