import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changePage } from "../actions/index";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";

const Page = ({ match, products }) => {
  const { page } = match.params;

  useEffect(() => {
    changePage(page);
  }, []);
  return (
     <Grid container={true} spacing={32} zeroMinWidth>
      {products &&
        products.map(({ _id, category, name, price, image }) => (
          <Product
            key={_id}
            category={category}
            name={name}
            price={price}
            image={image}
          />
        ))}
    </Grid>
  );
};

const mapStateToProps = state => ({
  products: state.productsReducer.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
