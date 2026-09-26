import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import ProductCart from "../../productCart/ProductCart";
import axios from "axios";
function SearchAdvance() {
  const [products, setProduct] = useState([]);
  const { setTotalQty } = useCart();
  const [categories, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [status, setStatus] = useState([]);
  const [page,setPage]=useState(1);
  const [lastPage,setLastPage]=useState(0);
  const [searchData,setSearchData]=useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/searchAdvance")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data.categories);
        setBrand(res.data.brands);
        setStatus(res.data.status);
        
      })
      .catch((error) => {
        console.log("STATUS", error.response?.data);
        console.log("DATA", error.response?.data);
      });
  },[]);
  function addCart(id, e) {
    e.preventDefault();
    let product = JSON.parse(localStorage.getItem("product")) || {};
    if (product[id]) {
      product[id]++;
    } else {
      product[id] = 1;
    }
    setTotalQty(prev=> prev+1);
    localStorage.setItem("product", JSON.stringify(product));
  }
  useEffect(()=> {
    if(!searchData) return
    axios.get("http://localhost:8000/api/searchAdvance/search",{
        params : {
            ...searchData,
            page:page
        }
    })
    .then((res)=> {
        console.log(res.data);
        setProduct(res.data.products.products.data);
        setLastPage(res.data.products.products.last_page);
    })
    .catch((error) => {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("ERROR:", error);
      });
  },[searchData,page])
  function handleSubmit(e){
    e.preventDefault();
    const formData=new FormData(e.target);
    const data=Object.fromEntries(formData.entries());
    setSearchData(data);
    setPage(1);
  }
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          {/*features_items*/}
          <h2 className="title text-center">Features Items</h2>
          <form onSubmit={(e)=> handleSubmit(e)}>
            <div style={{display:"flex",justifyContent:"space-between",gap:"15px"}}>
              <input name="name" type="text" placeholder="Name" />
              <select name="price">
                <option value="">Choose price</option>
                <option value="10-20">$10-$20</option>
                <option value="21-50">$21-$50</option>
                <option value="51-100">$51-$100</option>
              </select>
              <select name="categories">
                <option>Choose categories</option>
                {categories.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
              <select name="brands">
                <option>Choose brands</option>
                {brands.map((value) => {
                  return <option value={value.id}>{value.title}</option>;
                })}
              </select>
              <select name="status">
                <option>Choose status</option>
                {status.map((value) => {
                  return (
                    <option value={value.status}>
                      {value.status === 0 ? "New" : "Sale"}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit" className="btn-default btn" >Search</button>
          </form>
          <ProductCart products={products} addCart={addCart} />
        </div>
        <div className="pagination-area">
          <ul className="pagination">
            {[...Array(lastPage)].map((_, index) => {
              const number = index+1;
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
      </div>
    </>
  );
}
export default SearchAdvance;
