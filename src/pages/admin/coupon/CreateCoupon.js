import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  createCoupon,
  removeCoupon,
  listCoupons,
} from "../../../functions/coupon";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

const CreateCoupn = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [listOfCoupons, setListOfCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons();
  }, [name]);
  const getCoupons = () => {
    listCoupons(user.token)
      .then((res) => setListOfCoupons(res.data))
      .catch((err) => console.log("err while listing coupons--->", err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon(user.token, { name, discount, expiry })
      .then((res) => {
        toast.success(`"${res.data.name}" is created succesfully.`);
        setName("");
        setDiscount("");
        setExpiry("");
      })
      .catch((err) => console.log("Err while creating coupon--->", err));
  };

  const handleRemove = (couponId) => {
    removeCoupon(user.token, couponId)
      .then((res) => {
        toast.success(`"${res.data.name}" is deleted successfully.`);
        getCoupons();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <h4>Coupon</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                  className="form-control"
                  value={name}
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Discount %</label>
                <input
                  className="form-control"
                  value={discount}
                  type="text"
                  required
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Expiry Date</label>
                <br />
                <DatePicker
                  className="form-control"
                  value={expiry}
                  required
                  selected={new Date()}
                  onChange={(date) => setExpiry(date)}
                />
                <br />
              </div>
              <button className="btn btn-outline-primary">Save</button>
            </form>
            <br />
            <h4>{listOfCoupons.length} Coupons</h4>
            <div class="table-responsive-md">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfCoupons.map((c, i) => (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>{c.discount}%</td>
                      <td>{new Date(c.expiry).toLocaleDateString()}</td>
                      <td>
                        {" "}
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className="text-danger"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupn;
