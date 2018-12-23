import { FETCH_PRODUCTS, FETCH_SINGLE_PRODUCT } from "../actions/index";

export const productsReducer = (
  state = {},
  { type, products, categories, total, pages, product }
) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products,
        categories,
        total,
        pages
      };
    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        product
      };
    default:
      return state;
  }
};
