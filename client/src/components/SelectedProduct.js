import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/index";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";

const SelectedProduct = ({ match, products }) => {
  const { product: id } = match.params;
  console.log(id);
  useEffect(() => {}, []);
  return <div>hey</div>;
};

const mapStateToProps = state => ({
  products: state.productsReducer.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps)(SelectedProduct);
