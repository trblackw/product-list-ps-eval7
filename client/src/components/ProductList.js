import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ProductList = ({ products, filteredProducts, filters }) => {
  useEffect(
    () => {
      console.log(filters);
    },
    [products, filteredProducts]
  );
  return (
    <Grid container={true} spacing={32} zeroMinWidth>
      {!filters
        ? products &&
          products.map(({ _id, category, name, price, image }) => (
            <Product
              key={_id}
              id={_id}
              category={category}
              name={name}
              price={price}
              image={image}
            />
          ))
        : filteredProducts.map(({ _id, category, name, price, image }) => (
            <Product
              key={_id}
              id={_id}
              category={category}
              name={name}
              price={price}
              image={image}
            />
          ))}
    </Grid>
  );
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
  filters: productsReducer.filters,
  filteredProducts: productsReducer.filteredProducts
});

// const mapDispatchToProps = {};

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ProductList);
