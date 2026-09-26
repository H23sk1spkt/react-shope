import axios from "axios";
import { useEffect, useState } from "react";
import Err from "../../user/Err";
function Checkout() {
  const [countries, setCountry] = useState([]);
  const [cart, setCart] = useState({});
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [errors, setError] = useState({});
  let total = 0;
  const product=JSON.parse(localStorage.getItem('product'))
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    phone: "",
    id_country: "",
    avatar: null,
  });
  console.log(userLocal.Auth.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registerRes, cartRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/register"),
          axios.post("http://localhost:8000/api/addCart",{
            product:product
          }),
        ]);
        setCountry(registerRes.data.countries);
        setCart(cartRes.data.cart);
      } catch (error) {
        console.log("STATUS", error.response?.status);
        console.log("DATA", error.response?.data);
      }
    };
    fetchData();
  }, []);
  function handleInput(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function handleRegister(e) {
    let err = false;
    let errorSubmit = {};
    const img = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
    const formData = new FormData(e.target);
    e.preventDefault();
    if (
      !input.name ||
      !input.email ||
      !input.password ||
      !input.password_confirmation ||
      !input.address ||
      !input.phone ||
      !input.id_country ||
      !input.avatar
    ) {
      errorSubmit.common = "Vui lòng nhập đầy đủ thông tin";
      err = true;
    }
    if (input.password !== input.password_confirmation) {
      errorSubmit.password = "Vui lòng nhập mật khẩu xác nhận trùng khớp";
      err = true;
    }
    if (input.avatar) {
      const duoiimg = input.avatar.name.split(".").pop();
      if (input.avatar.size > 1024 * 1024 || img.includes(duoiimg)) {
        errorSubmit.avatar = "Vui lòng chọn ảnh hợp lệ";
        err = true;
      }
    }
    setError(errorSubmit);
    if (!err) {
      axios
        .post("http://127.0.0.1:8000/api/checkout/register", formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("STATUS", err.response?.status);
          console.log("DATA", err.response?.data);
        });
    }
  }
  function handlePayment(e){
      e.preventDefault();
      axios.post("http://localhost:8000/api/checkout/sendMail",{cart:cart},{
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        }
      })
      .then((res)=> {
        console.log(res.data);
      })
      .catch((error)=> {
        console.log("STATUS" , error.response?.status);
        console.log("DATA" , error.response?.data);
      })
    }
  return (
    <>
      <Err errors={errors} />
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Check out</li>
            </ol>
          </div>
          {/*/breadcrums*/}
          <div className="step-one">
            <h2 className="heading">Step1</h2>
          </div>
          {/*/checkout-options*/}
          {/*/register-req*/}
          {userLocal ? (
            ""
          ) : (
            <div className="shopper-informations">
              <div className="row">
                <div className="col-sm-3">
                  <div className="shopper-info">
                    <p>Shopper Information</p>
                    <form onSubmit={handleRegister}>
                      <label>Tên</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleInput}
                      />
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        placeholder="Email Address"
                      />
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleInput}
                        placeholder="Password"
                      />
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Password"
                        onChange={handleInput}
                      />
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={handleInput}
                      />
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        onChange={handleInput}
                        placeholder="Phone"
                      />
                      <label>Country</label>
                      <select
                        name="id_country"
                        onChange={handleInput}
                        value={input.id_country}
                      >
                        {countries.map((value) => {
                          return (
                            <option value={value.id}>{value.title}</option>
                          );
                        })}
                      </select>
                      <label>Avatar</label>
                      <input type="file" name="avatar" onChange={handleInput} />

                      <button type="submit" className="btn btn-default">
                        Signup
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="review-payment">
            <h2>Review &amp; Payment</h2>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
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
                            <a className="cart_quantity_up"> + </a>
                            <input
                              className="cart_quantity_input"
                              type="text"
                              name="quantity"
                              value={value.qty}
                              autoComplete="off"
                              size={2}
                            />
                            <a className="cart_quantity_down"> - </a>
                          </div>
                        </td>
                        <td className="cart_total">
                          <p className="cart_total_price">
                            ${price * value.qty}
                          </p>
                        </td>
                        <td className="cart_delete">
                          <a className="cart_quantity_delete">
                            <i className="fa fa-times" />
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
                <tr>
                  <td colspan="4">&nbsp;</td>
                  <td colspan="2">
                    <table class="table table-condensed total-result">
                      <tr>
                        <td>Cart Sub Total</td>
                        <td>${total}</td>
                      </tr>
                      <tr class="shipping-cost">
                        <td>Shipping Cost</td>
                        <td>Free</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>
                          <span>${total}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Checkout</td>
                        <td>
                          <button onClick={(e)=> handlePayment(e)}  style={{ marginLeft: "-10px" }} className="btn btn-default update" >Submit</button>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="payment-options">
            <span>
              <label>
                <input type="checkbox" /> Direct Bank Transfer
              </label>
            </span>
            <span>
              <label>
                <input type="checkbox" /> Check Payment
              </label>
            </span>
            <span>
              <label>
                <input type="checkbox" /> Paypal
              </label>
            </span>
          </div>
        </div>
      </section>{" "}
      {/*/#cart_items*/}
    </>
  );
}
export default Checkout;
