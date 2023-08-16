import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth/Auth.Layout";
import RegisterComponent from "../components/register/Register.Component";
import LoginComponent from "../components/login/Login.Component";
import NotFoundPage from "../pages/notFound/NotFound.Page";
import HomeComponent from "../components/home/Home.Component";
import ProductListComponent from "../components/productList/productList.Component";
import MainLayout from "../layouts/main/main.Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterComponent />} />
      </Route>

      <Route path="/" element={<MainLayout/>}>
        <Route element={<HomeComponent/>} index/>
        <Route path="product" element={<ProductListComponent/>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
