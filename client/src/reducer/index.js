import { FETCH_PRODUCTS } from "../actions/index";

export const productsReducer = (state = {}, { type, products, categories }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products,
        categories
      };
    default:
      return state;
  }
};
