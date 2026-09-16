import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Err from "../../user/Err";
function EditProduct() {
  const [inputs, setInput] = useState({
    name: "",
    price: "",
    id_category: 1,
    id_brand: 1,
    status: 0,
    sale: 0,
    company: "",
    avatar: [],
    avatar_new: [],
    hinhxoa: [],
    detail: "",
  });
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const id_user = userLocal.Auth.id;
  const { id } = useParams();
  const [categories, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [status, setStatus] = useState([]);
  const [errors, setErr] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${userLocal.token} `,
        },
      })
      .then((res) => {
        setInput((state) => ({
          ...state,
          ...res.data.product,
          avatar_new: [],
          hinhxoa: [],
        }));
        setCategory(res.data.categories);
        setBrand(res.data.brands);
        setStatus(res.data.status);
        console.log(res.data.product);
      })
      .catch((error) => console.log(error));
  }, [id]);
  function handleInput(e) {
    e.preventDefault();
    const name = e.target.name;
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      if (files.length > 3) {
        alert("Vui lòng chọn tối đa 3 ảnh");
        return;
      }
      setInput((state) => ({ ...state, [name]: files }));
      return;
    }
    const value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function handleDeleteImg(index) {
    setInput((state) => {
      // tạo ra mảng mới
      // state.hinhxoa=[0,2] -> hinhxoa=[0,2]
      let hinhxoa = [...state.hinhxoa];
      if (hinhxoa.includes(index)) {
        hinhxoa = hinhxoa.filter((item) => item !== index);
      } else {
        hinhxoa.push(index);
      }
      return {
        // giữ nguyên tất cả
        ...state,
        // nhưng thay hinh xoá bằng mảng mới
        hinhxoa: hinhxoa,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let err = false;
    const formData = new FormData(e.target);
    if (
      !inputs.name ||
      !inputs.price ||
      !inputs.id_category ||
      !inputs.id_brand ||
      !inputs.company ||
      !inputs.detail
    ) {
      errorSubmit.common = "Vui lòng nhập đầy đủ thông tin";
      err = true;
    }
    if (inputs.avatar_new.length > 0) {
      const img = ["png", "jpeg", "jpg", "JPEG", "PNG", "JPG"];
      for (let file of inputs.avatar_new) {
        const duoiImg = file.name.split(".").pop();
        if (file.size > 1024 * 1024 || !img.includes(duoiImg)) {
          errorSubmit.avatar = "Vui lòng chọn ảnh hợp lệ";
          err = true;
          break;
        }
      }
    }
    if (
      inputs.avatar.length - inputs.hinhxoa.length + inputs.avatar_new.length >
      3
    ) {
      errorSubmit.avatar = "Chỉ hiển thị được tối đa 3 ảnh ";
      err = true;
    }
    setErr(errorSubmit);
    if (!err) {
      for (let element of formData) {
        console.log(element);
      }
      formData.delete("avatar");
      // đếu có thể dùng foreach và for(let .. of)
      for (let file of inputs.avatar_new) {
        formData.append("avatar_new[]", file);
      }
      for (let file of inputs.hinhxoa) {
        formData.append("hinhxoa[]", file);
      }
      formData.append("_method", "PUT");
      axios
        .post(`http://127.0.0.1:8000/api/product/edit/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${userLocal.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
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
            <h2>update product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInput}
                placeholder="Name"
              />
              <input
                type="text"
                name="price"
                value={inputs.price}
                onChange={handleInput}
                placeholder="Email Address"
              />
              <select
                name="id_category"
                value={inputs.id_category}
                onChange={handleInput}
              >
                {categories.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
              <select
                name="id_brand"
                value={inputs.id_brand}
                onChange={handleInput}
              >
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
                value={inputs.company}
                onChange={handleInput}
                placeholder="Company"
              />
              <div
                className="old-images"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {inputs.avatar.map((value, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={`http://127.0.0.1:8000/uploads/user/product/${id_user}/hinh2_85_84_${value}`}
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={inputs.hinhxoa.includes(index)}
                          onChange={() => handleDeleteImg(index)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
              <input
                type="file"
                name="avatar_new"
                onChange={handleInput}
                multiple
              />
              <input
                type="text"
                name="detail"
                value={inputs.detail}
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
export default EditProduct;
