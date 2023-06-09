import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

const Header = (props) => {
  const { title } = props;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  return (
    <header className="main-header navbar">
      <h3> {title} </h3>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          {userInfo ? (
            <div className="btn-group">
              <h3>Hi, {userInfo.name}</h3>
            </div>
          ) : (
            <>
              <h3 className="badge">Your are not login </h3>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
