import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MyProduct() {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [product, setProduct] = useState([]);
  const id_user = userLocal.Auth.id;
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/member", {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      })
      .then((res) => {
        setProduct(res.data.products.products);
      })
      .catch((error) => console.log(error));
  }, []);
  function DeleteProduct(e, id) {
    e.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // NẾU DÙNG DÂU {} THÌ PHẢI CÓ RETURN TRẢ VỀ
        setProduct((prevProducts) =>
          prevProducts.filter(
            (productChild) => productChild.id !== id,
          ),
        );
      })
      .catch((error) => {
        console.log("STATUS", error.response?.status);
        console.log("DATA", error.response?.data);
      });
  }
  return (
    <>
      <div className="col-sm-9">
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="Id">Id</td>
                <td className="description">name</td>
                <td className="image">image</td>
                <td className="price">price</td>
                <td className="total">action</td>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 ? (
                product.map((value) => {
                  return (
                    <>
                      <tr>
                        <td className="cart_id">
                          <h4>
                            <a href>{value.id}</a>
                          </h4>
                        </td>
                        <td className="cart_description">
                          <h4>
                            <a href>{value.name}</a>
                          </h4>
                        </td>
                        <td className="cart_product">
                          <a href>
                            <img
                              src={`http://127.0.0.1:8000/uploads/user/product/${id_user}/hinh2_85_84_${value.avatar}`}
                              alt=""
                            />
                          </a>
                        </td>
                        <td className="cart_price">
                          <p>{value.price}</p>
                        </td>
                        <td className="cart_total">
                          <Link to={`/edit-product/${value.id}`}>
                            edit
                          </Link>
                          <a onClick={(e) => DeleteProduct(e, value.id)}>
                            delete
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="5">
                    Không có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default MyProduct;
