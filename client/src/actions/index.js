export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await fetch(`/products`);
      const [products, categories] = await res.json();
      if (products && categories) {
        return dispatch({
          type: FETCH_PRODUCTS,
          products,
          categories
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
