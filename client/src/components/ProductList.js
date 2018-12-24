import React from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product";

const ProductList = ({ products }) => (
  <>
    <Grid container={true} spacing={32} zeroMinWidth>
      {products &&
        products.map(({ _id, category, name, price, image }) => (
          <Product
            key={_id}
            id={_id}
            category={category}
            name={name}
            price={price}
            image={image}
          />
        ))}
    </Grid>
  </>
);

export default ProductList;
