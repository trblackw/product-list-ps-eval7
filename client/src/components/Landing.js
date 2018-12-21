import React, { useState, useEffect } from "react";
import { useInputValue } from "../hooks/useInputValue";
import { useToggle } from "../hooks/useToggle";
import { Redirect } from "react-router-dom";
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

const Landing = ({ fetchProducts, products, total, pages }) => {
  const [open, toggle] = useToggle(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(
    () => {
      fetchProducts(activePage);
    },
    [activePage]
  );

  const handlePageClick = page => {
    setActivePage(page);
  };

  const generatePages = () => {
    let pageLinks = [];
    for (let i = 1; i <= 10; i++) {
      pageLinks.push(
        <li key={i}>
          <button
            onClick={() => handlePageClick(i)}
            className={i === activePage ? "active" : "page"}
          >
            Page {i}
          </button>
        </li>
      );
    }
    return pageLinks;
  };
  const pageCrumbs = generatePages();
  return (
    <>
      <Nav />
      {open && <Filters />}
      <LandingContainer>
        <div>
          <Pages>{pageCrumbs}</Pages>
        </div>
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
  total: state.productsReducer.total,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
