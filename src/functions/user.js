import axios from "axios";

export const userCart = async (authToken, cart) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );

export const getUserCart = async (authToken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/cart`,

    {
      headers: {
        authToken,
      },
    }
  );

export const emptyCart = async (authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const saveAddress = async (authToken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );

export const applyCoupon = async (authToken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );

export const createOrder = async (authToken, stripeResponse) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );

export const getOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/order`, {
    headers: {
      authToken,
    },
  });
