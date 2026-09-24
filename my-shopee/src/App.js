import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SingleLayout from "./layouts/SingleLayout";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/BlogDetails";
import Register from "./user/Register";
import Login from "./user/Login";
import AccountLayout from "./layouts/AccountLayout";
import AccountUpdate from "./pages/account/AccountUpdate";
import MyProduct from "./pages/product/MyProduct";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import Index from "./index/Index";
import ProductDetail from "./pages/product/ProductDetail";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import SearchName from "./pages/search/SearchName";
import SearchAdvance from "./pages/search/SearchAdvance";
import SearchPrice from "./pages/search/SearchPrice";
import CheckEmail from "./pages/forget/CheckEmail";
import ChangePassword from "./pages/forget/ChangePassword";
function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          {/* MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/index" element={<Index />} />
            <Route path="/product/detail/:id" element={<ProductDetail />} />
            <Route path="/searchName/:keyword" element={<SearchName />} />
            <Route path="/searchAdvance" element={<SearchAdvance />} />
            <Route path="/searchPrice/:min/:max" element={<SearchPrice />} />
          </Route>
          {/* SingleLayout */}
          <Route element={<SingleLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkEmail" element={<CheckEmail />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Route>
          {/* AccountLayout */}
          <Route element={<AccountLayout />}>
            <Route path="/account" element={<AccountUpdate />} />
            <Route path="/my-product" element={<MyProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
