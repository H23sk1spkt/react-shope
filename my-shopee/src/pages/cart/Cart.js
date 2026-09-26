import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
function Cart() {
  const [cart, setCart] = useState({});
  let total = 0;
  const { setTotalQty } = useCart();
  let product=JSON.parse(localStorage.getItem('product'));
  useEffect(() => {
    axios.post("http://localhost:8000/api/addCart",{
          product:product
        })
        .then((res)=> {
            console.log(res.data);
            setCart(res.data.cart);
        })
        .catch((error)=> console.log("DATA",error.response?.data));
  }, []);
  function handleCal(e, id, cal, isDelete = false) {
    e.preventDefault();
    if(isDelete){
      // vì cart được tạo từ useState
      // nên khi xoá thì phải tạo clone rồi mới xoá
      setTotalQty(prev => prev - Number(product[id]));
      const newCart={...cart};
      delete newCart[id];
      setCart(newCart)
      delete product[id];
      localStorage.setItem('product',JSON.stringify(product));
      return
    }
    const qty = Number(product[id]) + Number(cal);
    if (qty === 0) {
      alert("Vui lòng ko để sản phẩm về 0");
      return;
    }
    setTotalQty(prev => prev+Number(cal));
    const newCart= {...cart,[id]:{
      ...cart[id],
      qty:qty
    }}
    setCart(newCart);
    product[id]=qty;
    localStorage.setItem('product',JSON.stringify(product));

  }
  return (
    <>
      <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Image</td>
                    <td className="description">Name</td>
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(cart).length === 0 ? (
                    <tr>
                      <td colSpan="6">Không có sản phẩm nào trong giỏ</td>
                    </tr>
                  ) : (
                    Object.values(cart).map((value) => {
                      const price = Number(value.price.replace("$", ""));
                      total += price * value.qty;
                      return (
                        <tr>
                          <td className="cart_product">
                            <a href>
                              <img
                                src={`http://localhost:8000/uploads/user/product/${value.id_user}/hinh2_85_84_${value.avatar[0]}`}
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="cart_description">
                            <h4>
                              <a href>{value.name}</a>
                            </h4>
                            <p>Web ID: 1089772</p>
                          </td>
                          <td className="cart_price">
                            <p>${price}</p>
                          </td>
                          <td className="cart_quantity">
                            <div className="cart_quantity_button">
                              <a
                                className="cart_quantity_up"
                                onClick={(e) => handleCal(e, value.id, 1)}
                              >
                                {" "}
                                +{" "}
                              </a>
                              <input
                                className="cart_quantity_input"
                                type="text"
                                name="quantity"
                                value={value.qty}
                                autoComplete="off"
                                size={2}
                              />
                              <a
                                className="cart_quantity_down"
                                onClick={(e) => handleCal(e, value.id, -1)}
                              >
                                {" "}
                                -{" "}
                              </a>
                            </div>
                          </td>
                          <td className="cart_total">
                            <p className="cart_total_price">
                              ${price * value.qty}
                            </p>
                          </td>
                          <td className="cart_delete">
                            <a
                              className="cart_quantity_delete"
                              onClick={(e) => handleCal(e, value.id, 0, true)}
                            >
                              <i className="fa fa-times" />
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                  <tr>
                    <td colSpan="6">${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>{" "}
        {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>
                Choose if you have a discount code or reward points you want to
                use or would like to estimate your delivery cost.
              </p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Get Quotes
                  </a>
                  <a className="btn btn-default check_out" href>
                    Continue
                  </a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>
                      Cart Sub Total <span>${total}</span>
                    </li>
                    <li>
                      Shipping Cost <span>Free</span>
                    </li>
                    <li>
                      Total <span>${total}</span>
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Update
                  </a>
                  <Link className="btn btn-default check_out"  to="/checkout">
                    Check Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*/#do_action*/}
      </div>
    </>
  );
}
export default Cart;
