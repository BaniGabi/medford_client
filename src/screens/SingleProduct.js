import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Rating from "../components/homeComponents/Rating";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import moment from "moment";
import Sidebar from "../components/sidebar";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Drug Detail</h2>
          </div>
          <div className="container single-product">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="img-fluid img-responsive rounded product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        height={350}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-dtl">
                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                      </div>
                      <p>{product.description}</p>

                      <div className="product-count col-lg-7">
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Price</h6>
                          <span>${product.price}</span>
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Status</h6>
                          {product.countInStock > 0 ? (
                            <span>In Stock</span>
                          ) : (
                            <span>Unavailable</span>
                          )}
                        </div>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Reviews</h6>
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                          />
                        </div>
                        {product.countInStock > 0 && (
                          <>
                            <div className="flex-box d-flex justify-content-between align-items-center">
                              <h6>Quantity</h6>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <button
                              onClick={addToCartHandler}
                              className="round-black-btn"
                            >
                              Add To List
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RATING */}
                <div className="row my-5">
                  <div className="col-md-6">
                    <h6 className="mb-3">REVIEWS</h6>
                    {product.reviews.length === 0 ? (
                      <Message variant="alert-info mt-3">No Reviews</Message>
                    ) : (
                      product.reviews.map((review) => (
                        <div
                          key={review._id}
                          className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                        >
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <span>{moment(review.createdAt).calendar()}</span>
                          <div className="alert alert-info mt-3">
                            {review.comment}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6>WRITE A CUSTOMER REVIEW</h6>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        {loadingCreateReview && <Loading />}
                        {errorCreateReview && (
                          <Message variant="alert-danger">
                            {errorCreateReview}
                          </Message>
                        )}
                        <div className="my-4">
                          <strong>Rating</strong>
                          <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Comment</strong>
                          <textarea
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button
                            disabled={loadingCreateReview}
                            className="col-12 btn-primary border-0 p-3 rounded text-white"
                          >
                            SUBMIT
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="my-3">
                        <Message variant="alert-warning">
                          Please{" "}
                          <Link to="/login">
                            <strong>Login</strong>
                          </Link>{" "}
                          to write a review.
                        </Message>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleProduct;
