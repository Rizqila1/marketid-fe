import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ABreadCrumb from "../../components/ABreadCrumb";
import CartProduct from "../../components/Cart/Cart_Product";
import ProductNotFound from "../../components/Products/Pro_NotFound";
import CartCheckout from "../../components/Cart/Cart_Checkout";

export default function CartPage() {
  // STORES
  const storeCarts = useSelector((state) => state.carts);
  const dataProduct = storeCarts.carts;

  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/cart",
      name: "Cart",
      active: true,
    },
  ];

  return (
    <>
      <ABreadCrumb options={options} />

      <Row>
        <Col lg="8" className="px-3">
          <div style={{ height: "28.5rem", overflowY: "auto" }}>
            {dataProduct.length ? (
              dataProduct.map((data, index) => (
                <CartProduct
                  data={data}
                  key={`item-cart${data._id}`}
                  index={index}
                  isAction={true}
                />
              ))
            ) : (
              <ProductNotFound message={"Your Cart Is Empty"} />
            )}
          </div>
        </Col>

        <Col lg="4">
          <CartCheckout />
        </Col>
      </Row>
    </>
  );
}
