const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department().toLowerCase();
    product.name = faker.commerce.productName().toLowerCase();
    product.price = faker.commerce.price().toLowerCase();
    product.image = "https://picsum.photos/200/200/?random";

    product.save(err => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products/:page", (req, res, next) => {
  const { category, price } = req.query;
  const { page } = req.params;
  const limit = 10;
  const totalPages = 50;
  const options = {
    page,
    limit,
    populate: "product",
    sort: { price: price ? (price === "highest" ? 1 : -1) : null }
  };

  if (Number(page) <= 0 || Number(page) > totalPages) {
    return res.sendStatus(404);
  }
  Product.paginate({}, options, (err, products) => {
    Product.find().distinct("category", (err, categories) => {
      if (err) {
        res.status(404);
        return next(err);
      }
      if (category) {
        Product.paginate(
          { category: { $regex: new RegExp(category), $options: "i" } },
          options,
          (err, categorizedProducts) => {
            if (err) {
              res.status(404);
              return next(err);
            }
            res.send([categorizedProducts, categories]);
          }
        );
      } else {
        res.send([products, categories]);
      }
    });
  });
});

//Returns a specific product by it's id
router.get("/products/product/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id).exec((err, product) => {
    if (err) {
      res.status(404);
      return next(err);
    }
    res.status(200);
    res.send(product);
  });
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
