import React from "react";
import { ProductContainer } from "../styled_elements/index";

const Product = ({ category, name, price, image }) => (
  <ProductContainer>
    <h3>{name}</h3>
    <ul>
      <li>${price}</li>
      <li>{category}</li>
    </ul>
    <img src="https://picsum.photos/200/?random" alt="product" />
  </ProductContainer>
);

export default Product;
