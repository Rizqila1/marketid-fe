import {
  Button,
  Container,
  Navbar,
  Form,
  InputGroup,
  Nav,
} from "react-bootstrap";

import "../../assets/css/custom-product-navbar.css";

export default function ProductNavbar() {
  return (
    <>
      <Navbar variant="dark" bg="primary" expand="md">
        <Container>
          <Navbar.Brand className="heading__4" href="/">
            Market.ID
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="w-100 d-flex justify-content-center align-items-center">
              <Form className="w_container_search my-md-0 mt-3">
                <InputGroup>
                  <Form.Select className="w_select_search">
                    <option>Sort By</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Find your favorite stuff..."
                    className="w_input_search"
                  />
                  <Button variant="light" className="d-flex align-items-center">
                    <i className="bi- bi-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Nav>

            <Nav>
              <Button
                variant="outline-light"
                className="me-md-3 my-md-0 my-3 me-0"
              >
                Login
              </Button>
              <Button variant="light" className="text-primary">
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
