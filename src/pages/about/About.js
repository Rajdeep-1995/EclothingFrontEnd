import React from "react";
import { Menu } from "antd";
import AbtImg from "../../components/Images/AboutUs/abt-us.jpg";
import Work from "../../components/Images/AboutUs/work.jpg";
import Culture from "../../components/Images/AboutUs/culture.jpg";
import Benifits from "../../components/Images/AboutUs/benefit.jpg";

const About = () => {
  document.title = "about us";
  return (
    <div>
      <div className="container pt-4 mt-3 pl-1">
        <div className="row">
          <div className="col-md-8">
            <h2 className>ABOUT US</h2>
            <p>
              Within our walls, our spirited group creates, designs, markets and
              distributes a constantly evolving collection to a large network of
              Dynamite and Garage retail stores. The brand’s core strength is
              rooted in a solid understanding of its customer.
            </p>
            <p>
              Acting as a Canadian leader, both Garage & Dynamite continue to
              thrive in an ever-crowded marketplace. Our passionate team
              continues to lead expansion of the business in new markets,
              including e-commerce while always leveraging our shared values.
            </p>
          </div>
          <div className="col-md-4">
            <img src={AbtImg} style={{ width: "370px", height: "auto" }} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <h2>WORK ENVIRONMENT</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              className="pr-2"
              src={Work}
              style={{ width: "350px", height: "auto" }}
            />
          </div>
          <div className="col-md-8 pl-5">
            <p>
              Our open spaces, single level creative complex fosters
              communication and exchange among teams that nurtures talent and
              provides passionate minds with opportunities to connect, to create
              and enhance the brands products, image and distinct character.
            </p>
            <p>
              Hub style set up and inspirational Brand rooms for our designers
              and product teams foster a collaborative spirit and shared sense
              of ambition to create and design future collections including full
              size mock stores for each brand to develop visual guidelines.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-8">
            <h2 className>CULTURE</h2>
            <h4>VALUES</h4>
            <ul>
              <li>
                <b>Ownership</b>: We honour our commitments
              </li>
              <li>
                <b>Honesty</b>: We demonstrate integrity and are trustworthy
              </li>
              <li>
                <b>Passion</b>: We love what we do
              </li>
              <li>
                <b>Excellence</b>: We strive for perfection
              </li>
              <li>
                <b>Teamwork</b>: We contribute to each other’s success
              </li>
              <li>
                <b>Creativity</b>: If it can be imagined, it can be done
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <img src={Culture} style={{ width: "370px", height: "auto" }} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-8">
            <h2 className>BENEFITS</h2>
            <p>
              Your contribution and dedication will be rewarded with a
              competitive salary and bonus. We also offer a competitive
              retirement savings plan in Canada and a Flexible Group Insurance
              Program created specifically to cater to your needs with a
              customized coverage. *For eligible employees.
            </p>
            <br />
            <h4>EMPLOYEE DISCOUNT</h4>
            <p>
              Employees are entitled to a personal clothing discount of 50% to
              keep them looking fabulous for less. A 50% discount is also
              extended to eligible dependants of employees.
            </p>
            <br />
            <h4>RECOGNITION PROGRAMS</h4>
            <p>
              At Groupe Dynamite, we highly believe in recognizing our talent
              and their accomplishments, celebrating our people successes and
              rewarding them for their contribution toward our organization. We
              are proud creators of recognition programs.
            </p>
          </div>
          <div className="col-md-4">
            <img src={Benifits} style={{ width: "370px", height: "400px" }} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col">
            <h2>SUPPLIER CODE OF CONDUCT</h2>
            <p>
              It is our intent to develop partnerships with suppliers who are
              committed to meeting the high standards outlined in this Supplier
              Code of Conduct. This Supplier Code of Conduct outlines standards
              relating to environment, discrimination, forced labour, child
              labour, wages and hours, working conditions, freedom of
              association, ethical standards and more.
            </p>
            <p>
              This Supplier Code of Conduct must be signed by all suppliers
              prior to working with us.
            </p>
          </div>
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
