import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import Sidebar from "../components/sidebar";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Products</h2>
          </div>
          <ShopSection keyword={"m"} pagenumber={1} />
        </section>
      </main>
    </>
  );
};

export default HomeScreen;
