import { useEffect } from "react";
import { Breadcrumb, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { axiosInstance as axios } from "../../config/httpsAxios";

export default function CreateAddressPage() {
  // const [location, setLocation] = useState([]);

  useEffect(() => {
    axios
      .get("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => {
        console.log(response.json());
      })
      .then((provinces) => {
        console.log(provinces);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <Breadcrumb className="mt-5">
        <Breadcrumb.Item href="/marketid/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/marketid/address">Address</Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
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
            <Row>
              <Col lg="6">
                <Form className="mx-4">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Name</Form.Label>
                    <Form.Control
                      id=""
                      name=""
                      maxLength={32}
                      className="border_color"
                      type="text"
                      placeholder="Input your address name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Province</Form.Label>
                    <Form.Select className="border_color">
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Region/City</Form.Label>
                    <Form.Select className="border_color">
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Address</Form.Label>
                    <Form.Control
                      id=""
                      name=""
                      maxLength={100}
                      className="border_color"
                      type="text"
                      placeholder="Input your detail address"
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col lg="6">
                <Form className="mx-4">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="">District</Form.Label>
                    <Form.Select className="border_color">
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Village</Form.Label>
                    <Form.Select className="border_color">
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Passcode</Form.Label>
                    <Form.Control
                      id=""
                      name=""
                      maxLength={6}
                      className="border_color"
                      type="text"
                      placeholder="Input passcode"
                    />
                  </Form.Group>
                </Form>
              </Col>
              <div className="d-flex justify-content-end pb-4 pe-4">
                <Button variant="success" style={{ width: "10.188rem" }}>
                  Create
                </Button>
              </div>
            </Row>
          </section>
        </Col>
      </Row>
    </>
  );
}
