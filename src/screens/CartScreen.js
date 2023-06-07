import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../Redux/Actions/cartActions";
import Sidebar from "../components/sidebar";
import { removefromcart } from "./../Redux/Actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Sidebar />
      {/* Cart */}
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <h3 className="content-title">Your List</h3>
          </div>{" "}
          {cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
              Your list is empty
              <Link
                className="btn  mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: "12px",
                  backgroundColor: "#42aeec",
                }}
              >
                Add NOW
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <div className=" alert alert-info text-center mt-3">
                  Total Drugs in you list
                  <Link className="text-success mx-2" to="/cart">
                    ({cartItems.length})
                  </Link>
                </div>

                <table className="table">
                  <tbody>
                    {cartItems.map((item) => (
                      <>
                        <tr key={item.product}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                              height={70}
                            />
                          </td>
                          <td>
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>

                          <td>
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>₦{item.price}</td>
                          <td>₦{(item.qty * item.price).toFixed(2)}</td>
                          <td>
                            <button
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                              className="remove-button"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <div className="total">
                              <span className="sub">Total:</span>
                              <span className="total-price">₦{total}</span>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="cart-buttons d-flex align-items-center row">
                  <Link to="/" className="col-md-6 ">
                    <button className="second-color">Continue To add</button>
                  </Link>
                  {total > 0 && (
                    <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                      <button onClick={checkoutHandler} className="btn-primary">
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default CartScreen;
