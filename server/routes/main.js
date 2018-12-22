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
    return res.status(404);
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

// router.get("/products/:page?/:category?/:sort?", (req, res, next) => {
//   const query = {};
//   for (let key in req.query) {
//     query[key] = req.query[key];
//   }
//   let { page, category, sort } = query;

//   if (Number(page) <= 0) {
//     const response = {
//       error: true,
//       guidance: "Invalid page number--page must be 1 or greater"
//     };
//     res.status(404);
//     return res.json(response);
//   }
//   //note that sorting can be done by prepending '-' or '+' to property (i.e. sort('-price'))
//   if (sort) {
//     if (sort === "highest") {
//       sort = -1;
//     } else if (sort === "lowest") {
//       sort = 1;
//     }
//   }

//   //find a given product by category, limiting results to 10 pages and sorting price by highest or lowest
//   Product.where({ category: { $regex: new RegExp(category), $options: "i" } })
//     .populate("product")
//     .limit(10)
//     .sort({ price: sort })
//     .skip(Number(page) * (10 - 1))
//     .exec((err, products) => {
//       //finds each distinct category in products database
//       //needs to be extracted out of this call
//       Product.find().distinct("category", (err, categories) => {
//         if (err) {
//           res.sendStatus(404);
//           return next(err);
//         }
//         Product.countDocuments({}, (err, count) => {
//           res.status(200);
//           res.send([products, categories, count]);
//         });
//       });
//     });
// });

//Returns a specific product by it's id
router.get("/products/:product", (req, res) => {
  const id = request.params.product;
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
