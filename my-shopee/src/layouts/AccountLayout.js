import Header from "../components/common/Header";
import Slider_Account from "../components/common/Slider_Acount";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
function AccountLayout() {
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <Slider_Account />
            <Outlet/>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default AccountLayout;
