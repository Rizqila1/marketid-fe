import { useEffect, useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";
import "../../assets/css/history-page.css";
import ComponentPagination from "../../components/Pagination";
import ABreadcrumb from "../../components/ABreadCrumb";
import AListGroup from "../../components/AListGroup";
import HistoryProduct from "../../components/History/His_Product";

export default function HistoryPage() {
  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/history",
      name: "History",
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

  // Get User Data from localStorage
  const getUser = localStorage.getItem("user");
  const parsingUser = JSON.parse(getUser);
  let id = getUser ? parsingUser._id : "";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    setLoading(true);
    axios
      .get(`/checkout/history/${id}`, { params: { ...storeParamsProduct } })
      .then((response) => {
        setData(response.data.data.data);
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
  }, [storeParamsProduct, id]);

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
      <ABreadcrumb options={options} />

      <Row className="mt-4">
        <Col xs={3}>
          <AListGroup menus={menus} />
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

          {!loading && (
            <div
              className="my-2"
              style={{ height: "29.5rem", overflowY: "auto" }}
            >
              {data.map((item, index) => (
                <HistoryProduct item={item} key={item._id} index={index} />
              ))}
            </div>
          )}

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
