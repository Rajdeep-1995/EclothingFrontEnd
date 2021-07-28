import React, { useEffect, useState } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { getClientSecret } from "../functions/stripe";
import { Link } from "react-router-dom";
import {
  DollarCircleFilled,
  CheckCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { createOrder, emptyCart } from "../functions/user";
import { useHistory } from "react-router-dom";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, coupon } = useSelector((state) => ({ ...state }));
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  var cardStyle = {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  };

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getClientSecret(user.token, coupon).then((res) => {
      console.log("client-secret---->", res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setFinalAmount(res.data.finalAmount);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: e.target.name.value,
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // console.log("success--->", JSON.stringify(payload, null, 4));
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });

          emptyCart(user.token);
        }
      });

      setProcessing(false);
      setError("");
      setSucceeded(true);

      setTimeout(() => {
        history.push("/user/history");
      }, 1000);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty); //disable pay button if err
    setError(e.error ? e.error.message : ""); //set the err or empty string
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">
              Total After Discount: ${totalAfterDiscount}
            </p>
          ) : (
            <p className="alert alert-danger">No Discount Applied.</p>
          )}
        </div>
      )}
      <Card
        actions={[
          <>
            <DollarCircleFilled className="text-info" />
            <br /> Total: ${cartTotal}
          </>,
          <>
            <CheckCircleOutlined className="text-info" />
            <br />
            Total Payable:${finalAmount / 100}
          </>,
        ]}
      />
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <bt />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment successful.
        <Link to="/user/history">See it in your purchase history.</Link>
      </p>
    </>
  );
};

export default StripeCheckout;
