import React, { useState } from "react";
import { FormContainer, Form } from "../styled_elements/form";
import { useInputValue } from "../hooks/useInputValue";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const AddProduct = () => {
  const category = useInputValue("");
  const name = useInputValue("");
  const price = useInputValue(0);
  const image = useInputValue("");

  return (
    <FormContainer>
      <Form
        onSubmit={e => {
          e.preventDefault();
          console.log({ category, name, price, image });
        }}
      >
        <input type="text" name="category" {...category} />
        <input type="text" name="name" {...name} />
        <input type="number" name="price" {...price} />
        <input type="text" name="image" {...image} />
        <button type="submit">submit</button>
      </Form>
    </FormContainer>
  );
};

export default AddProduct;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(
//    mapStateToProps
//    // mapDispatchToProps
//  )(AddProduct);
