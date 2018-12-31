import React, { useEffect } from "react";
import { FormContainer, Form } from "../styled_elements/form";
import { useInputValue } from "../hooks/useInputValue";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addProduct } from "../actions/index";

const AddProduct = ({ categories, addProduct }) => {
  const category = useInputValue("Tools");
  const name = useInputValue("");
  const price = useInputValue(0);
  const image = useInputValue("");

  useEffect(
    () => {
      console.log(categories);
    },
    [categories]
  );
  return (
    <FormContainer>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addProduct({
            category: category.value,
            name: name.value,
            price: price.value,
            image: image.value
          });
        }}
      >
        <select>
          <option selected value="Tools">
            Tools
          </option>
          {categories &&
            categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <input type="text" name="name" {...name} />
        <input type="number" name="price" {...price} />
        <input type="text" name="image" {...image} />
        <button type="submit">submit</button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = ({ productsReducer }) => ({
  categories: productsReducer.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addProduct }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
