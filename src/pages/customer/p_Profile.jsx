import { Row, Col } from "react-bootstrap";
import ABreadcrumb from "../../components/ABreadCrumb";
import AListGroup from "../../components/AListGroup";
import CardProfile from "../../components/Profile/Prof_CardProfile";

export default function ProfilePage() {
  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/profile",
      name: "Profile",
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
        <Col xs={3}>
          <AListGroup menus={menus} />
        </Col>
        <Col xs={9}>
          <CardProfile />
        </Col>
      </Row>
    </>
  );
}
