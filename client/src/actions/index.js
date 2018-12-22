export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const fetchProducts = (page = 1) => {
  return async dispatch => {
    try {
      const res = await fetch(`/products/${page}`);
      const [productList, categories] = await res.json();
      const { docs: products, total, pages } = productList;
      if (products) {
        return dispatch({
          type: FETCH_PRODUCTS,
          products,
          categories,
          total,
          pages
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleProduct = (id) => {
   
}

export const applyFilters = () => {
  console.log("poop");
  // return async dispatch => {
  //    try {

  //    } catch (error) {

  //    }
  // }
};
