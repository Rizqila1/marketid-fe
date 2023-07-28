import {
  Breadcrumb,
  Col,
  Image,
  Row,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import defaultImage from "../../assets/images/default-image.png";
import { useDispatch, useSelector } from "react-redux";
import convertFormatCurrency from "../../utils/convertFormatCurrency";

export default function CartPage() {
  // Store
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  // Product Price Calculation
  const priceProduct = storeCarts.carts.map((item) => item.totalPrice);
  const subTotal = priceProduct.reduce((a, b) => a + b, 0);
  const PPN = (subTotal * 10) / 100;
  const totalPrice = subTotal + PPN;

  function handleClickMinus(data) {
    storeCarts.carts.forEach((item) => {
      if (item._id === data._id) {
        item.count -= 1;
        item.totalPrice = item.count * item.price;
      }
      dispatch({ type: "SET_CARTS", value: storeCarts.carts });
    });
  }

  function handleClickPlus(data) {
    storeCarts.carts.forEach((item) => {
      if (item._id === data._id) {
        item.count += 1;
        item.totalPrice = item.count * item.price;
      }

      dispatch({ type: "SET_CARTS", value: storeCarts.carts });
    });
  }

  function handleDelete(index) {
    storeCarts.carts.splice(index, 1);
    dispatch({ type: "SET_CARTS", value: storeCarts.carts });
  }

  return (
    <>
      <Breadcrumb className="mt-5">
        <Breadcrumb.Item href="/marketid/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col lg="8" className="px-3">
          {storeCarts.carts.map((data, index) => (
            <Row
              key={`products-${index}`}
              className="d-flex align-items-center border_color_brighter bg-white p-3 mt-3"
            >
              <Col key={`product-image-${index}`} lg="2" md="2" sm="2" xs="2">
                <Image
                  src={data.image?.url || defaultImage}
                  alt="product-picture"
                  width={100}
                  height={90}
                  className="display_image_history"
                />
              </Col>

              <Col key={`name-${index}`} lg="4" md="4" sm="3" xs="3">
                <h5 className="display_invoice subheading__2 m-0">
                  {data.name || "Product Name"}
                </h5>
              </Col>

              <Col key={`price-${index}`} lg="4" md="4" sm="5" xs="5">
                <h5 className="display_price subheading__2 m-0">
                  {"Rp. " +
                    convertFormatCurrency(
                      data.totalPrice === 0 ? data.price : data.totalPrice
                    )}
                </h5>
              </Col>

              <Col
                key={`edit-${index}`}
                className="d-flex justify-content-end align-items-center"
                lg="2"
                md="2"
                sm="2"
                xs="2"
              >
                <Button
                  disabled={data.count < 2}
                  className="mx-2"
                  variant="primary"
                  onClick={() => handleClickMinus(data)}
                >
                  -
                </Button>
                <span>{data.count}</span>
                <Button
                  className="mx-2"
                  variant="primary"
                  onClick={() => handleClickPlus(data)}
                >
                  +
                </Button>
                <Button
                  disabled={storeCarts.carts.length < 2}
                  className="mx-2"
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
                  <i className="bi bi-trash-fill text-white"></i>
                </Button>
              </Col>
            </Row>
          ))}
        </Col>

        <Col lg="4">
          <section className="border_color_brighter bg-white mt-3">
            <Container>
              <Form className="py-2">
                <Form.Group className="mb-3">
                  <Form.Label className="subheading__4" htmlFor="">
                    Address
                  </Form.Label>
                  <Form.Select className="border_color">
                    <option>Select Your Address</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Form>

              <h5 className="subheading__4">-</h5>
              <Row>
                <Col lg="6" md="6" sm="6" xs="6">
                  <h5 className="subheading__4">Sub Total</h5>
                  <h5 className="subheading__4">{"PPN (10%)"}</h5>
                  <h5 className="subheading__4">Total</h5>
                </Col>

                <Col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                  className="d-flex flex-column align-items-end"
                >
                  <h5 className="subheading__4">
                    {"Rp. " + convertFormatCurrency(subTotal)}
                  </h5>
                  <h5 className="subheading__4">
                    {"Rp. " + convertFormatCurrency(PPN)}
                  </h5>
                  <h5 className="subheading__4">
                    {"Rp. " + convertFormatCurrency(totalPrice)}
                  </h5>
                </Col>
              </Row>
              <Button
                className="w-100 d-flex justify-content-center mt-2 mb-3"
                variant="secondary"
                disabled
              >
                Checkout
              </Button>
            </Container>
          </section>
        </Col>
      </Row>
    </>
  );
}
