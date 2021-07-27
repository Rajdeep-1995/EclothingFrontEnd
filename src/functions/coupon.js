import axios from "axios";

export const createCoupon = async (authToken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );

export const listCoupons = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`, {
    headers: {
      authToken,
    },
  });

export const removeCoupon = async (authToken, couponId) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authToken,
    },
  });
