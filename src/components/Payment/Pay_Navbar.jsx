import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PaymentNavbarComponent() {
  return (
    <>
      <Navbar
        variant="dark"
        bg="primary"
        expand="md"
        className="position-fixed w-100 z-3"
      >
        <Container>
          <Navbar.Brand className="heading__4" href="/marketid">
            Market.ID
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="w-100 d-flex justify-content-end align-items-center">
              <Link
                to="/marketid/profile"
                className="me-md-3 my-md-0 my-3 me-0 btn btn-light text-primary"
              >
                Profile
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
