import React from "react";
import ModalImage from "react-modal-image";
import defaultImage from "../../productImages/default.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProductCheckOutCard = ({ c }) => {
  const colors = ["Black", "Blue", "Silver", "Brown", "White"];
  let dispatch = useDispatch();

  const handleSizeChange = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === c._id) {
          // if the saved product matches with the currently updating product
          cart[index].selectedSize = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === c._id) {
          // if the saved product matches with the currently updating product
          cart[index].color = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value; // to avoid negative values;
    let cart = [];

    if (count > c.quantity) {
      toast.error(`Maximum available quantity is ${c.quantity}`);
      return;
    }

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === c._id) {
          // if the saved product matches with the currently updating product
          cart[index].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, index) => {
        if (product._id === c._id) {
          // if the saved product matches with the currently updating product
          cart.splice(index, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td>
            <div style={{ width: "100px", height: "auto" }}>
              {c.images.length ? (
                <ModalImage small={c.images[0].url} large={c.images[0].url} />
              ) : (
                <ModalImage small={defaultImage} large={defaultImage} />
              )}
            </div>
          </td>
          <td>
            <Link style={{ color: "black" }} to={`/product/${c.slug}`}>
              {c.title}
            </Link>
          </td>
          <td>${c.price}</td>
          <td>{c.brand}</td>
          <td>
            <select onChange={handleColorChange} className="form-control">
              {c.color ? (
                <option value={c.color}>{c.color}</option>
              ) : (
                <option>Select</option>
              )}
              {colors
                .filter((p) => p !== c.color) //removing same color
                .map((c, i) => (
                  <option name={c} value={c} key={i}>
                    {c}
                  </option>
                ))}
            </select>
          </td>
          <td className="text-center">
            <input
              type="number"
              className="form-control"
              value={c.count}
              onChange={handleCountChange}
            />
          </td>

          <select onChange={handleSizeChange} className="form-control">
            {c.selectedSize ? (
              <option value={c.selectedSize}>{c.selectedSize}</option>
            ) : (
              <option>Select</option>
            )}
            {c.pSize &&
              c.pSize[0] === "N/A" &&
              c.sSize
                .filter((p) => p !== c.selectedSize)
                .map((c, i) => (
                  <option name={c} value={c} key={i}>
                    {c}
                  </option>
                ))}

            {c.sSize &&
              c.sSize[0] === "N/A" &&
              c.pSize
                .filter((p) => p !== c.selectedSize)
                .map((c, i) => (
                  <option name={c} value={c} key={i}>
                    {c}
                  </option>
                ))}
          </select>

          <td className="text-center">
            {c.shipping === "Yes" ? (
              <CheckCircleOutlined className="text-success" />
            ) : (
              <CloseCircleOutlined className="text-danger" />
            )}
          </td>
          <td className="text-center">
            <CloseOutlined
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={handleRemove}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ProductCheckOutCard;
