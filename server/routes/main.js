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
    product.image = faker.image.fashion();

    product.save(err => {
      if (err) throw err;
    });
  }
  res.end();
});
router.get("/generate-fake-reviews", (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) return next(err);
    products.forEach(product => {
      const review = new Review();
      review.username = faker.internet.userName();
      review.title = faker.random.words();
      review.body = faker.lorem.paragraph();
      review.avatar = faker.image.avatar();
      review.product = product;
      review.save();
      product.reviews.push(review);
      product.save(err => {
        if (err) throw err;
      });
    });
    res.end();
  });
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
            res.status(200);
            res.send([categorizedProducts, categories]);
          }
        );
      } else {
        res.status(200);
        res.send([products, categories]);
      }
    });
  });
});

//Returns a specific product by it's id
router.get("/products/product/:productId", (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .populate("reviews")
    .exec((err, product) => {
      if (err) {
        res.status(404);
        return next(err);
      }
      res.status(200);
      res.send(product);
    });
});
//Returns ALL the reviews, but limited to 40 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an options `page` query to paginate.
router.get("/reviews/:page", (req, res, next) => {
  const { page } = req.params;
  //no more than 50 pages
  const totalPages = 50;
  const limit = 40;
  const options = {
    page,
    limit,
    populate: "reviews"
  };
  //validate page
  if (Number(page) <= 0 || Number(page) > totalPages) {
    return res.sendStatus(404);
  }
  Product.paginate({}, options, (err, { docs: products }) => {
    if (err) {
      res.status(404);
      return next(err);
    }
    res.status(200);
    res.send(products);
  });
});
// Creates a new product in the database
router.post("/products", (req, res, next) => {
  const { category, name, price, image } = req.body;
  Product.create({ category, name, price, image }, (err, product) => {
    if (err) {
      res.status(404);
      return next(err);
    }
    res.status(200);
    res.send(product);
  });
});
// Creates a new review in the database by adding it to the correct product's reviews array
router.post("/:productId/reviews", (req, res, next) => {
  const { productId } = req.params;
  const { category, name, price, image } = req.body;
  //create review
  Review.create({ category, name, price, image }, (err, review) => {
    if (err) {
      res.status(404);
      return next(err);
    }
    //add review to specific product
    Product.findById(productId, (err, product) => {
      if (err) {
        res.status(404);
        return next(err);
      }
      res.status(200);
      product.reviews.push(review);
    });
  });
});
//Deletes a product by id
router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;
  if (!productId) {
    res.status(404);
    return next(err);
  }
  res.status(200);
  Product.findByIdAndRemove(productId).exec();
  res.end();
});
//Deletes a review by id
router.delete("/reviews/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;
  if (!reviewId) {
    res.status(404);
    return next(err);
  }
  res.status(200);
  Review.findByIdAndRemove(reviewId).exec();
  res.end();
});

module.exports = router;
