import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../actions/index";
import { bindActionCreators } from "redux";
import Product from "./Product";
import {
  ProductContainer,
  SingleProductContainer,
  ReviewSection
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
      <ReviewSection>
        {product &&
          product.reviews.map(({ username, title, body }) => (
            <div>
              <h3>{title}</h3>
              <small>{username}</small>
              <p>{body}</p>
            </div>
          ))}
      </ReviewSection>
    </SingleProductContainer>
  );
};

const mapStateToProps = ({ productsReducer }) => ({
  product: productsReducer.product
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleProduct }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProduct);
