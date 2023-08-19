// import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ABreadcrumb from "../../components/ABreadCrumb";
import AListGroup from "../../components/AListGroup";
import FormAddress from "../../components/Address/FormAddress";
// import { axiosInstance as axios } from "../../config/httpsAxios";

export default function CreateAddressPage() {
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
      active: false,
    },
    {
      href: "/marketid/address/create",
      name: "Create",
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
      link: "/marketid/address/create",
    },
    {
      title: "History",
      link: "/marketid/history",
    },
  ];

  return (
    <Row className="mt-4">
      <ABreadcrumb options={options} />

      <Col lg={3} xs={12} className="mb-lg-0 mb-4">
        <AListGroup menus={menus} />
      </Col>
      <Col lg={9} xs={12}>
        <FormAddress />
      </Col>
    </Row>
  );
}
