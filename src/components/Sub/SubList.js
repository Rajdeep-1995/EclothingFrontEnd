import React, { useEffect, useState } from "react";
import { getSubs } from "../../functions/sub";
import { Link } from "react-router-dom";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((result) => {
      setSubs(result.data);
      setLoading(false);
    });
  }, []);
  const shoeCategories = () =>
    subs.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-raised btn-block m-3 btn-lg"
      >
        <Link to={`sub/${c.slug}`}>{c.name}</Link>
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

export default SubList;
