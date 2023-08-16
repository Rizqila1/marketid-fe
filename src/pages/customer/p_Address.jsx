import { Row, Col } from "react-bootstrap";
import AListGroup from "../../components/AListGroup";
import ABreadcrumb from "../../components/ABreadCrumb";
import CardAddressSection from "../../components/Address/CardAddressSection";

export default function AddressPage() {
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

  return (
    <>
      <ABreadcrumb options={options} />

      <Row className="mt-4">
        <Col lg={3} xs={12} className="mb-lg-0 mb-4">
          <AListGroup menus={menus} />
        </Col>
        <Col lg={9} xs={12}>
          <CardAddressSection />
        </Col>
      </Row>
    </>
  );
}
