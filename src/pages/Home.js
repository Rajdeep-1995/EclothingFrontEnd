import React from "react";
import TypingEffect from "../components/cards/TypingEffect";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/Sub/SubList";
import Slider from "../components/cards/Slider";
import JeansAndDenims from "../components/home/JeansAndDenims";
import PantsAndLeggings from "../components/home/PantsAndLeggings";
import ShotsAndSkrits from "../components/home/ShotsAndSkirts";
import MatchingSet from "../components/home/MatchingSet";

const Home = () => {
  return (
    <>
      <Slider />
      <h4
        className="jumbotron text-center display-4 mt-0 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        New Arrivals
      </h4>
      <NewArrivals />

      {/* <h4 className="jumbotron text-center display-4 mt-5 mb-5 p-3">
        Best Sellers
      </h4>
      <BestSellers />
      <br /> */}

      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Jeans and Denims
      </h4>
      <JeansAndDenims />

      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Pants and leggings
      </h4>
      <PantsAndLeggings />

      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Shots and Skirts
      </h4>
      <ShotsAndSkrits />

      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Matching Set
      </h4>
      <MatchingSet />

      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Categories
      </h4>
      <CategoryList />
      <br />
      <br />
      <h4
        className="jumbotron text-center display-4 mt-1 mb-5 p-2"
        style={{ backgroundColor: "#F9F1F0" }}
      >
        Sub Categories
      </h4>
      <SubList />
    </>
  );
};

export default Home;
