import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProductNavbar from "../components/Products/Pro_Navbar";
import "../assets/css/product-page.css";

export default function LayoutProduct() {
  return (
    <>
      <ProductNavbar />

      <Container className="pt-5">
        <Outlet />
      </Container>
    </>
  );
}
