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
        <section className="content-main">
          <ShopSection keyword={"m"} pagenumber={1} />
        </section>
      </main>
    </>
  );
};

export default HomeScreen;
