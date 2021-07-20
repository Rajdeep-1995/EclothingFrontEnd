import React, { useState } from "react";
import "./index.css";
import {
  CloseOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Tabs, Tooltip, Select } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../productImages/default.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../../modal/RatingModal";
import { showAvarage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const { TabPane } = Tabs;

//this is a child component, so passing props from parent to child, Product to SingleProduct
const SingleProduct = ({ product, star, handleRating }) => {
  const { title, description, images, _id } = product;
  const [toolTip, setToolTip] = useState("Add To Cart");

  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  let selectedSize = 0;
  const handleSize = (value) => {
    selectedSize = value;
    console.log(selectedSize);
  };

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
        selectedSize,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      //save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added!");

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
  return (
    <>
      <div className="col-md-7">
        <h1 className="p-2 " style={{ backgroundColor: "#F8AFA6" }}>
          {title}
        </h1>
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop emulateTouch showArrows>
            {images.map((photo) => (
              <img src={photo.url} key={photo.public_id} />
            ))}
          </Carousel>
        ) : (
          <img
            className="mb-4"
            style={{ height: "350px", width: "100%" }}
            src={defaultImage}
          />
        )}
        <Tabs type="card" className="mb-2">
          <TabPane tab="Description" key="1">
            {description ? description : "This product has no description"}
          </TabPane>
          <TabPane tab="More" key="2">
            Contact us on xxx-xxx-xxxx to get more information about the product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5 mt-5">
        {product && product.ratings && product.ratings.length > 0 ? (
          showAvarage(product)
        ) : (
          <div className="text-center pt-2 pb-3">No Rating Yet</div>
        )}
        <Card
          actions={[
            <>
              <Tooltip title={toolTip}>
                <span onClick={handleCart}>
                  <ShoppingCartOutlined className="text-warning" />
                  <p>Add to cart</p>
                </span>
              </Tooltip>
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br /> Add to wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={_id}
                rating={star}
                numberOfStar={5}
                starRatedColor="orange"
                starHoverColor="orange"
                changeRating={handleRating}
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} handleSize={handleSize} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
