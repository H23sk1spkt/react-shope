import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
function SingleLayout() {
  return (
    <>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            <Outlet/>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default SingleLayout;
