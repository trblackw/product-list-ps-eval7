import React, { useEffect } from "react";
import { FormContainer, Form } from "../styled_elements/form";
import { useInputValue } from "../hooks/useInputValue";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const AddProduct = ({ categories }) => {
  const category = useInputValue("");
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
          console.log({ category, name, price, image });
        }}
      >
        <select {...category}>
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

// const mapDispatchToProps = {

// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(AddProduct);
