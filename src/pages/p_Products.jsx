import { Col, Row, Card, Button, Container, Form } from "react-bootstrap";
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
import { PaginationControl } from "react-bootstrap-pagination-control";
import ProductNotFound from "../components/Products/Pro_NotFound";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  // STORE
  const { token, user } = useSelector((state) => state.auth);
  const storeParamsProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch({ type: "ACTION_PER_PAGE", value: event.target.value });
  }

  function handlePagination(page) {
    dispatch({ type: "ACTION_PAGE", value: page });
    setPagination({ ...pagination, page: page });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/products", { params: { ...storeParamsProduct } })
      .then((response) => {
        setLoading(false);
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
      .finally(() => {});
  }, [storeParamsProduct]);

  return (
    <>
      <Row>
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
                    border: "1px solid #ACB5BD ",
                    boxShadow: "0px 2px 4px 0px #00000040",
                  }}
                >
                  <Container className="p-2 pb-0">
                    {token ? (
                      <div className="img_box">
                        <div className="img_bg" />
                        <Card.Img
                          className="img_product pb-0"
                          variant="top"
                          src={product.image.url || defaultImage}
                          alt={`product-${product.name}`}
                          height="161"
                        />
                        <Button className="w-100" variant="primary">
                          Add To Cart
                        </Button>
                      </div>
                    ) : (
                      <div className="clickable_card">
                        <Button className="p-0 w-100" href="/marketid/login">
                          <Card.Img
                            className="img_product pb-0"
                            variant="top"
                            src={product.image.url || defaultImage}
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

      {data.length ? (
        <Row>
          <div className="d-flex justify-content-end align-items-center">
            <p className="paragraph__3 mb-3">Per Page</p>
            <div className="mb-3 mx-3">
              <Form.Select
                value={storeParamsProduct.per_page}
                onChange={handleChange}
                style={{ width: "5rem" }}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </Form.Select>
            </div>
            <div>
              <PaginationControl
                page={pagination.page}
                total={pagination.total}
                limit={pagination.per_page}
                ellipsis={2}
                between={4}
                changePage={handlePagination}
              ></PaginationControl>
            </div>
          </div>
        </Row>
      ) : (
        <ProductNotFound />
      )}
    </>
  );
}
