import { Breadcrumb, Row, Col, ListGroup, Button } from "react-bootstrap";

export default function AddressPage() {
  return (
    <>
      <Breadcrumb className="mt-5">
        <Breadcrumb.Item href="/marketid/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Address</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-4">
        <Col xs={3}>
          <ListGroup>
            <ListGroup.Item action href="/marketid/profile">
              Profile
            </ListGroup.Item>
            <ListGroup.Item active>Address</ListGroup.Item>
            <ListGroup.Item action href="/marketid/history">
              History
            </ListGroup.Item>
            <ListGroup.Item>Logout</ListGroup.Item>
          </ListGroup>
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
              <Col xs={4} className="d-flex justify-content-between">
                <h5 className="subheading__2 mx-3 m-0">ID</h5>
                <h5 className="subheading__2 mx-2 m-0">Name</h5>
              </Col>
              <Col
                xs={6}
                className="d-flex justify-content-end align-items-center"
              >
                <h5 className="subheading__2 mx-3 m-0">Actions</h5>
              </Col>
            </Row>

            <Row className="border_color_brighter p-2">
              <Col xs={4} className="d-flex justify-content-between">
                <h5 className="subheading__2 mt-1 mx-3 m-0">1</h5>
                <h5 className="subheading__2 mt-1 m-0">Current</h5>
              </Col>
              <Col
                xs={8}
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
          </section>
        </Col>
      </Row>
    </>
  );
}
