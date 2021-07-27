import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllProductsByCount,
  getProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarOutlined,
  BgColorsOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Star from "../components/Forms/Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]); //storing all sub categories
  const [sub, setSub] = useState(""); // sending to backend to fetch products
  const [brands, setBrands] = useState([
    "Nike",
    "Louis Vuitton",
    "Hermes",
    "H&M",
    "Zara",
    "Levi’s",
    "The North Face",
    "Under Armour",
    "Old Navy",
    "Calvin Klein",
    "Aldo",
    "Desigual",
  ]); // maping purpose
  const [brand, setBrand] = useState(""); //sending to backend
  const [colors, setColors] = useState([
    "Black",
    "Blue",
    "Grey",
    "Brown",
    "White",
  ]);
  const [color, setcolor] = useState("");
  const [shippingType, setShippingType] = useState(["Yes", "No"]);
  const [shipping, setShipping] = useState("");
  const [genderSet, setGenderSet] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const listGender = ["Men", "Women", "Kids"];

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const queryText = query.get("product");
  const dispatch = useDispatch();

  //1.load default products
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    //fetch all categories
    getCategories().then((res) => setCategories(res.data));
    //fetch all sub categories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //2.load products based on text
  useEffect(() => {
    const delayed = setTimeout(() => {
      getProducts({ query: queryText });
      if (!text) {
        getAllProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [queryText]);

  //3. load products based on price range
  useEffect(() => {
    getProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setcolor("");
    setGenderSet("");
    setShipping("");
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. load prodcts based on category
  // show list of categories

  //manipulating the categories ID array based on checked and unchecked

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setcolor("");
    setShipping("");
    setGenderSet("");

    let inTheState = [...categoryIds];
    let justCheckd = e.target.value;
    // this returns -1 if not found, otherwise returns index of the found value
    let foundInTheState = inTheState.indexOf(justCheckd);

    if (foundInTheState === -1) {
      inTheState.push(justCheckd); //if not found, push the just checked Id
    } else {
      inTheState.splice(foundInTheState, 1); //if already in, remove it with the help of index
    }

    setCategoryIds(inTheState);

    getProducts({ category: inTheState });
  };

  const categoriesList = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          className="pb-2 pl-4 pr-2"
          onChange={handleCheck}
          name="Category"
          value={c._id}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const getProducts = (args) => {
    getProductsByFilter(args).then((res) => {
      setProducts(res.data);
    });
  };
  const getAllProducts = () => {
    setLoading(true);
    getAllProductsByCount(50).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //5. get products based on star ratings

  const handleStar = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setSub("");
    setPrice([0, 0]);
    setBrand("");
    setcolor("");
    setShipping("");
    setGenderSet("");
    setStar(num);
    getProducts({ stars: num });
  };
  const showStars = () => (
    <div className="pb-2 pl-4 pr-2">
      <Star numberOfStars={5} starClick={handleStar} />
      <Star numberOfStars={4} starClick={handleStar} />
      <Star numberOfStars={3} starClick={handleStar} />
      <Star numberOfStars={2} starClick={handleStar} />
      <Star numberOfStars={1} starClick={handleStar} />
    </div>
  );

  //6. get products based on sub categories
  const handleSub = (sub) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setBrand("");
    setcolor("");
    setShipping("");
    setGenderSet("");
    setSub(sub);
    getProducts({ sub });
  };
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
        onClick={() => handleSub(s)}
      >
        {s.name}
      </div>
    ));

  //7.  get products based on brands
  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setShipping("");
    setcolor("");
    setGenderSet("");
    setBrand(e.target.value);
    getProducts({ brand: e.target.value });
  };
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        className="pb-1 pl-4 pr-5"
        name={b}
        value={b}
        onChange={handleBrand}
        checked={b === brand}
      >
        {b}
      </Radio>
    ));

  //8. get products based on color

  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");
    setGenderSet("");
    setcolor(e.target.value);
    getProducts({ color: e.target.value });
  };
  const showColors = () =>
    colors.map((c) => (
      <Radio
        className="pb-1 pl-4 pr-5"
        name={c}
        value={c}
        onChange={handleColor}
        checked={c === color}
      >
        {c}
      </Radio>
    ));
  //9. get products based on shipping
  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setcolor("");
    setGenderSet("");
    setShipping(e.target.value);
    getProducts({ shipping: e.target.value });
  };

  const showShipping = () =>
    shippingType.map((s) => (
      <Radio
        className="pb-1 pl-4 pr-5"
        name={s}
        value={s}
        onChange={handleShipping}
        checked={s === shipping}
      >
        {s}
      </Radio>
    ));

  //10. Get products based on gender
  const showGender = () =>
    listGender.map((g) => (
      <Radio
        className="pb-1 pl-4 pr-5"
        name={g}
        value={g}
        onChange={handleGender}
        checked={g === genderSet}
      >
        {g}
      </Radio>
    ));
  const handleGender = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setcolor("");
    setGenderSet(e.target.value);
    getProducts({ gender: e.target.value });
  };

  document.title = "shop";

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-2">
            <h4 className="p-2"> Search/filter</h4>
            <hr />
            <Menu defaultOpenKeys={["10", "9"]} mode="inline">
              {/* price */}
              <SubMenu
                key="1"
                title={
                  <span>
                    <DollarCircleOutlined />
                    Price
                  </span>
                }
              >
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(p) => `$${p}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={5000}
                />
              </SubMenu>
              {/* gender */}
              <SubMenu
                key="15"
                title={
                  <span>
                    <UserOutlined />
                    Gender
                  </span>
                }
              >
                {showGender()}
              </SubMenu>
              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span>
                    <DownSquareOutlined />
                    Categories
                  </span>
                }
              >
                {categoriesList()}
              </SubMenu>
              {/* star */}
              <SubMenu
                key="3"
                title={
                  <span>
                    <StarOutlined />
                    Rating
                  </span>
                }
              >
                {showStars()}
              </SubMenu>

              {/* sub categories */}
              <SubMenu
                key="4"
                title={
                  <span>
                    <DownSquareOutlined />
                    Sub Categories
                  </span>
                }
              >
                <div className="pl-4 pr-4">{showSubs()}</div>
              </SubMenu>

              {/* brands */}
              <SubMenu
                key="5"
                title={
                  <span>
                    <DownSquareOutlined />
                    Brands
                  </span>
                }
              >
                <div className="pr-4">{showBrands()}</div>
              </SubMenu>

              {/* color */}
              <SubMenu
                key="6"
                title={
                  <span>
                    <BgColorsOutlined />
                    Color
                  </span>
                }
              >
                <div className="pr-4">{showColors()}</div>
              </SubMenu>

              {/* shipping */}
              <SubMenu
                key="7"
                title={
                  <span>
                    <ShoppingOutlined />
                    Shipping
                  </span>
                }
              >
                <div className="pr-4">{showShipping()}</div>
              </SubMenu>
            </Menu>
          </div>

          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger p-2">Loading...</h4>
            ) : (
              <h4 className="p-2">Products</h4>
            )}
            {products.length < 1 && <p>No products found!</p>}
            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-md-4">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
