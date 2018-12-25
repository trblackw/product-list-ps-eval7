import {
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  FETCH_REVIEWS
} from "../actions/index";

export const productsReducer = (
  state = {},
  { type, products, categories, total, pages, product, reviews }
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
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews
      };
    default:
      return state;
  }
};
