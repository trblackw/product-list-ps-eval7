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
import { Pages } from "../styled_elements/layout";

const generatePages = products => {
  let pages;
  for (let i = 0; i < products.length; i += 10) {
    pages += i;
  }
  return pages;
};

const Landing = ({ fetchProducts, products, categories, page }) => {
  const [open, toggle] = useToggle(false);

  useEffect(() => {
    fetchProducts(page);
  }, []);
   console.log(products)
  return (
    <>
      <Nav />
      {open && <Filters categories={categories} />}
      {/* <Pages>
        {pages.map((page, i) => (
          <li key={page[i].id}>
            <button
              onClick={() => this.changePage(i)}
              className={i === activePage ? "active" : "page"}
            >
              Page {i + 1}
            </button>
          </li>
        ))}
      </Pages> */}
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
  categories: state.productsReducer.categories,
  page: state.productsReducer.page
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
