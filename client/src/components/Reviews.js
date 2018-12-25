import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { fetchReviews } from "../actions/index";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";

const Reviews = ({ fetchReviews, reviews }) => {
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <List>
      {reviews &&
        reviews.map(({ avatar, title, body, username, _id }) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={title}
              secondary={
                <>
                  <Typography component="span" color="textPrimary">
                    {username}{" "}
                    <Button
                      variant="outlined"
                      href={`/products/product/${_id}`}
                    >
                      product
                    </Button>
                  </Typography>
                  {body}
                </>
              }
            />
          </ListItem>
        ))}
    </List>
  );
};

const mapStateToProps = state => ({
  reviews: state.productsReducer.reviews
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchReviews }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
