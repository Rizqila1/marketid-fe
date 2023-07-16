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

import LayoutAuthorization from "../layouts/Authorization";
import store from "../stores";
const { auth } = store.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="*" element={<NotFound />} />

      <Route
        element={
          <LayoutAuthorization auth={auth}>
            <LayoutProduct />
          </LayoutAuthorization>
        }
      >
        <Route path="/marketid/home" element={<Products />} />
      </Route>

      <Route element={<LayoutProduct />}>
        <Route path="/marketid" element={<Products />} />
      </Route>

      <Route path="/marketid/about" element={<About />} />
      <Route path="/marketid/login" element={<LoginPage />} />
      <Route path="/marketid/register" element={<RegisterPage />} />
    </Route>
  )
);
