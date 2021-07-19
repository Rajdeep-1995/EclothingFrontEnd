import React from "react";
import StarRatings from "react-star-ratings";

export const showAvarage = (p) => {
  let ratingArray = p && p.ratings;
  let ratingArrayLength = p.ratings.length;
  let total = [];
  let avarage;
  if (ratingArray) {
    ratingArray.map((p) => total.push(p.star));
    let totalStarValue = total.reduce(
      (initialIndexValue, nextIndexValue) => initialIndexValue + nextIndexValue,
      0
    );

    avarage = totalStarValue / ratingArrayLength;

    return (
      <div className="text-center p-1">
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="3px"
            starRatedColor="orange"
            rating={avarage}
            isSelectable={false}
          />{" "}
          ({ratingArrayLength})
        </span>
      </div>
    );
  }
};
