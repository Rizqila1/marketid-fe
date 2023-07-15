import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProductNavbar from "../components/Products/Pro_Navbar";

export default function LayoutProduct() {
  return (
    <>
      <ProductNavbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
