import {
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  FETCH_REVIEWS,
  APPLY_FILTERS
} from "../actions/index";

export const productsReducer = (
  state = {},
  {
    type,
    products,
    categories,
    total,
    pages,
    product,
    reviews,
    filters,
    filteredProducts
  }
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
    case APPLY_FILTERS:
      return {
        ...state,
        filters,
        filteredProducts
      };
    default:
      return state;
  }
};
