import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/Forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/Forms/FileUpload";
import { Spin } from "antd";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Blue", "Grey", "Brown", "White"], // All available colors, from backend
  brands: [
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
  ], // All available brands, from backend
  color: "",
  brand: "",
  gender: ["Men", "Women", "Kids"],
  pantSize: ["N/A", 28, 30, 32, 34, 36, 38, 40, 42, 44],
  shirtSize: ["N/A", "S", "M", "L", "XL", "XXL"],
  pSize: [],
  sSize: [],
  setGender: "",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]); //to store all sub categories while selcting main category
  const [showSubs, setShowSubs] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    getCategories().then((cat) =>
      setValues({ ...values, categories: cat.data })
    ); //to get all parent categories
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        window.alert(`Product "${res.data.title}" is created sucessfully`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //to changing one parameter in values object
  };

  const handleSize = (e) => {
    const type = e.target.name;
    const size = e.target.value;

    if (type === "pSize") {
      values.pSize.push(size);
    } else {
      values.sSize.push(size);
    }
  };

  const handleChangeOption = (e) => {
    // for getting all sub categories when a category is selected
    const id = e.target.value;
    setValues({ ...values, subs: [], category: id }); // cleare the prev value of subs
    getCategorySubs(id).then((subs) => {
      setSubOptions(subs.data);
      setShowSubs(true);
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>Create Product</h4>
            <div className="p-3">
              {loading ? (
                <Spin indicator={antIcon} />
              ) : (
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              )}
            </div>
            <ProductCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleSize={handleSize}
              handleChangeOption={handleChangeOption}
              subOptions={subOptions}
              showSubs={showSubs}
              setValues={setValues}
              values={values}
            />

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
