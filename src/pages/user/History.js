import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { toast } from "react-toastify";
import { getOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = () => {
    getOrders(user.token).then((res) => {
      console.log("order by user--->", res.data);
      setOrders(res.data);
    });
  };

  const showOrderTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Size</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>${p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>{p.selectedSize}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrder = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="card m-5 p-3">
        <ShowPaymentInfo order={order} />
        {showOrderTable(order)}
        <div className="row">
          <div className="col">{/* <p>PDF download</p> */}</div>
        </div>
      </div>
    ));

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>

          <div className="col text-center">
            {orders?.length === 0 ? (
              <h4>No Purchase Orders</h4>
            ) : (
              <h4>User Purchase Orders</h4>
            )}

            {showEachOrder()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
