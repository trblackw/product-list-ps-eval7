import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../actions/index";
import { bindActionCreators } from "redux";
import Product from "./Product";
import {
  ProductContainer,
  SingleProductContainer
} from "../styled_elements/product";
import Button from "@material-ui/core/Button";

const SelectedProduct = ({ match, fetchSingleProduct, product }) => {
  useEffect(() => {
    const { product: id } = match.params;
    fetchSingleProduct(id);
  }, []);

  return (
    <SingleProductContainer>
      <Button variant="extendedFab" color="secondary" href="/">
        Go back
      </Button>
      <ProductContainer>
        {product && (
          <Product
            category={product.category}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        )}
      </ProductContainer>
    </SingleProductContainer>
  );
};

const mapStateToProps = state => ({
  product: state.productsReducer.product
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleProduct }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProduct);
