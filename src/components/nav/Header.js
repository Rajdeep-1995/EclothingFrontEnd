import React, { useState } from "react";
import { Menu, Badge } from "antd";
import Logo from "../Images/logo1.png";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../Forms/Search";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setcurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => ({ ...state })); // returns the current state of the redux

  const handleClick = (e) => {
    setcurrent(e.key);
  };

  const logOut = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu
      style={{
        backgroundColor: "#FADCD9",
      }}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            padding: "2px",
          }}
        />
      </Link>

      <Item icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="about" icon={<InfoCircleOutlined />}>
        <Link to="/about-us">About Us</Link>
      </Item>
      <Item key="contact" icon={<ContactsOutlined />}>
        <Link to="/contact-us">Contact Us</Link>
      </Item>
      <Item key="faq" icon={<QuestionCircleOutlined />}>
        <Link to="/faq">FAQs</Link>
      </Item>
      <Item className="float-right" key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          className="float-right"
          title={user.email.split("@")[0]}
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logOut}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right  pt-2">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
