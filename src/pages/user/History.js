import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { toast } from "react-toastify";
import { getOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
