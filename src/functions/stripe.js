import axios from "axios";

export const getClientSecret = async (authToken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-paymet-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authToken,
      },
    }
  );
