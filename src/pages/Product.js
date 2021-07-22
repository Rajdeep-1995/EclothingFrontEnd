import React, { useEffect, useState } from "react";
import {
  getProduct,
  getRelatedProducts,
  productStar,
} from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";
import { useSelector } from "react-redux";

const Product = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data); //once product fatched, load the related products
      getRelatedProducts(res.data._id).then((result) =>
        setRelated(result.data)
      );
    });
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); //if user found in rating, push them in setStar state
    }
  });

  const handleRating = (newRating, name) => {
    console.table(newRating, name);
    setStar(newRating);

    productStar(user.token, newRating, name) //here name = productId
      .then((res) => {
        loadProduct();
      });
  };
  document.title = product.title;
  return (
    <div>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            handleRating={handleRating}
            star={star}
          />
        </div>

        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Products you may also like</h4>
            <hr />
          </div>
        </div>
        <div className="row pb-5">
          {related.length ? (
            related.map((p) => (
              <div className="col-md-4">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="col text-center">No Related Products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
