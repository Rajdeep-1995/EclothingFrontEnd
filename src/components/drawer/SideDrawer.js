import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultImage from "../../productImages/default.jpg";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: "100%",
    height: "60px",
    objectFit: "cover",
  };
  return (
    <div>
      <Drawer
        className="text-center"
        title={`Cart / ${cart.length} products`}
        visible={drawer}
        onClose={() => {
          dispatch({
            type: "SET_VISIBLE",
            payload: false,
          });
        }}
      >
        {cart.map((product, index) => (
          <div key={index} className="row">
            <div className="col">
              {product.images[0] ? (
                <img
                  src={product.images[0].url}
                  alt="Product image"
                  style={imageStyle}
                />
              ) : (
                <img
                  src={defaultImage}
                  alt="Product image"
                  style={imageStyle}
                />
              )}
              <p className="bg-secondary text-center text-light">
                {product.title} x {product.count}
              </p>
            </div>
          </div>
        ))}
        <Link to="/cart">
          <button
            onClick={() =>
              dispatch({
                type: "SET_VISIBLE",
                payload: false,
              })
            }
            className="text-center btn btn-primary btn-raised btn-block"
          >
            Go To Cart
          </button>
        </Link>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
