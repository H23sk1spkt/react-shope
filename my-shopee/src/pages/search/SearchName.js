import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import ProductCart from "../../productCart/ProductCart";
import axios from "axios";
function SearchName() {
  const { keyword } = useParams();
  const [products, setProduct] = useState([]);
  const { setTotalQty } = useCart();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [keyword]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/search`, {
        params: {
          key: keyword,
          page: page,
        },
      })
      .then((res) => {
        setProduct(res.data.products.products.data);
        setLastPage(res.data.products.products.last_page);
      })
      .catch((error) => {
        console.log("STATUS", error.response?.status);
        console.log("DATA", error.response?.data);
      });
  }, [keyword, page]);
  function addCart(id, e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/index",
        { id: id },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log("RESPONSE:", res.data);
        setTotalQty(res.data.totalQty);
      })
      .catch((error) => {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("ERROR:", error);
      });
  }
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          {/*features_items*/}
          <h2 className="title text-center">Features Items</h2>
          <ProductCart products={products} addCart={addCart} />
        </div>
        <div className="pagination-area">
          <ul className="pagination">
            {[...Array(lastPage)].map((_, index) => {
              const number = index + 1;
              return (
                <>
                  <li key={number}>
                    <a
                      className={page === number ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(number);
                      }}
                    >
                      {number}
                    </a>
                  </li>
                </>
              );
            })}
            {lastPage > 3 && page < lastPage && (
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                <i className="fa fa-angle-double-right" />
              </li>
            )}
          </ul>
        </div>
        {/*features_items*/}
        <div className="category-tab">
          {/*category-tab*/}
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href="#tshirt" data-toggle="tab">
                  T-Shirt
                </a>
              </li>
              <li>
                <a href="#blazers" data-toggle="tab">
                  Blazers
                </a>
              </li>
              <li>
                <a href="#sunglass" data-toggle="tab">
                  Sunglass
                </a>
              </li>
              <li>
                <a href="#kids" data-toggle="tab">
                  Kids
                </a>
              </li>
              <li>
                <a href="#poloshirt" data-toggle="tab">
                  Polo shirt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchName;
