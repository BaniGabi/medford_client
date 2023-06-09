import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import { addToCart } from "../../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const [keywordSearch, setkeywordSearch] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  const handleAddToList = (productId, qty) => {
    dispatch(addToCart(productId, qty));
    toast.success("Product added to your list!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  toast.configure();
  const handleSearch = (e) => {
    setkeywordSearch(e.target.value);
  };

  // Filter the products based on the keyword
  const filteredProducts =
    products &&
    products.filter((product) =>
      product.name.toLowerCase().includes(keywordSearch.toLowerCase())
    );
  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div class="searchbar">
            <input
              class="search_input"
              type="text"
              name=""
              placeholder="Search for any drugs  here "
              value={keywordSearch}
              onChange={handleSearch}
            />
            <a href="#" class="search_icon">
              <i class="fas fa-search"></i>
            </a>
          </div>
          <br />
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="row p-2 bg-white border rounded"
                    key={product._id}
                  >
                    <div className="col-md-3 mt-1">
                      <img
                        className="img-fluid img-responsive rounded product-image"
                        src={product.image}
                        alt={product.name}
                        height={50}
                      />
                    </div>
                    <div className="col-md-6 mt-1">
                      <h5>{product.name}</h5>
                      <div className="d-flex flex-row">
                        <div className="ratings mr-2"></div>
                        <span>{product.reviews}</span>
                      </div>
                      <div className="mt-1 mb-1 spec-1"></div>
                      <div className="mt-1 mb-1 spec-1">
                        {product.countInStock > 0 ? (
                          <span className="brand">Brand : Emzor</span>
                        ) : (
                          <>
                            <span className="brand">Brand : Merk</span>
                          </>
                        )}
                      </div>
                      <p className="text-justify text-truncate para mb-0">
                        {product.description}
                      </p>
                    </div>
                    <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                      <div className="d-flex flex-row align-items-center">
                        <h5 className="mr-1">${product.price}</h5>
                        <span className="strike-text">
                          ${product.price / 0.4}
                        </span>
                      </div>
                      <h6 className="text-success">Free shipping</h6>
                      <div className="d-flex flex-column mt-4">
                        <Link
                          to={`/products/${product._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Details
                        </Link>

                        <button
                          className="btn btn-outline-primary  mt-2 fa fa-cart-plus"
                          type="button"
                          onClick={() => handleAddToList(product._id, 1)}
                        >
                          <i className=""></i>
                          Add to list
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No products found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSection;
