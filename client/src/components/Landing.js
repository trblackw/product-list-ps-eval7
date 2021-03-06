import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToggle } from "../hooks/useToggle";
import {
  LandingContainer,
  FlexContainer,
  Button
} from "../styled_elements/layout";
import Filters from "./Filters";
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
        <FlexContainer>
          <Link to="#">
            <Button onClick={toggle}>Refine search</Button>
          </Link>
          <Link to="/reviews">
            <Button>View reviews</Button>
          </Link>
        </FlexContainer>

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
