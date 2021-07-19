import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="text-center font-weight-bold p-2 mt-2"
        style={{ backgroundColor: "#FADCD9" }}
      >
        <p>CopyRight {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Footer;
