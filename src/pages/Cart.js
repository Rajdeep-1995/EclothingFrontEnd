import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCheckOutCard from "../components/cards/ProductCheckOutCard";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      //   console.log(currentValue, nextValue.price);
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(user.token, cart)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("failed to save cart in db", err));
  };

  const showCartProducts = () => (
    <div className="table-responsive-md">
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((c) => (
          <ProductCheckOutCard key={c._id} c={c} />
        ))}
      </table>
    </div>
  );

  document.title = `your cart (${cart.length})`;

  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart {cart.length} {cart.length > 1 ? "products" : "product"}
          </h4>
          {cart.length ? (
            showCartProducts()
          ) : (
            <p>
              No products in cart <Link to="/shop">Continue shopping</Link>
            </p>
          )}
        </div>
        <div className="col-md-4">
          {cart.length && (
            <>
              Order Summary
              <hr />
              {cart.map((c, i) => (
                <div key={i}>
                  <p>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </p>
                </div>
              ))}
              <hr />
              Total: <b>${getTotal()}</b>
              <hr />
              {user ? (
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-sm btn-primary"
                >
                  Proceed to checkout
                </button>
              ) : (
                <button className="btn btn-sm btn-primary">
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: "cart" },
                    }}
                  >
                    Login to checkout
                  </Link>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
