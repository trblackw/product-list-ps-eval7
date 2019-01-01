export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";
export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const ADD_PRODUCT = "ADD_PRODUCT";

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

export const applyFilters = filters => {
  return async dispatch => {
    try {
      if (filters.length > 1) {
        filters = filters.join("+");
      } else {
        filters = String(filters);
      }
      if (filters !== "") {
        const res = await fetch(`/products/1/?category=${filters}`);
        const [productList] = await res.json();
        const { docs: filteredProducts } = productList;
        return dispatch({
          type: APPLY_FILTERS,
          filters,
          filteredProducts
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProduct = product => {
  const settings = {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  return async dispatch => {
    const res = await fetch("/products", settings);
    const addedProduct = await res.json();
    return dispatch({
      type: ADD_PRODUCT,
      addedProduct
    });
  };
};
