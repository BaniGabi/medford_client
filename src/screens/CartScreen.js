import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removefromcart } from "../Redux/Actions/cartActions";
import Sidebar from "../components/sidebar";
import ModalDialog from "../components/Dialog";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const [priceLocked, setPriceLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5 * 24 * 60 * 60);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  useEffect(() => {
    let intervalId;

    if (priceLocked && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [priceLocked, remainingTime]);
  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;

    return `${days}d-${hours}h-${minutes}m-${seconds}s`;
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };
  const lockPrice = () => {
    setPriceLocked(true);
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <section className="content-main">
          <div className="card-list">
            <div className="row">
              <div className="col-md-8 cart-list">
                <div className="title-list">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>Your drugs list</b>
                      </h4>
                    </div>
                    <div className="col align-self-center text-right text-muted">
                      {cartItems.length} drugs
                    </div>
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="row text-center mt-3">
                    <div className="col">
                      Your list is empty
                      <Link
                        className="btn mx-5 px-5 py-3"
                        to="/"
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#42aeec",
                        }}
                      >
                        Add NOW
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row border-top border-bottom">
                      {cartItems.map((item) => (
                        <div
                          className="row main-list align-items-center"
                          key={item.product}
                        >
                          <div className="col-2 ">
                            <img
                              className="img-fluid img-list"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="col ">
                            <div className="row text-muted">{item.name}</div>
                          </div>
                          <div className="col ">
                            <div className="quantity">
                              <button
                                onClick={() =>
                                  dispatch(
                                    addToCart(item.product, item.qty - 1)
                                  )
                                }
                                className="btn minus-btn"
                              >
                                -
                              </button>
                              <span>{item.qty}</span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    addToCart(item.product, item.qty + 1)
                                  )
                                }
                                className="btn plus-btn"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="price">
                                ₦{(item.qty * item.price).toFixed(2)}
                              </span>
                              <button
                                onClick={() =>
                                  removeFromCartHandler(item.product)
                                }
                                className="btn close-list"
                              >
                                &#10005;
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="back-to-shop">
                      <Link to="/">
                        <span className="text-muted">
                          &leftarrow; Back to shop
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="col-md-4 summary">
                <div>
                  <h5>
                    <b>Summary</b>
                  </h5>
                </div>
                <hr className="hr-list" />

                <div className="row">
                  <div className="col" style={{ paddingLeft: 0 }}>
                    Drugs {cartItems.length}
                  </div>
                  <div className="col text-right">₦ {total}</div>
                </div>

                <form className="form-list">
                  <p>SHIPPING</p>
                  <select className="select-list">
                    <option className="text-muted">
                      Standard-Delivery- ₦0.00
                    </option>
                  </select>
                </form>

                <div
                  className="row"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,.1)",
                    padding: "2vh 0",
                  }}
                >
                  <div className="col">TOTAL: </div>
                  <div
                    className={`col text-right${
                      priceLocked ? " price-locked" : ""
                    }`}
                  >
                    ₦ {total}
                    {priceLocked && (
                      <span className="lock-icon">
                        <i className="fa fa-lock" />
                      </span>
                    )}
                  </div>
                </div>

                {total > 0 && (
                  <>
                    {!priceLocked && (
                      <button
                        onClick={lockPrice}
                        className="btn-lock fa fa-lock"
                      >
                        Lock this price
                      </button>
                    )}
                    {priceLocked && (
                      <span className="lock-text">
                        Price locked for {formatTime(remainingTime)}
                      </span>
                    )}
                    <button onClick={checkoutHandler} className="btn-list">
                      CHECKOUT
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CartScreen;
