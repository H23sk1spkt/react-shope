import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SingleLayout from "./layouts/SingleLayout";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/BlogDetails";
import Register from "./user/Register";
import Login from "./user/Login";
function App() {
  return (
    <>
      <Routes>
        {/* MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Route>
        {/* SingleLayout */}
        <Route element={<SingleLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
