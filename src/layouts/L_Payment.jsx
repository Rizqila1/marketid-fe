import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import PaymentNavbarComponent from "../components/Payment/Pay_Navbar";

export default function LayoutPayment() {
  return (
    <>
      <PaymentNavbarComponent />

      <Container className="pt-5 pb-2">
        <Outlet />
      </Container>
    </>
  );
}
