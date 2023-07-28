import {
  Breadcrumb,
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import handleErrorMessage from "../../utils/handleErrorMessage";
import DefaultImage from "../../assets/images/default-picture-profile.png";

const initialValues = {
  full_name: "",
  image: null,
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("Full name must not empty")
    .matches(/^[a-zA-Z ]*$/, "Special characters or number are not allowed")
    .min(3, "Full name must be at least 3 characters")
    .max(15, "Full name field only up to 15 maximum characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters")
    .max(14, "Password must be at most 14 characters"),
});

export default function ProfilePage() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  // Get User Data from localStorage
  const getUser = localStorage.getItem("user");
  const parsingUser = JSON.parse(getUser);
  let id = getUser ? parsingUser._id : "";

  useEffect(() => {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get(`/users/details/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => dispatch({ type: "SET_LOADING", value: false }));
  }, [id, dispatch]);

  function handleUpdate(form) {
    // LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .put(`/users/update/${id}`, form)
      .then((response) => {
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => dispatch({ type: "SET_LOADING", value: false }));
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdate,
  });

  return (
    <>
      <Breadcrumb className="mt-5">
        <Breadcrumb.Item href="/marketid/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-4">
        <Col xs={3}>
          <ListGroup>
            <ListGroup.Item active>Profile</ListGroup.Item>
            <ListGroup.Item action href="/marketid/address">
              Address
            </ListGroup.Item>
            <ListGroup.Item action href="/marketid/history">
              History
            </ListGroup.Item>
            <ListGroup.Item>Logout</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={9}>
          <section className="border_color w-100 h-100 bg-white p-5">
            <div className="d-flex w-100 h-100">
              <div>
                <Image
                  src={data?.image?.url || DefaultImage}
                  alt="profile"
                  width={160}
                  height={154}
                />
              </div>
              <section className="">
                <div className="d-flex">
                  <Form
                    className="mx-4"
                    style={{ width: "18rem" }}
                    onSubmit={formik.handleSubmit}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="full_name">Full Name</Form.Label>
                      <Form.Control
                        id="full_name"
                        name="full_name"
                        maxLength={32}
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border_color text-capitalize"
                        type="text"
                        placeholder={data.full_name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        className="border_color"
                        type="email"
                        placeholder="name@example.com"
                        value={data.email}
                      />
                    </Form.Group>
                  </Form>

                  <Form style={{ width: "18rem" }}>
                    <Form.Label>Picture</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        className="border_color"
                        placeholder="Insert Image"
                      />
                      <Button
                        className="border_color"
                        variant="outline-secondary"
                        id="button-addon2"
                      >
                        <i className="bi bi-card-image"></i>
                      </Button>
                    </InputGroup>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        className="border_color"
                        type="password"
                        placeholder="Insert password"
                        value={data.password}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="mt-4 d-flex justify-content-end">
                  <Button
                    style={{ width: "10.563rem" }}
                    variant="secondary"
                    className="mx-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ width: "10.563rem" }}
                    variant="success"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </section>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
}
