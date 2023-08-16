import { Card, Row, Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/httpsAxios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";
import ASelect from "../ASelect";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  province: {
    _id: "",
    name: "",
  },
  regency: {
    _id: "",
    name: "",
  },
  district: {
    _id: "",
    name: "",
  },
  village: {
    _id: "",
    name: "",
  },
  passcode: "",
  address: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Field must not empty")
    .min(5, "Minimum 5 characters")
    .matches(/^[a-zA-Z ]*$/, "Only alphabet is allowed"),
  province: Yup.object().shape({
    _id: Yup.string().required("Field is required"),
  }),
  regency: Yup.object().shape({
    _id: Yup.string().required("Field is required"),
  }),
  district: Yup.object().shape({
    _id: Yup.string().required("Field is required"),
  }),
  village: Yup.object().shape({
    _id: Yup.string().required("Field is required"),
  }),
  passcode: Yup.string()
    .required("Field is required")
    .matches(/^[0-9]*$/, "Please input number only"),
  address: Yup.string().required("Field is required"),
});

export default function FormAddress({ detail, isEdit = false }) {
  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  const dispatch = useDispatch();
  // PROPS isEdit
  useEffect(() => {
    if (isEdit && JSON.stringify(detail) !== "{}") {
      formik.setFieldValue("name", detail.name);
      formik.setFieldValue("passcode", detail.passcode);
      formik.setFieldValue("address", detail.address);

      setIsLoadProvince(true);
      getOptionsDistrict(detail.regency._id);
      getOptionsVillage(detail.district._id);

      handleChangeProvince(
        { target: { name: "province._id", value: detail.province._id } },
        "province.name"
      );
      handleChangeRegency(
        { target: { name: "regency._id", value: detail.regency._id } },
        "regency.name"
      );

      handleChangeDistrict(
        { target: { name: "district._id", value: detail.district._id } },
        "district.name"
      );
      handleChangeVillage(
        { target: { name: "village._id", value: detail.village._id } },
        "village.name"
      );
    }
  }, [isEdit, detail]);

  const [isLoadProvince, setIsLoadProvince] = useState(true);
  const [dataProvince, setDataProvince] = useState([]);

  useEffect(() => {
    if (isLoadProvince) {
      dispatch({ type: "SET_LOADING", value: true });

      axios
        .get(`/api-region/provinces.json`)
        .then((response) => {
          setDataProvince(response.data);
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
          setIsLoadProvince(false);
        });
    }
  }, [dispatch, isLoadProvince]);

  function handleisError(key, sub_key) {
    if (sub_key)
      return (
        formik.touched[key] &&
        formik.errors[key] &&
        formik.touched[key][sub_key] &&
        formik.errors[key][sub_key]
      );

    return formik.errors[key] && formik.touched[key] && formik.errors[key];
  }

  function handleChangeProvince(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findById = dataProvince.find(
      (province) => province.id === event.target.value
    );
    formik.setFieldValue(key, findById ? findById.name : "");

    if (findById) getOptionsRegency(findById.id);

    formik.setFieldValue("regency._id", "");
    formik.setFieldValue("district._id", "");
    formik.setFieldValue("village._id", "");
  }

  // GET REGENCY
  const [dataRegency, setDataRegency] = useState([]);
  function getOptionsRegency(id) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get(`/api-region/regencies/${id}.json`)
      .then((response) => {
        setDataRegency(response.data);
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

  function handleChangeRegency(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findById = dataRegency.find(
      (regency) => regency.id === event.target.value
    );
    formik.setFieldValue(key, findById ? findById.name : "");

    if (findById) getOptionsDistrict(findById.id);
    formik.setFieldValue("district._id", "");
    formik.setFieldValue("village._id", "");
  }

  // GET DISTRICT

  const [dataDistrict, setDataDistrict] = useState([]);
  function getOptionsDistrict(id) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get(`/api-region/districts/${id}.json`)
      .then((response) => {
        setDataDistrict(response.data);
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

  function handleChangeDistrict(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findById = dataDistrict.find(
      (district) => district.id === event.target.value
    );
    formik.setFieldValue(key, findById ? findById.name : "");

    if (findById) getOptionsVillage(findById.id);
    formik.setFieldValue("village._id", "");
  }

  // GET VILLAGE
  const [dataVillage, setDataVillage] = useState([]);
  function getOptionsVillage(id) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get(`/api-region/villages/${id}.json`)
      .then((response) => {
        setDataVillage(response.data);
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

  function handleChangeVillage(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findById = dataVillage.find(
      (village) => village.id === event.target.value
    );
    formik.setFieldValue(key, findById ? findById.name : "");
  }

  const navigate = useNavigate();
  function handleOnSubmit(form) {
    if (!isEdit) createAddress(form);
    else {
      editAddress(form);
    }
  }

  function createAddress(payload) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .post("/api/address/create", payload)
      .then((response) => {
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        navigate("/marketid/address");
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

  function editAddress(payload) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .put(`/api/address/update/${detail._id}`, payload)
      .then((response) => {
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        navigate("/marketid/address");
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

  function handleCancel() {
    formik.resetForm(navigate("/marketid/address"));
  }

  return (
    <Card
      className="p-4"
      style={{
        boxShadow: "0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            {/* INPUT NAME */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="name" className="mb-2">
                  Name
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Address name"
                  maxLength={32}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.name && formik.touched.name
                      ? "border-danger"
                      : "border_color"
                  }
                />
                {handleisError("name") && (
                  <small className="text-danger paragraph__3">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* INPUT PROVINCE */}
            <Col md="6">
              <ASelect
                id="province"
                label="province"
                name="province._id"
                value={formik.values.province._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeProvince(event, keyChange)
                }
                keyChange="province.name"
                isError={handleisError("province", "_id")}
                msgError={formik.errors.province && formik.errors.province._id}
                selector={dataProvince}
              />
            </Col>

            {/* REGION/CITY INPUT */}
            <Col md="6">
              <ASelect
                id="regency"
                label="Region/City"
                name="regency._id"
                value={formik.values.regency._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeRegency(event, keyChange)
                }
                keyChange="regency.name"
                isError={handleisError("regency", "_id")}
                msgError={formik.errors.regency && formik.errors.regency._id}
                selector={dataRegency}
              />
            </Col>

            {/* DISTRICT INPUT */}
            <Col md="6">
              <ASelect
                id="district"
                label="District"
                name="district._id"
                value={formik.values.district._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeDistrict(event, keyChange)
                }
                keyChange="district.name"
                isError={handleisError("district", "_id")}
                msgError={formik.errors.district && formik.errors.district._id}
                selector={dataDistrict}
              />
            </Col>

            {/* VILLAGE INPUT */}
            <Col md="6">
              <ASelect
                id="village"
                label="Village"
                name="village._id"
                value={formik.values.village._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeVillage(event, keyChange)
                }
                keyChange="village.name"
                isError={handleisError("village", "_id")}
                msgError={formik.errors.village && formik.errors.village._id}
                selector={dataVillage}
              />
            </Col>

            {/* PASSCODE INPUT */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="passcode" className="mb-2">
                  Passcode
                </Form.Label>
                <Form.Control
                  id="passcode"
                  name="passcode"
                  type="text"
                  placeholder="Input Passcode"
                  maxLength={5}
                  value={formik.values.passcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.passcode && formik.touched.passcode
                      ? "border-danger"
                      : "border_color"
                  }
                />
                {handleisError("passcode") && (
                  <small className="text-danger paragraph__3">
                    {formik.errors.passcode}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* ADDRESS INPUT */}
            <Col md="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="address" className="mb-2">
                  Address
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Input your detail address"
                  maxLength={100}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.address && formik.touched.address
                      ? "border-danger"
                      : "border_color"
                  }
                />
                {handleisError("address") && (
                  <small className="text-danger paragraph__3">
                    {formik.errors.address}
                  </small>
                )}
              </Form.Group>
            </Col>

            <Col
              xs="12"
              className="d-flex justify-content-end align-items-center mt-3"
            >
              {isEdit && (
                <Button
                  type="button"
                  variant="secondary"
                  className="me-2"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="success">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
