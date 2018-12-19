const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/test", (req, res) => {
  res.send("Connecting react and express!!!");
});

router.get("/generate-fake-data", (req, res) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department().toLowerCase();
    product.name = faker.commerce.productName().toLowerCase();
    product.price = faker.commerce.price().toLowerCase();
    product.image =
      "https://picsum.photos/200/300/?random";

    product.save(err => {
      if (err) throw err;
    });
  }
  res.end();
});

// router.get("/products", (req, res, next) => {
//   Product.find({}).exec((err, products) => {
//     if (err) return next(err);
//     res.send(products);
//   });
// });

router.get("/products/:page?/:category?/:sort?", (req, res, next) => {
  const query = {};
  for (let key in req.query) {
    query[key] = req.query[key];
  }
  let { page, category, sort } = query;

  if (Number(page) <= 0) {
    const response = {
      error: true,
      guidance: "Invalid page number--page must be 1 or greater"
    };
    res.status(404);
    return res.json(response);
  }

  if (sort) {
    if (sort === "highest") {
      sort = "descending";
    } else if (sort === "lowest") {
      sort = "ascending";
    }
  }

  //just category
  Product.where({ category: { $regex: new RegExp(category), $options: "i" } })
    .populate("product")
    .limit(10)
    .skip(10 * Number(page - 1))
    .sort({ price: sort })
    .exec((err, products) => {
      Product.countDocuments().exec((err, count) => {
        if (err) {
          res.sendStatus(404);
          return next(err);
        }
        res.status(200);
        res.send(products);
      });
    });
});

//Returns a specific product by it's id
router.get("/products/:product", (req, res) => {
  const product = Product.findById(id).exec();
  if (!product) {
    res.sendStatus(404);
  }
  res.status(200);
  res.send(product);
});
//Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options `page` query to paginate.
router.get("/reviews", (req, res) => {});
// Creates a new product in the database
router.post("/products", (req, res) => {
  const { category, name, price } = req.body;
  const product = Product.create({ category, name, price });

  if (!product) {
    res.sendStatus(404);
  }
  res.sendStatus(200);
  res.send(product);
});
// Creates a new review in the database by adding it to the correct product's reviews array
router.post("/:product/reviews", (req, res) => {});
//Deletes a product by id
router.delete("/products/:product", (req, res) => {});
//Deletes a review by id
router.delete("/reviews/:review", (req, res) => {});

module.exports = router;
