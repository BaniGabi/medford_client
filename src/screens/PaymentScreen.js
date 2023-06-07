import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <Link
              to="/shipping"
              className="fa fa-arrow-left"
              style={{
                fontSize: "23px",
              }}
            ></Link>
          </div>
          <div className="container d-flex justify-content-center align-items-center login-center">
            <form
              className="Login2 col-md-8 col-lg-4 col-11"
              onSubmit={submitHandler}
            >
              <h6>SELECT PAYMENT METHOD</h6>
              <div className="payment-container">
                <div className="radio-container">
                  <input
                    className="form-check-input"
                    type="radio"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label">
                    Cash or Credit Card
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Continue
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default PaymentScreen;
