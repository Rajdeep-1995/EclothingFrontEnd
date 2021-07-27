import React, { useState, useEffect } from "react";
import {
  emptyCart,
  getUserCart,
  saveAddress,
  applyCoupon,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CheckOut = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState([0]);
  const [address, setAddress] = useState("");
  const [adddresSaved, setAdddresSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [discountErr, setDiscountErr] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    });
  }, []);
  const saveAddressToDb = () => {
    saveAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAdddresSaved(true);
        toast.success("Address saved");
      }
    });
  };
  const handleEmptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyCart(user.token).then((res) => {
      setProducts([]);
      setCartTotal(0);
      setPriceAfterDiscount(0);
      setDiscountErr("");
      toast.success("Cart is Empty. Continue shopping");
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const orderSummery = () => (
    <>
      <p>
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} = $
              {p.product.price * p.count}
            </p>
          </div>
        ))}
      </p>
    </>
  );

  const showCoupon = () => (
    <>
      <form onSubmit={handleCoupon}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              setCoupon(e.target.value);
              setDiscountErr("");
            }}
            value={coupon}
          />
        </div>
        <button className="btn btn-primary ">Apply</button>
      </form>
    </>
  );

  const handleCoupon = (e) => {
    e.preventDefault();
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setPriceAfterDiscount(res.data);
        setCoupon("");
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountErr(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          {showCoupon()}
          {discountErr && <p className="bg bg-danger p-2">{discountErr}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>

          <hr />
          <p>Products {products.length}</p>

          <hr />
          {orderSummery()}
          <hr />
          <p>Cart Total: ${cartTotal}</p>
          {priceAfterDiscount > 0 && (
            <p className="bg bg-success p-1">
              Discount Applied! Payble price:<b>{priceAfterDiscount}</b>
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              <button
                disabled={!adddresSaved || !products.length}
                className="btn btn-primary"
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={handleEmptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
