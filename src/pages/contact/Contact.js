import React from "react";
import ContactImg from "../../components/Images/contactUs.jfif";

const Contact = () => {
  document.title = "contact us";
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 pt-5 text-center mt-5">
            <h3>CONTACT</h3>
            <p>5592 FERRIER STREET, MONTREAL</p>
            <p>QUEBEC, CANADA, H4P 1M2</p>
            <p>514.871.xxxx</p>
            <p>1800.420.xxxx</p>
            <b>CUSTOMERSERVICE@GARAGE.CA</b>
          </div>
          <div className="col-md-6 mt-5 pt-4">
            <img
              className="img-thumbnail"
              src={ContactImg}
              width="560px"
              height="400px"
              alt="contact-us"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
