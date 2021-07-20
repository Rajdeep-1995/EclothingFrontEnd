import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../productImages/default.jpg";
import { Link } from "react-router-dom";
import { showAvarage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState("Add To Cart");

  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const handleCart = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        //if cart is available in local storage, get it.
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added!");
      // saving products globally
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //show the products in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const { title, description, images, slug, price } = product;
  return (
    <div style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.616)" }}>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAvarage(product)
      ) : (
        <div className="text-center pt-2">No Rating Yet</div>
      )}
      <Card
        className="m-2"
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{
              height: "250px",
              width: "100%",
            }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" />
            <p>View Product</p>
          </Link>,

          <Tooltip title={toolTip}>
            <span onClick={handleCart}>
              <ShoppingCartOutlined className="text-warning" />{" "}
              <p>Add to cart</p>
            </span>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={description.slice(0, 50) + "..."}
        />
      </Card>
    </div>
  );
};

export default ProductCard;
