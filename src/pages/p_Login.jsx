import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { axiosInstance as axios } from "../config/httpsAxios";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";
import { useDispatch } from "react-redux";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: Yup.string().required("Password is required").min(8).max(14),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // REDUX STORE
  const dispatch = useDispatch();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleLogin(form) {
    axios
      .post("/users/login", form)
      .then((response) => {
        const { _id, token, role } = response.data.data;

        // SET STORE
        dispatch({ type: "AUTH_TOKEN", value: token });
        dispatch({ type: "AUTH_USER", value: { _id, role } });

        // SET LOCAL STORAGE
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ _id, role }));

        // TOAST POPUP
        const message = response.data.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });

        // REDIRECT TO HOME PAGE
        navigate("/marketid/home");
      })
      .catch((error) => {
        const message = error.response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Login</h4>

          <Form onSubmit={formik.handleSubmit}>
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
                    backgroundColor: "white",
                    outline: "none",
                    borderTop: "1px solid #ACB5BD",
                    borderRight: "1px solid #ACB5BD",
                    borderBottom: "1px solid #ACB5BD",
                    borderLeft: "none",
                  }}
                  className={formik.errors.password && "bg-danger"}
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <i
                      className={
                        formik.errors.password
                          ? "bi bi-eye-slash-fill text-white"
                          : "bi bi-eye-slash-fill text-dark"
                      }
                    ></i>
                  ) : (
                    <i
                      className={
                        formik.errors.password
                          ? "bi bi-eye-fill text-white"
                          : "bi bi-eye-fill text-dark"
                      }
                    ></i>
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
              Login
            </Button>
          </Form>
          <p className="paragraph__5 text-center mb-0">
            Don't have an account? please{" "}
            <Link to="/marketid/register">Register</Link>.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
}
