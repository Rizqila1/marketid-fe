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
import { useState } from "react";

export default function ProductNavbar() {
  // STORE
  const { token, user } = useSelector((state) => state.auth);
  const { q, sort_by } = useSelector((state) => state.params);
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const count = storeCarts.carts.map((item) => item.qty);
  const sumCount = count.reduce((a, b) => a + b, 0);

  // STATE
  const [params, setParams] = useState({
    q,
    sort_by,
  });

  function handleOnChange(event) {
    setParams({ ...params, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // SET VALUE PARAMS Q & SORT_BY TO STORE PRODUCT
    dispatch({ type: "ACTION_SEARCH", value: params.q });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
    // SET DEFAULT PAGE SO THAT WHEN DOING FILTER ITS AUTOMATICALLY BACK/SET TO PAGE 1
    dispatch({ type: "ACTION_PAGE", value: 1 });
  }

  function handleLogout() {
    const id = user._id;
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/logout/${id}`)
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
            <Nav className="w-100 d-flex justify-content-center align-items-center">
              <Form
                className="w_container_search my-md-0 mt-3"
                onSubmit={handleSubmit}
              >
                <InputGroup>
                  <Form.Select
                    className="w_select_search"
                    name="sort_by"
                    value={params.sort_by}
                    onChange={handleOnChange}
                  >
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Find your favorite stuff..."
                    className="w_input_search"
                    name="q"
                    value={params.q}
                    onChange={handleOnChange}
                  />
                  <Button
                    type="submit"
                    variant="light"
                    className="d-flex align-items-center"
                  >
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
                    <span className="subheading__5 ms-2">{sumCount}</span>
                  </Link>
                  <Button
                    className="subheading__4 text-danger"
                    variant="light"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/marketid/login"
                    className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light subheading__4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/marketid/register"
                    className="text-primary btn btn-light subheading__4"
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
