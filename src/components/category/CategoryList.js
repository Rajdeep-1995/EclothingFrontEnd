import React, { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((result) => {
      setCategories(result.data);
      setLoading(false);
    });
  }, []);
  const shoeCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-raised btn-block m-3 btn-lg"
      >
        <Link to={`category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          shoeCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
