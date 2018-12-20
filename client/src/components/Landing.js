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

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, toggle] = useToggle(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    callAPI().then(([products, categories]) => {
      setProducts(products);
      setCategories(categories);
    });
  }, []);

  const callAPI = async () => {
    try {
      const res = await fetch(`/products/${page}`);
      const body = await res.json();
      if (res.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(categories);
  return (
    <>
      <Nav />
      {open && <Filters categories={categories} />}
      <LandingContainer>
        <Button variant="outlined" color="secondary" onClick={toggle}>
          Refine search
        </Button>
        <Grid container={true} spacing={35} xs zeroMinWidth>
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

export default Landing;
