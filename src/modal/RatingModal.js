import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisble, setModalVisible] = useState(false);
  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` }, //set the history.location.state.from to the current page url
      });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "Leave a rating" : "Login to leave a rating"}
      </div>
      <Modal
        title="Leave a rating"
        visible={modalVisble}
        centered
        onOk={() => {
          setModalVisible(false);
          toast.success("Thank you for your feedback");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
