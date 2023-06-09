import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./profileComponents/Orders";
import { logout } from "../Redux/Actions/userActions";

const Sidebar = () => {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/medford.svg"
              style={{ height: "46" }}
              className="logo"
              alt="medford front store "
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">All Drugs</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/cart"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">
                  Drugs List{" "}
                  <span className="badge"> {cartItems.length} drugs</span>
                </span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/profile"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Profile</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <Link className="menu-link" to="/login">
                <i className="icon fas fa-sign-in"></i>
                <span className="text">Login</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link className="menu-link" to="#" onClick={logoutHandler}>
                <i className="icon fas fa-sign-out"></i>
                <span className="text">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
