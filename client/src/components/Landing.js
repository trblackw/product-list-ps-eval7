import React, { useState, useEffect } from "react";
import { useToggle } from "../hooks/useToggle";
import Nav from "./Nav";
import { LandingContainer } from "../styled_elements/layout";
import Filters from "./Filters";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/index";
import { bindActionCreators } from "redux";
import { Pages } from "../styled_elements/layout";
import ProductList from "./ProductList";

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
        <ProductList products={products} />
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
