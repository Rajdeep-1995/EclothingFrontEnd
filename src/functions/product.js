import axios from "axios";

export const createProduct = async (authToken, product) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authToken,
    },
  });

export const updateProduct = async (authToken, product, slug) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authToken,
    },
  });

export const getAllProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (authToken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authToken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProducts = async (sort, order, page, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
    limit,
  });

export const getProductsBySubCat = async (subCategory, page, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products/sub-category`, {
    subCategory,
    page,
    limit,
  });

export const getCountProduct = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (authToken, star, productId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authToken,
      },
    }
  );

export const getRelatedProducts = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const getProductsByFilter = async (args) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, args);
