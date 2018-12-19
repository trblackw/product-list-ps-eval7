import React, { useState, useEffect } from "react";
import { useInputValue } from "../hooks/useInputValue";
import Nav from "./Nav";
import Product from "./Product";
import { ProductGrid } from "../styled_elements/index";

const Landing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    callAPI().then(products => setProducts(products));
  }, []);

  const callAPI = async () => {
    try {
      const res = await fetch("/products");
      const body = await res.json();
      if (res.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products);
  return (
    <>
      <Nav />
      <ProductGrid>
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
      </ProductGrid>
    </>
  );
};

export default Landing;
