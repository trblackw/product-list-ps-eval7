import React, { useState, useEffect } from "react";
import { useInputValue } from "../hooks/useInputValue";
import { useToggle } from "../hooks/useToggle";
import Nav from "./Nav";
import Product from "./Product";
import { LandingContainer } from "../styled_elements/layout";
import Grid from "@material-ui/core/Grid";
import Filters from "./Filters";
import Button from "@material-ui/core/Button";
// import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/index";
import { bindActionCreators } from "redux";

const Landing = ({ fetchProducts, products, categories }) => {
  const [open, toggle] = useToggle(false);
  //   const [page, setPage] = useState(1);
  //   const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Nav />
      {open && <Filters categories={categories} />}
      <LandingContainer>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggle}
          style={{ marginBottom: "1em" }}
        >
          Refine search
        </Button>
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
      </LandingContainer>
    </>
  );
};

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  categories: state.productsReducer.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
