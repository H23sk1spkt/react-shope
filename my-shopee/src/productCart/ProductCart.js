import { Link } from "react-router-dom";
function ProductCart({products,addCart}){
    return (products.map((value) => {
            return (
              <div className="col-sm-4">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img
                        src={`http://localhost:8000/uploads/user/product/${value.id_user}/hinh3_329_380_${value.avatar[0]}`}
                        alt=""
                      />
                      <h2>{value.price}</h2>
                      <p>{value.price}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2>{value.price}</h2>
                        <p>{value.name}</p>
                        <a
                          className="btn btn-default add-to-cart add-tp-cart-main"
                          onClick={(e) => addCart(value.id, e)}
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                      <li>
                        <a href="#">
                          <i className="fa fa-plus-square" />
                          Add to wishlist
                        </a>
                      </li>
                      <li>
                        <Link to={`/product/detail/${value.id}`}>
                          <i className="fa fa-plus-square" />
                          Add to detail
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          }))
}
export default ProductCart