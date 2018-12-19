const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/test", (req, res) => {
  res.send("Connecting react and express!!!");
});

router.get("/generate-fake-data", (req, res) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image =
      "https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png";

    product.save(err => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  Product.find({}).exec((err, products) => {
    if (err) return next(err);
    res.send(products);
  });
});

router.get("/products/:page?/:category?/:sort?", (req, res, next) => {
  const query = {};
  for (let key in req.query) {
    query[key] = req.query[key];
  }
  let { page, category, sort } = query;
  //hacky temporary solution
  if (category) {
    category = `${category.charAt(0).toUpperCase()}${category
      .split("")
      .slice(1)
      .join("")}`;
    return category;
  }

  if (sort) {
    if (sort.toLowerCase() === "highest") {
      sort = "descending";
      return sort;
    } else if (sort.toLowerCase() === "lowest") {
      sort = "ascending";
      return sort;
    }
  }

  //just category
  Product.where({ category })
    .populate("product")
    .limit(10)
    .sort({ price: sort })
    .exec((err, products) => {
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err);
        res.send(products);
      });
    });

  //   Product.find({ category })
  //     .populate("product")
  //     .limit(10)
  //     .exec((err, products) => {
  //       Product.countDocuments().exec((err, count) => {
  //         if (err) return next(err);
  //         if (sort) {
  //           if (sort.toLowerCase() === "highest") {
  //             products = products.sort((a, b) => b.price - a.price);
  //           } else {
  //             products = products.sort((a, b) => a.price - b.price);
  //           }
  //         }
  //         res.send(products);
  //       });
  //     });
});

//Returns a specific product by it's id
router.get("/products/:product", (req, res) => {});
//Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options `page` query to paginate.
router.get("/reviews", (req, res) => {});
// Creates a new product in the database
router.post("/products", (req, res) => {});
// Creates a new review in the database by adding it to the correct product's reviews array
router.post("/:product/reviews", (req, res) => {});
//Deletes a product by id
router.delete("/products/:product", (req, res) => {});
//Deletes a review by id
router.delete("/reviews/:review", (req, res) => {});

module.exports = router;
