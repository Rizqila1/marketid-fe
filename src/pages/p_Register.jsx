import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { axiosInstance as axios } from "../config/httpsAxios";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

const initialValues = {
  full_name: "",
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
  password: Yup.string().required("Password is required").min(8).max(14),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const form = values;
      axios
        .post("/users/register", form)
        .then((response) => {
          const message = response.data.message;

          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.SUCCESS,
          });

          navigate("marketid/home");
        })
        .catch((error) => {
          const message = error.response.data.message;

          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
          console.log(error.response.data);
        });
    },
  });

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Register</h4>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="full_name" className="mb-2">
                Full Name
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #ACB5BD" }}
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Your Name"
                maxLength={32}
                value={formik.values.full_name}
                onChange={formik.handleChange}
                className={formik.errors.full_name && "border-danger"}
              />
              {formik.errors.full_name && (
                <small className="text-danger paragraph__5">
                  {formik.errors.full_name}
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="email" className="mb-2">
                Email address
              </Form.Label>
              <Form.Control
                style={{ border: "1px solid #ACB5BD" }}
                id="email"
                name="email"
                type="email"
                placeholder="example@market.id"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={formik.errors.email && "border-danger"}
              />
              {formik.errors.email && (
                <small className="text-danger paragraph__5">
                  {formik.errors.email}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" className="mb-2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  style={{ border: "1px solid #ACB5BD" }}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={formik.errors.password && "border-danger"}
                />
                <Button
                  style={{
                    outline: "none",
                    borderTop: "1px solid #ACB5BD",
                    borderRight: "1px solid #ACB5BD",
                    borderBottom: "1px solid #ACB5BD",
                    borderLeft: "none",
                  }}
                  className="bg-white"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-fill text-dark"></i>
                  ) : (
                    <i className="bi bi-eye-slash-fill text-dark"></i>
                  )}
                </Button>
              </InputGroup>
              {formik.errors.password && (
                <small className="text-danger paragraph__5">
                  {formik.errors.password}
                </small>
              )}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 my-4">
              Register
            </Button>
          </Form>
          <p className="paragraph__5 text-center mb-0">
            Already have an account? please{" "}
            <Link to="/marketid/login">Login</Link>.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
}
