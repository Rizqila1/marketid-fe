import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE & AUTH
import App from "../App";

// LAYOUT PRODUCT
import LayoutProduct from "../layouts/L_products";

// CUSTOMER PAGES
import Products from "../pages/p_Products";
import About from "../pages/About";
import LoginPage from "../pages/p_Login";
import RegisterPage from "../pages/p_Register";

// NEGATIVE PAGE
import NotFound from "../pages/NotFound";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="*" element={<NotFound />} />

      <Route element={<LayoutProduct />}>
        <Route path="/" element={<Products />} />
      </Route>

      <Route path="/marketid/about" element={<About />} />
      <Route path="/marketid/login" element={<LoginPage />} />
      <Route path="/marketid/register" element={<RegisterPage />} />
    </Route>
  )
);
