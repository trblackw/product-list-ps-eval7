const express = require("express");
const mongoose = require("mongoose");
const connect = require("./connect");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost:27017/products");
const port = process.env.PORT || 8080;

const app = express();

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

connect("mongodb://localhost:27017/products")
  .then(() => {
    app.listen(port, () => console.log(`runnin on ${port}`));
  })
  .catch(e => console.error(e));
