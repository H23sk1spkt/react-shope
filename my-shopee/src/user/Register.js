import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Err from "./Err";
function Register() {
  const [countries, setCountry] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    id_country: "",
    avatar: null,
  });
  const [errors, setError] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/register")
      .then((res) => {
        setCountry(res.data.countries);
      })
      .catch((error) => console.log(error));
  });
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function handleRegister(e) {
    e.preventDefault();
    console.log(input);
    const formData = new FormData(e.target);
    let errorSubmit = {};
    let err = false;
    const img = ["png", "jpeg", "jpg", "PNG", "JPG", "JPEG"];
    if (
      !input.name.trim() ||
      !input.email.trim() ||
      !input.password.trim() ||
      !input.password_confirmation.trim() ||
      !input.phone.trim() ||
      !input.id_country.trim() ||
      !input.avatar
    ) {
      errorSubmit.common = "Vui lòng nhập đầy đủ thông tin";
      err = true;
    }
    if (input.password !== input.password_confirmation) {
      errorSubmit.password = "Mật khẩu xác nhận không khớp";
      err = true;
    }
    if (!input.avatar) {
      errorSubmit.avatar = "Vui lòng chọn ảnh làm ảnh đại diện";
      err = true;
    } else {
      const duoiImg = input.avatar.name.split(".").pop();
      if (input.avatar.size > 1024 * 1024 || !img.includes(duoiImg)) {
        errorSubmit.avatar = "Ảnh upload ko hợp lệ";
        err = true;
      }
    }
    setError(errorSubmit);
    if (!err) {
      axios
        .post("http://127.0.0.1:8000/api/register", formData)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <>
      <Err errors={errors} />
      <div className="col-sm-6 col-sm-offset-3">
        <div className="signup-form">
          <h2>New User Signup!</h2>
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
                return <option value={value.id}>{value.title}</option>;
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
    </>
  );
}
export default Register;
