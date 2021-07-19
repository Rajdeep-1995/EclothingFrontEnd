import React from "react";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import Ncloth1 from "../Images/p1.png";
import Ncloth2 from "../Images/p2.jpg";
import Ncloth3 from "../Images/p3.jpg";
import Ncloth4 from "../Images/p4.png";

const Slider = () => {
  const contentStyle = {
    height: "28rem",
    width: "100%",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
    objectfit: "cover",
    paddingBottom: "-200px",
  };
  return (
    <div>
      <Carousel autoplay>
        <div>
          <img className="maskImage" style={contentStyle} src={Ncloth1} />
        </div>
        {/* <div>
          <img className="maskImage" style={contentStyle} src={Ncloth2} />
        </div> */}
        <div>
          <img className="maskImage" style={contentStyle} src={Ncloth3} />
        </div>
        <div>
          <img className="maskImage" style={contentStyle} src={Ncloth4} />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
