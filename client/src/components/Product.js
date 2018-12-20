import React from "react";
import { ProductContainer } from "../styled_elements/index";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import PageviewIcon from "@material-ui/icons/Pageview";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

const Product = ({ category, name, price, image }) => (
  <ProductContainer>
    <Card>
      <Typography variant="h6">{name}</Typography>
      <Chip
        avatar={
          <Avatar>
            <PageviewIcon />
          </Avatar>
        }
        label={category}
      />
      <CardActionArea>
        <CardMedia
          image="https://picsum.photos/200/?random"
          title="product image"
        />
      </CardActionArea>
      <img src="https://picsum.photos/200/?random" alt="product" />
      <Typography variant="subtitle2">${price}</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "1em auto" }}
      >
        Add to cart
      </Button>
    </Card>
  </ProductContainer>
);

export default Product;
