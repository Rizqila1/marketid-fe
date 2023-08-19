import { useEffect, useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";
import ComponentPagination from "../../components/Pagination";
import ABreadcrumb from "../../components/ABreadCrumb";
import AListGroup from "../../components/AListGroup";
import HistoryProduct from "../../components/History/His_Product";
import "../../assets/css/history-page.css";
import convertFormatCurrency from "../../utils/convertFormatCurrency";

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

  // STORES
  const storeParams = useSelector((state) => state.params);

  const { user } = useSelector((state) => state.auth);
  const id = user._id;
  const dispatch = useDispatch();

  // STATES
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [totalExpense, setTotalExpense] = useState(0);

  // FETCHING DATA
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (isLoad) {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/checkout/history/${id}`, {
          params: { ...storeParams },
        })
        .then((response) => {
          setData(response.data.data.data);
          setPagination(response.data.pagination);
          setTotalExpense(response.data.data.total_expense);
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
          setIsLoad(false);
        });
    }
  }, [id, storeParams, isLoad]);

  function handleOnChange(event) {
    dispatch({ type: "ACTION_SORT_BY", value: event.target.value });
    setIsLoad(true);
  }

  function handleOnChangeSearch(event) {
    dispatch({ type: "ACTION_SEARCH", value: event.target.value });
    if (event.target.value.length === 0) setIsLoad(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // SET DEFAULT PAGE SO THAT WHEN DOING FILTER ITS AUTOMATICALLY BACK/SET TO PAGE 1
    dispatch({ type: "ACTION_PAGE", value: 1 });
    setIsLoad(true);
  }

  return (
    <>
      <ABreadcrumb options={options} />

      <Row className="mt-4">
        <Col lg="3" xs={12} className="mb-md-4 mb-sm-2 mb-xs-5">
          <AListGroup menus={menus} />
        </Col>
        <Col lg="9" xs={12}>
          <section>
            <Form
              className="w_container_search_history my-md-0 mt-3"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Form.Select
                  className="w_select_search_history"
                  name="sort_by"
                  value={storeParams.sort_by}
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
                  value={storeParams.q}
                  onChange={handleOnChangeSearch}
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
              className={!data.length ? "my-3 d-none" : "my-3"}
              style={{ height: "calc(100vh - 16rem)", overflowY: "auto" }}
            >
              {data.map((item, index) => (
                <HistoryProduct item={item} key={item._id} index={index} />
              ))}
            </div>
          )}

          <Row className="d-flex align-items-center">
            {!loading && data.length !== 0 && (
              <Col xs="6">
                <div className="display_total_expense subheading__2 d-flex align-items-center">
                  <h5 className="text-primary d-flex">Expense Total: &nbsp;</h5>
                  <h5>
                    {"Rp. " +
                      convertFormatCurrency(totalExpense ? totalExpense : null)}
                  </h5>
                </div>
              </Col>
            )}
            <Col
              xs={!loading && !data.length ? "12" : "6" && loading ? "12" : "6"}
            >
              <ComponentPagination
                data={data}
                pagination={pagination}
                setPagination={setPagination}
                message={"There's Nothing In Here :("}
                loading={loading}
                handleLoad={() => setIsLoad(true)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
