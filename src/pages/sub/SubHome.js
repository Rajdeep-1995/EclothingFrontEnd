import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { getSub } from "../../functions/sub";

const CategoryHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;
  useEffect(() => {
    setLoading(true);
    getSub(slug).then((c) => {
      setSub(c.data.subCat);
      setProducts(c.data.product);

      setLoading(false);
    });
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {loading ? (
              <div className="jumbotron mt-5 mb-5 display-4 text-center">
                Loading...
              </div>
            ) : (
              <div className="jumbotron p-3 mt-5 mb-5 display-4 text-center">
                {products.length} products in "{sub?.name}" sub category
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
