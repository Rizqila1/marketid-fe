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

import {
  LayoutAuthorization,
  LayoutAuthVisitor,
} from "../layouts/Authorization";
import store from "../stores";
import LayoutLogin from "../layouts/L_Login";
const { auth } = store.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* NEGATIVE PAGE / 404 */}
      <Route path="*" element={<NotFound />} />

      {/* LANDING PAGE FOR VISITOR */}
      <Route
        element={
          <LayoutAuthVisitor auth={auth}>
            <LayoutProduct />
          </LayoutAuthVisitor>
        }
      >
        <Route path="/marketid" element={<Products />} />
      </Route>

      {/* LANDING PAGE FOR USER */}
      <Route
        element={
          <LayoutAuthorization auth={auth}>
            <LayoutProduct />
          </LayoutAuthorization>
        }
      >
        <Route path="/marketid/home" element={<Products />} />
      </Route>

      {/* PAGE LOGIN & REGISTER */}
      <Route
        element={
          <LayoutAuthorization auth={auth}>
            <LayoutLogin>
              <App />
            </LayoutLogin>
          </LayoutAuthorization>
        }
      >
        <Route path="/marketid/login" element={<LoginPage />} />
        <Route path="/marketid/register" element={<RegisterPage />} />
      </Route>

      <Route path="/marketid/about" element={<About />} />
    </Route>
  )
);
