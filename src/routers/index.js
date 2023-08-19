import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// IMPORT COMPONENT, LAYOUT, PAGE & AUTH
import App from "../App";

// LAYOUTS
import LayoutProduct from "../layouts/L_Product";
import LayoutLogin from "../layouts/L_Login";
import LayoutProfile from "../layouts/L_Profile";
import LayoutPayment from "../layouts/L_Payment";

// CUSTOMER PAGES
import Products from "../pages/p_Products";
import About from "../pages/p_About";
import LoginPage from "../pages/p_Login";
import RegisterPage from "../pages/p_Register";
import ProfilePage from "../pages/customer/p_Profile";
import AddressPage from "../pages/customer/p_Address";
import HistoryPage from "../pages/customer/p_History";
import CreateAddressPage from "../pages/customer/p_CreateAddress";
import EditAddressPage from "../pages/customer/p_EditAddress";
import CartPage from "../pages/customer/p_Cart";
import PaymentPage from "../pages/customer/p_Payment";

// NEGATIVE PAGE
import NotFound from "../pages/p_NotFound";

import {
  LayoutAuthorization,
  LayoutAuthVisitor,
} from "../layouts/Authorization";
import store from "../stores";
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
        <Route path="/marketid/about" element={<About />} />
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

      {/* PAGE PROFILE, ADDRESS, HISTORY, LOGOUT*/}
      <Route
        element={
          <LayoutAuthorization auth={auth}>
            <LayoutProfile />
          </LayoutAuthorization>
        }
      >
        <Route path="/marketid/profile" element={<ProfilePage />} />
        <Route path="/marketid/address" element={<AddressPage />} />
        <Route
          path="/marketid/address/create"
          element={<CreateAddressPage />}
        />
        <Route
          path="/marketid/address/edit/:id"
          element={<EditAddressPage />}
        />
        <Route path="/marketid/history" element={<HistoryPage />} />
      </Route>

      {/* CART & INVOICE */}
      <Route
        element={
          <LayoutAuthorization auth={auth}>
            <LayoutPayment />
          </LayoutAuthorization>
        }
      >
        <Route path="/marketid/cart" element={<CartPage />} />
        <Route path="/marketid/payment/:invoice" element={<PaymentPage />} />
      </Route>
    </Route>
  )
);
