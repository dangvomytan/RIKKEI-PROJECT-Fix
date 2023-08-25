import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.Layout";
import RegisterComponent from "../components/register/Register.Component";
import LoginComponent from "../components/login/Login.Component";
import NotFoundPage from "../pages/notFound/NotFound.Page";
import HomeComponent from "../components/home/Home.Component";
import ProductListComponent from "../components/Products/productList/productList.Component";
import MainLayout from "../layouts/main/main.Layout";
import RequireLogin from "../middleware/RequireLogin/RequireLogin";
import DetailComponent from "../components/detail/Detail.Component";
import CheckoutComponent from "../components/checkout/Checkout.Component";
import CartComponent from "../components/cart/Cart.Component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterComponent />} />
      </Route>
      {/* <Route element={<RequireLogin/>}> */}
      <Route path="/" element={<MainLayout/>}>
        <Route element={<HomeComponent/>} index/>
        <Route path="product" element={<ProductListComponent/>} />
        <Route path="product/detail" element={<DetailComponent/>} />
        <Route path="cart" element={<CartComponent/>} />
        <Route path="checkout" element={<CheckoutComponent/>} />
      </Route>
      {/* </Route> */}
     

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
