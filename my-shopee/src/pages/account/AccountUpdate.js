import axios from "axios";
import { useEffect, useState } from "react";

function AccountUpdate() {
  const [inputs, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    id_country: "",
    phone: "",
    avatar: null,
  });
  const [countries, SetCountries] = useState([]);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/member", {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      })
      .then((res) => {
        setInput(res.data.user.user);
        SetCountries(res.data.user.countries);
      })
      .catch((error) => console.log(error));
  }, []);
  function handleInput(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let err = false;
    const formData = new FormData(e.target);
    console.log(formData);

    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.address ||
      !inputs.phone ||
      !inputs.id_country
    ) {
      errorSubmit.common = "Vui lòng nhập đầy đủ thông tin";
      err = true;
    }
    if (inputs.password && inputs.password !== inputs.password_confirmation) {
      errorSubmit.password = "Vui lòng xác nhận lại mật khẩu";
      err = true;
    }
    if (inputs.avatar instanceof File) {
      const duoiImg = inputs.avatar.name.split(".").pop();
      const img = ["png", "jpg", "jpeg", "JPEG", "JPG", "PNG"];
      if (inputs.avatar.size > 1024 * 1024 || !img.includes(duoiImg)) {
        errorSubmit.avatar = "Ảnh upload ko hợp lệ";
        err = true;
      }
    }
    if (!err) {
      if ((!inputs.avatar) instanceof File) {
        formData.delete("avatar");
      }
      formData.append("_method", "PUT");
      axios
        .post("http://127.0.0.1:8000/api/profile/member", formData, {
          headers: {
            Authorization: `Bearer ${userLocal.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <div class="col-sm-9">
        <div class="blog-post-area">
          <h2 class="title text-center">Update user</h2>
          <div class="signup-form">
            <h2>update User!</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInput}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleInput}
                placeholder="Email Address"
              />
              <input
                type="password"
                name="password"
                onChange={handleInput}
                placeholder="Password"
              />
              <input
                type="password"
                name="password_confirmation"
                onChange={handleInput}
                placeholder="Password"
              />
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleInput}
                placeholder="Name"
              />
              <select
                value={inputs.id_country}
                onChange={handleInput}
                name="id_country"
              >
                {countries.map((value) => {
                  return (
                    <>
                      <option value={value.id}>{value.title}</option>
                    </>
                  );
                })}
              </select>
              <input
                type="text"
                name="phone"
                value={inputs.phone}
                onChange={handleInput}
                placeholder="Name"
              />
              <input
                type="file"
                name="avatar"
                onChange={handleInput}
                placeholder="Name"
              />
              <button type="submit" class="btn btn-default">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AccountUpdate;
