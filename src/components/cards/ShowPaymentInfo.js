import React from "react";

const ShowPaymentInfo = ({ order }) => {
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
        <span className="badge bg-info text-white">
          Status: {order.orderStatus}
        </span>{" "}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
