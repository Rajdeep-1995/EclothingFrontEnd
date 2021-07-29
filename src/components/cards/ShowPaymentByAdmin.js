import React from "react";
import { handleOrder } from "../../functions/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShowPaymentByAdmin = ({ order }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const orderStatus = [
    "Not Processed",
    "Processing",
    "Dispatched",
    "Cancelled",
    "Completed",
  ];

  const handleStatus = (e) => {
    const selectedStatus = e.target.value;
    const orderId = order._id;
    handleOrder(user.token, selectedStatus, orderId).then((res) => {
      if (res.data.ok) {
        toast.success("Order status is updated successfully.");
      }
    });
  };
  return (
    <div>
      <p>
        <span className="badge bg-primary text-white">
          Order Id: {order.paymentIntent.id}
        </span>{" "}
        <span className="badge bg-primary text-white">
          Amount:{" "}
          {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>{" "}
        <span className="badge bg-primary text-white">
          Currency: {order.paymentIntent.currency.toUpperCase()}
        </span>{" "}
        <span className="badge bg-primary text-white">
          Method: {order.paymentIntent.payment_method_types[0]}
        </span>{" "}
        <span className="badge bg-primary text-white">
          Payment:{order.paymentIntent.status.toUpperCase()}
        </span>{" "}
        <span className="badge bg-primary text-white">
          Ordered On:{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>{" "}
      </p>
      <div className="form-group">
        <div className="row">
          <div className="col-md-4 pt-2">
            <lable>Order Status: </lable>
          </div>
          <div className="col-md-8">
            <select
              className="form-control"
              name="hello"
              onChange={handleStatus}
            >
              {orderStatus.map((s) => (
                <option
                  selected={order.orderStatus === s}
                  key={s}
                  value={s}
                  name={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPaymentByAdmin;
