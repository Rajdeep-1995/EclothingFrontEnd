import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { getProductsByFilter } from "../../functions/product";
import "antd/dist/antd.css";
import { AutoComplete } from "antd";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  const setValues = (data) => ({
    value: data,
  });

  const onSearch = (e) => {
    setValue(e);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e },
    });

    getProductsByFilter({ query: e }).then((res) => {
      setProducts(res.data.map((p) => setValues(p.title)));
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?product=${text}`);
  };
  const onSelect = (selected) => {
    history.push(`/shop?product=${selected}`);
    setValue("");
  };
  return (
    <div>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        {/* <input
          onChange={handleChange}
          type="search"
          className="form-control mr-sm-2"
          placeholder="search"
          value={text}
        /> */}

        <AutoComplete
          style={{
            width: 200,
          }}
          notFoundContent="No Result Found!"
          allowClear={true}
          autoClearSearchValue={true}
          onSelect={onSelect}
          options={products}
          value={value}
          onSearch={onSearch}
          placeholder="Search here"
        />

        <SearchOutlined
          className="pl-1"
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
        />
      </form>
    </div>
  );
};

export default Search;
