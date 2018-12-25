export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";
export const FETCH_REVIEWS = "FETCH_REVIEWS";

export const fetchProducts = (page = 1) => {
  return async dispatch => {
    try {
      const res = await fetch(`/products/${page}`);
      const [productList, categories] = await res.json();
      const { docs: products, total, pages } = productList;
      return dispatch({
        type: FETCH_PRODUCTS,
        products,
        categories,
        total,
        pages
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const res = await fetch(`/products/product/${id}`);
      const product = await res.json();

      if (product) {
        return dispatch({
          type: FETCH_SINGLE_PRODUCT,
          product
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchReviews = (page = 1) => {
  return async dispatch => {
    try {
      const res = await fetch(`/reviews/${page}`);
      const reviewList = await res.json();
      const reviews = reviewList.map(({ reviews }) => reviews);
      return dispatch({
        type: FETCH_REVIEWS,
        reviews: reviews.flat()
      });
    } catch (error) {
      console.error(error);
    }
  };
};
