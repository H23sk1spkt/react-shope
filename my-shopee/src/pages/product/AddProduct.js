import axios from "axios";
import { useEffect, useState } from "react";
import Err from "../../user/Err";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [inputs, setInput] = useState({
    name: "",
    price: "",
    id_category: 1,
    id_brand: 1,
    status: 0,
    sale: 0,
    company: "",
    avatar: null,
    detail: "",
  });
  const [categories, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [status, setStatus] = useState([]);
  const [errors, setError] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/add", {
        headers: {
          Authorization: `Bearer ${userLocal.token}`,
        },
      })
      .then((res) => {
        setCategory(res.data.categories);
        setBrand(res.data.brands);
        setStatus(res.data.status);
      })
      .catch((error) => console.log(error));
  },[]);
  function handleInput(e) {
    e.preventDefault();
    const name = e.target.name;
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      if (files.length > 3) {
        alert("Chi được chọn tối đa 3 ảnh ");
        return;
      }
      setInput((state) => ({ ...state, [name]: files }));
      return;
    }
    const value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let err = false;
    const formData = new FormData(e.target);
    console.log(inputs);
    if (
      !inputs.name ||
      !inputs.price ||
      !inputs.id_category ||
      !inputs.id_brand ||
      !inputs.company ||
      !inputs.detail
    ) {
      errorSubmit.common = "Vui long nhập đầy thôgng tin";
      err = true;
    }
    if (!inputs.avatar || inputs.avatar.length === 0) {
      errorSubmit.avatar = "Vui lòng chọn ảnh";
      err = true;
    } else {
      const img = ["png", "jpeg", "jpg", "PNG", "JPEG", "JPG"];

      for (let file of inputs.avatar) {
        const duoiImg = file.name.split(".").pop();

        if (!img.includes(duoiImg) || file.size > 1024 * 1024) {
          errorSubmit.avatar = "Ảnh upload không hợp lệ";
          err = true;
          break;
        }
      }
    }
    setError(errorSubmit);
    if (!err) {
      formData.delete("avatar");
      // ko muốn tạo mảng mới thì dùng foreach , chỉ duyêt chứ ko biến đổi dữ liệu
      inputs.avatar.forEach((file) => {
        formData.append("avatar[]", file);
      });
      axios
        .post("http://127.0.0.1:8000/api/product/add", formData, {
          headers: {
            Authorization: `Bearer ${userLocal.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/my-product");
        })
        .catch((error) => {
             console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
        });
    }
  }
  return (
    <>
      <Err errors={errors} />
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Update user</h2>
          <div className="signup-form">
            {/*sign up form*/}
            <h2>Create product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                placeholder="Name"
              />
              <input
                type="text"
                name="price"
                onChange={handleInput}
                placeholder="Email Address"
              />
              <select name="id_category" onChange={handleInput}>
                {categories.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
              <select name="id_brand" onChange={handleInput}>
                {brands.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
              <select
                name="status"
                value={inputs.status}
                onChange={handleInput}
              >
                {status.map((value) => {
                  return (
                    <option value={value.status}>
                      {value.status === 0 ? "New" : "Sale"}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                name="sale"
                value={inputs.status == 0 ? 0 : inputs.sale}
                disabled={inputs.status == 0}
                onChange={handleInput}
              />
              <input
                type="text"
                name="company"
                onChange={handleInput}
                placeholder="Company"
              />
              <input
                type="file"
                name="avatar"
                onChange={handleInput}
                multiple
              />
              <input
                type="text"
                name="detail"
                onChange={handleInput}
                placeholder="Detail"
              />
              <button type="submit" className="btn btn-default">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
