import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { axiosInstance as axios } from "../../config/httpsAxios";
import { useDispatch } from "react-redux";
import AListGroup from "../../components/AListGroup";
import ABreadcrumb from "../../components/ABreadCrumb";

export default function AddressPage() {
  const [data, setData] = useState([]);

  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/address",
      name: "Address",
      active: true,
    },
  ];

  // Selector ListGroup Component
  const menus = [
    {
      title: "Profile",
      link: "/marketid/profile",
    },
    {
      title: "Address",
      link: "/marketid/address",
    },
    {
      title: "History",
      link: "/marketid/history",
    },
  ];

  const dispatch = useDispatch();
  let number = 1;

  useEffect(() => {
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get("/address/list")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }, [dispatch]);

  return (
    <>
      <ABreadcrumb options={options} />

      <Row className="mt-4">
        <Col xs={3}>
          <AListGroup menus={menus} />
        </Col>
        <Col xs={9}>
          <section className="border_color_brighter bg-white p-4">
            <div className="d-flex justify-content-end mb-4">
              <Button
                href="/marketid/address/create"
                style={{ width: "10.188rem" }}
                variant="success"
              >
                Create <i className="bi bi-pencil-fill mx-1"></i>
              </Button>
            </div>

            <Row className="border_color_brighter d-flex justify-content-between p-2">
              <Col lg={2} className="d-flex justify-content-between">
                <h5 className="subheading__2 mx-3 m-0">ID</h5>
              </Col>
              <Col lg={6} className="d-flex justify-content-between">
                <h5 className="subheading__2 m-0">Name</h5>
              </Col>
              <Col
                lg={4}
                className="d-flex justify-content-end align-items-center"
              >
                <h5 className="subheading__2 mx-3 m-0">Actions</h5>
              </Col>
            </Row>

            {data.map((element, i) => (
              <Row key={`${i}-address`} className="border_color_brighter p-2">
                <Col lg={2} className="d-flex justify-content-between">
                  <h5 className="subheading__2 mt-1 mx-3 m-0">{number++}</h5>
                </Col>
                <Col lg={6}>
                  <h5 className="subheading__2 mt-1 m-0 text-capitalize">
                    {element.name}
                  </h5>
                </Col>
                <Col
                  lg={4}
                  className="d-flex justify-content-end align-items-center"
                >
                  <Button
                    className="mx-2"
                    variant="primary"
                    href="/marketid/address/edit"
                    style={{ width: "6.25rem" }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" style={{ width: "6.25rem" }}>
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </section>
        </Col>
      </Row>
    </>
  );
}
