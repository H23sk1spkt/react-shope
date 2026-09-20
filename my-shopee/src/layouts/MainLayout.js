import Header from "../components/common/Header";
import MenuLeft from "../components/common/MenuLeft";
import Footer from "../components/common/Footer";
import Slider from "../components/common/Slider";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <>
      <Header />
      <Slider/>
      <section>
        <div className="container">
          <div className="row">
            <MenuLeft />
            <Outlet/>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default MainLayout;
