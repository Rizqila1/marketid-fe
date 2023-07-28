import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance as axios } from "../config/httpsAxios";
import handleErrorMessage from "../utils/handleErrorMessage";
import defaultImage from "../assets/images/default-image.png";
import SkeletonCard from "../components/Products/Pro_Skeleton";
import convertFormatCurrency from "../utils/convertFormatCurrency";

import "../assets/css/product-page.css";
import "../assets/css/custom-product-navbar.css";

// Component
import ComponentPagination from "../components/Pagination";
import ProductCarousels from "../components/Products/Pro_Carousels";
import ProductAboutUs from "../components/Products/Pro_AboutUs";
import ProductProfile from "../components/Products/Pro_Profile";
import ProductWelcoming from "../components/Products/Pro_Welcoming";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  // STORE
  const { token, user } = useSelector((state) => state.auth);
  const storeParamsProduct = useSelector((state) => state.product);
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    setLoading(true);
    axios
      .get("/products", { params: { ...storeParamsProduct } })
      .then((response) => {
        setData(response.data.data);
        setPagination(response.data.pagination);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [storeParamsProduct]);

  function handleCart(product) {
    let data = storeCarts.carts;
    const findProductById = data.find((item) => item._id === product._id);

    if (!findProductById) {
      data.push({
        ...product,
        count: 1,
        totalPrice: 0,
      });

      data.forEach((item, i, items) => {
        if (item.count === 1) {
          items[i].totalPrice = item.price;
        }
      });
      dispatch({ type: "SET_CARTS", value: data });
    } else {
      data.forEach((item, i, items) => {
        if (item._id === product._id) {
          item.count += 1;
        }
        if (item.count > 1) {
          items[i].totalPrice = item.price * item.count;
        }
      });
      dispatch({ type: "SET_CARTS", value: data });
    }
  }

  return (
    <>
      <ProductCarousels />
      <section className="d-flex justify-content-between align-items-center bg-primary pb-3 mt-4">
        {token && user && <ProductProfile />}
        <ProductWelcoming />
        <ProductAboutUs />
      </section>

      <Row className="mt-4">
        {data.map((product, index) => (
          <Col
            key={`product-${index}`}
            className="p-2 pt-0 mb-3"
            lg="2"
            md="4"
            sm="6"
            xs="12"
          >
            {loading ? (
              <SkeletonCard />
            ) : (
              <div className="display_card">
                <Card
                  style={{
                    border: "0.06rem solid #ACB5BD ",
                    boxShadow: "0rem 0.13rem 0.3rem 0rem #00000040",
                  }}
                >
                  <Container className="p-2 pb-0">
                    {token ? (
                      <div className="img_box">
                        <div className="img_bg" />
                        <Card.Img
                          className="img_product pb-0"
                          variant="top"
                          src={product.image?.url || defaultImage}
                          alt={`product-${product.name}`}
                          height="161"
                        />
                        <Button
                          className="w-100"
                          variant="primary"
                          onClick={() => handleCart(product)}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    ) : (
                      <div className="clickable_card">
                        <Button className="p-0 w-100" href="/marketid/login">
                          <Card.Img
                            className="img_product pb-0"
                            variant="top"
                            src={product.image?.url || defaultImage}
                            alt={`product-${product.name}`}
                            height="161"
                          />
                        </Button>
                      </div>
                    )}
                  </Container>
                  <Card.Body className="pb-0 ps-2 w-100 pe-2">
                    <Card.Subtitle className="paragraph__2">
                      {product.name}
                    </Card.Subtitle>
                    <Card.Text className="paragraph__4 my-2 text-primary text-capitalize">
                      {product.category.name}
                    </Card.Text>
                    <Card.Title className="subheading__2">
                      {"Rp. " + convertFormatCurrency(product.price)}
                    </Card.Title>

                    {token && user && (
                      <Button className="display_button mb-2" variant="primary">
                        Add To Cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        ))}
      </Row>

      <ComponentPagination
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        message={"Product Not Found :("}
        loading={loading}
      />
    </>
  );
}
