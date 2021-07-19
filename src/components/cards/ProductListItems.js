import { Select } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Option } = Select;

const ProductListItems = ({ product, handleSize }) => {
  const {
    price,
    category,
    subs,
    brand,
    color,
    sold,
    quantity,
    slug,
    shipping,
    setGender,
    pSize,
    sSize,
  } = product;
  console.log("product--->", product);
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          Price
          <span className="label label-default label-pill pull-xs-right">
            ${price}
          </span>
        </li>

        {category && (
          <li className="list-group-item">
            Category
            <Link
              className="label label-default label-pill pull-xs-right"
              to={`/category/${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
        )}

        <li className="list-group-item">
          Sub Category
          {subs &&
            subs.map((p) => (
              <Link
                to={`/sub/${p.slug}`}
                className="label label-default label-pill pull-xs-right"
              >
                {p.name}
              </Link>
            ))}
        </li>

        <li className="list-group-item">
          Shipping
          <span className="label label-default label-pill pull-xs-right">
            {shipping}
          </span>
        </li>

        <li className="list-group-item">
          Color
          <span className="label label-default label-pill pull-xs-right">
            {color}
          </span>
        </li>

        <li className="list-group-item">
          Brand
          <span className="label label-default label-pill pull-xs-right">
            {brand}
          </span>
        </li>

        <li className="list-group-item">
          Available
          <span className="label label-default label-pill pull-xs-right">
            {quantity}
          </span>
        </li>

        <li className="list-group-item">
          Sold
          <span className="label label-default label-pill pull-xs-right">
            {sold}
          </span>
        </li>

        <li className="list-group-item">
          Gender
          <span className="label label-default label-pill pull-xs-right">
            {setGender}
          </span>
        </li>

        {sSize && sSize[0] === "N/A" && (
          <Select defaultValue="Select your Size" onChange={handleSize}>
            {pSize?.map((p) => (
              <Option value={p} key={p}>
                {p}
              </Option>
            ))}
          </Select>
        )}

        {pSize && pSize[0] === "N/A" && (
          <Select defaultValue="Select your Size" onChange={handleSize}>
            {sSize?.map((s) => (
              <Option value={s} key={s}>
                {s}
              </Option>
            ))}
          </Select>
        )}
      </ul>
    </div>
  );
};

export default ProductListItems;
