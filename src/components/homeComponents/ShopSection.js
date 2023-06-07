import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { addToCart } from "../../Redux/Actions/cartActions";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(products);

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId, 1)); // Here, 1 represents the quantity, you can modify it according to your needs
  };

  return (
    <>
      <div className="container drug-content">
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {products.map((product) => (
              <div className="row drug" key={product._id}>
                <div className="col-md-2">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.image} alt={product.name} height={100} />
                  </Link>
                </div>
                <div className="col-md-2 ">
                  {product.countInStock > 200 ? (
                    <span style={{ color: "green" }}>Brand : Emzor</span>
                  ) : (
                    <span style={{ color: "green" }}>Brand : Merk</span>
                  )}
                </div>
                <div className="col-md-4 drug-detail">
                  <span>{product.name}</span>
                  <span>{product.description}</span>
                </div>
                <div className="col-md-2 ">
                  {product.countInStock > 0 ? (
                    <span className="inStock">In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="col-md-2 drug-price">
                  <h3 className="price mb-2">₦{product.price}</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCartHandler(product._id)}
                  >
                    Add to list
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Pagination */}
        <Pagination
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
        />
      </div>
    </>
  );
};

export default ShopSection;
