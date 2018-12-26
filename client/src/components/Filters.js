import React, { useState, useEffect } from "react";
import { FilterContainer } from "../styled_elements/layout";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { applyFilters } from "../actions/index";
import { bindActionCreators } from "redux";

const Filters = ({ categories, products, applyFilters }) => {
  const [checked, setChecked] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(
    () => {
      applyFilters(checked, products);
    },
    [checked]
  );

  const handleCategory = value => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked = [...newChecked, value];
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handlePrice = e => {
    setPrice(e.target.value);
  };
  return (
    <FilterContainer>
      <List className="dropdown">
        <Typography variant="subtitle2">Categories</Typography>
        {categories.map(category => (
          <ListItem
            key={category}
            dense
            button
            onClick={() => handleCategory(category)}
          >
            <Checkbox
              checked={checked.indexOf(category) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <FormControl style={{ width: "20%", margin: "2.1em 0 0 0" }}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Select value={price} onChange={handlePrice}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Low to high</MenuItem>
          <MenuItem value={-1}>High to low</MenuItem>
        </Select>
      </FormControl>
    </FilterContainer>
  );
};

const mapStateToProps = ({ productsReducer }) => ({
  categories: productsReducer.categories,
  products: productsReducer.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ applyFilters }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
