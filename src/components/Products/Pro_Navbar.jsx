import {
  Button,
  Container,
  Navbar,
  Form,
  InputGroup,
  Nav,
} from "react-bootstrap";

import "../../assets/css/custom-product-navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance as axios } from "../../config/httpsAxios";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

export default function ProductNavbar() {
  // STORE
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const id = user._id;
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`/users/logout/${id}`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // return to login page
        window.location.href = "/marketid/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }
  return (
    <>
      <Navbar variant="dark" bg="primary" expand="md">
        <Container>
          <Navbar.Brand className="heading__4" href="/marketid">
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
              {token ? (
                <>
                  <Link
                    to="/marketid/cart"
                    className="btn btn-outline-light me-md-3 my-md-0 my-3 me-0 d-flex justify-content-center align-items-center"
                  >
                    <i className="bi bi-cart-fill"></i>
                    <span className="subheading__5 ms-2">0</span>
                  </Link>
                  <Button variant="light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/marketid/login"
                    className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light"
                  >
                    Login
                  </Link>
                  <Link
                    to="/marketid/register"
                    className="text-primary btn btn-light"
                  >
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
