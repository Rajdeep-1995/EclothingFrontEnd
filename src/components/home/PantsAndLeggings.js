import React, { useState, useEffect } from "react";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import { getProductsBySubCat, getCountProduct } from "../../functions/product";
import { getSub } from "../../functions/sub";
import { Pagination } from "antd";

const PantsAndLeggings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const loadSubCategoryWithProducts = (pageNumber = 1, limit = 3) => {
    setLoading(true);
    getSub("pants-and-leggings").then((res) => {
      setTotalCount(res.data.product.length);
      getProductsBySubCat(res.data.subCat._id, pageNumber, limit).then(
        (result) => {
          setProducts(result.data);
          setLoading(false);
        }
      );
    });
  };

  useEffect(() => {
    loadSubCategoryWithProducts();
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <br />
      <div className="text-center m-2">
        <Pagination
          total={totalCount}
          pageSize={3}
          onChange={(page, pageSize) =>
            loadSubCategoryWithProducts(page, pageSize)
          }
          defaultCurrent={0}
        />
      </div>
      <br />
      <br />
    </>
  );
};

export default PantsAndLeggings;
