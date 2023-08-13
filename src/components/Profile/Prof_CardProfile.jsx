import { Card, Form, Image, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";
import defaultImg from "../../assets/images/default-picture-profile.png";

const initialValues = {
  full_name: "",
  email: "",
  file_name: "",
  status: false,
};

const validationSchema = Yup.object({
  full_name: Yup.string()
    .required("field must not empty")
    .matches(/^[a-zA-Z ]*$/, "only alphabet is allowed")
    .min(3, "must be at least 3 characters")
    .max(15, "15 maximum characters"),
  email: Yup.string().required("is required").email("must be a valid email"),
  file_name: Yup.string().required("is required"),
});

export default function CardProfile() {
  const [isLoad, setIsLoad] = useState(true);
  const [urlImage, setUrlImage] = useState(null);
  const [image, setImage] = useState(null);

  // STORES
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Get User Data from store
  const id = user._id;

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  useEffect(() => {
    if (isLoad) {
      dispatch({ type: "SET_LOADING", value: true });

      axios
        .get(`/users/details/${id}`)
        .then((response) => {
          const details = response.data.data;

          // set UrlImage
          setUrlImage(details.image.url);

          // SETTING FORMIK VALUES
          formik.setFieldValue("full_name", details.full_name);
          formik.setFieldValue("email", details.email);
          formik.setFieldValue("status", details.status);
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
          setIsLoad(false);
        });
    }
  }, [id, dispatch, isLoad, formik]);

  function handleUpdateProfile(form) {
    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("image", image);
    formData.append("status", form.status);

    // LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .put(`/users/update/${id}`, formData)
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
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        handleResetForm();
      });
  }

  function handleChangeImage(event) {
    const file = event.currentTarget.files[0];
    // set formik value
    formik.setFieldValue("file_name", event.currentTarget.value);
    // set input image
    setImage(file);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        // set url image
        setUrlImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  }

  const refImage = useRef();

  function handleResetForm() {
    // reset input image
    refImage.current.value = null;
    // reset formik
    formik.resetForm();
    setIsLoad(true);
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Card
        className="w-100 h-100 bg-white px-2 py-4"
        style={{
          boxShadow: "0rem 0.13rem 0.3rem 0rem #00000040",
        }}
      >
        <Card.Body>
          <Row>
            {/* IMAGE PROFILE */}
            <Col lg="3" xs="12" className="text-center">
              <Image
                src={urlImage || defaultImg}
                rounded
                className="mx-auto"
                style={{
                  width: "10rem",
                  height: "9.625rem",
                }}
              />
            </Col>

            {/* LEFT SIDE INPUT */}
            <Col lg="4" xs="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="full_name" className="mb-2">
                  Full Name{" "}
                  {formik.errors.full_name && formik.touched.full_name && (
                    <small className="text-danger paragraph__3">
                      {formik.errors.full_name}
                    </small>
                  )}
                </Form.Label>
                <Form.Control
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Insert your full name"
                  maxLength={32}
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.full_name && formik.touched.full_name
                      ? "border-danger"
                      : "text-capitalize border_color"
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="email" className="mb-2">
                  Email{" "}
                  {formik.errors.email && formik.touched.email && (
                    <small className="text-danger paragraph__3">
                      {formik.errors.email}
                    </small>
                  )}
                </Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.email &&
                    formik.touched.email &&
                    "border-danger"
                  }
                  disabled
                />
              </Form.Group>
            </Col>

            {/* RIGHT SIDE INPUT */}
            <Col lg="4" xs="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="file_name" className="mb-2">
                  Image{" "}
                  {formik.errors.file_name && formik.touched.file_name && (
                    <small className="text-danger paragraph__3">
                      {formik.errors.file_name}
                    </small>
                  )}
                </Form.Label>
                <Form.Control
                  ref={refImage}
                  id="file_name"
                  name="file_name"
                  type="file"
                  accept="image/*"
                  placeholder="Choose Image"
                  value={formik.values.file_name}
                  onChange={handleChangeImage}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.file_name && formik.touched.file_name
                      ? "border-danger"
                      : "border_color"
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label htmlFor="status" className="mb-2">
                  Status{" "}
                  {formik.errors.status && formik.touched.status && (
                    <small className="text-danger paragraph__3">
                      {formik.errors.status}
                    </small>
                  )}
                </Form.Label>
                <Form.Control
                  id="status"
                  name="status"
                  type="text"
                  placeholder="Status"
                  value={
                    formik.values.status === true ? "Active" : "Non Active"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.status &&
                    formik.touched.status &&
                    "border-danger"
                  }
                  disabled
                />
              </Form.Group>
            </Col>

            {/* BUTTONS */}
            <Col className="mt-3 d-flex justify-content-end">
              <Button
                variant="secondary"
                type="button"
                className="me-3"
                style={{ width: "10.563rem" }}
                onClick={() => handleResetForm()}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                style={{ width: "10.563rem" }}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
}
