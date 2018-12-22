const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

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

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
