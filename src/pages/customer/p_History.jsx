import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";
import defaultImage from "../../assets/images/default-image.png";
import "../../assets/css/history-page.css";
import ComponentPagination from "../../components/Pagination";

export default function HistoryPage() {
  const { user } = useSelector((state) => state.auth);
  const { q, sort_by } = useSelector((state) => state.product);
  const storeParamsProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    q,
    sort_by,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setLoading(true);
    axios
      .get("/checkout/history", { params: { ...storeParamsProduct } })
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

  function handleLogout() {
    const id = user._id;
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`/users/logout/${id}`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // return to login page
        window.location.href = "/marketid/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  function handleOnChange(event) {
    setParams({ ...params, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // SET VALUE PARAMS Q & SORT_BY TO STORE PRODUCT
    dispatch({ type: "ACTION_SEARCH", value: params.q });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
    // SET DEFAULT PAGE SO THAT WHEN DOING FILTER ITS AUTOMATICALLY BACK/SET TO PAGE 1
    dispatch({ type: "ACTION_PAGE", value: 1 });
  }

  return (
    <>
      <Breadcrumb className="mt-5">
        <Breadcrumb.Item href="/marketid/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>History</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-4">
        <Col xs={3}>
          <ListGroup>
            <ListGroup.Item action href="/marketid/profile">
              Profile
            </ListGroup.Item>
            <ListGroup.Item action href="/marketid/address">
              Address
            </ListGroup.Item>
            <ListGroup.Item active>History</ListGroup.Item>

            <ListGroup.Item action onClick={handleLogout}>
              Logout
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={9}>
          <section>
            <Form
              className="w_container_search_history my-md-0 mt-3"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Form.Select
                  className="w_select_search_history"
                  name="sort_by"
                  value={params.sort_by}
                  onChange={handleOnChange}
                >
                  <option value="desc">Latest</option>
                  <option value="asc">Oldest</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  placeholder="Search by Invoice..."
                  className="w_input_search_history"
                  name="q"
                  value={params.q}
                  onChange={handleOnChange}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="d-flex align-items-center"
                >
                  <i className="bi- bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </section>

          <section className="border_color_brighter bg-white p-3 mt-3">
            <Row className="d-flex align-items-center">
              <Col lg="2" md="3" sm="3" xs="3">
                <Image
                  src={defaultImage}
                  alt="product-picture"
                  width={100}
                  height={90}
                  className="display_image_history"
                />
              </Col>
              <Col
                lg="10"
                md="9"
                sm="9"
                xs="9"
                className="d-flex justify-content-between ps-0 align-items-center"
              >
                <h5 className="display_invoice subheading__2 m-0">
                  Invoice #595959595958484
                </h5>
                <h5 className="display_price subheading__2 m-0">Rp. 100.000</h5>
                <Button variant="success">
                  <i className="bi bi-eye-fill text-white"></i>
                </Button>
              </Col>
            </Row>
          </section>
          <ComponentPagination
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            message={"There's Nothing In Here :("}
            loading={loading}
          />
        </Col>
      </Row>
    </>
  );
}
