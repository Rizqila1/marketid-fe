import { Button, Card, Row, Col, InputGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "../../config/httpsAxios";
import TableAddress from "./TableAddress";
import ComponentPagination from "../Pagination";
import handleErrorMessage from "../../utils/handleErrorMessage";

export default function CardAddressSection() {
  // STORES
  const { q, sort_by } = useSelector((state) => state.product);
  const storeParamsProduct = useSelector((state) => state.product);

  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    q,
    sort_by,
  });
  const [isLoad, setIsLoad] = useState(true);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get("/api/address/list", { params: { ...storeParamsProduct } })
      .then((response) => {
        setData(response.data.data);
        setPagination(response.data.pagination);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
        setIsLoad(false);
        setLoading(false);
      });
  }, [dispatch, storeParamsProduct, isLoad]);

  function handleOnChange(event) {
    const key = event.target.name;
    setParams({ params: params.sort_by, [key]: event.target.value });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
  }

  function handleOnChangeSearch(event) {
    const key = event.target.name;
    setParams({ params: params.q, [key]: event.target.value });
    if (event.target.value.length === 0) setIsLoad(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // SET VALUE PARAMS Q & SORT_BY TO STORE PRODUCT
    dispatch({ type: "ACTION_SEARCH", value: params.q });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
    // SET DEFAULT PAGE SO THAT WHEN DOING FILTER ITS AUTOMATICALLY BACK/SET TO PAGE 1
    dispatch({ type: "ACTION_PAGE", value: 1 });
  }

  // EDIT & DELETE
  const navigate = useNavigate();
  function handleEdit(id) {
    navigate(`/marketid/address/edit/${id}`);
  }

  function handleDelete(id) {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .delete(`/api/address/delete/${id}`)
      .then((response) => {
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        setIsLoad(true);
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

  return (
    <Card
      className="p-2"
      style={{
        boxShadow: "0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      <Card.Body>
        <Row>
          <Col lg="10" md="12" sm="12">
            <Form
              className="w_container_search_history mb-2"
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
                  placeholder="Search address name"
                  className="w_input_search_history"
                  name="q"
                  value={params.q}
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
          </Col>

          <Col lg="2" md="12" sm="12">
            <Button
              href="/marketid/address/create"
              variant="success"
              className="button_hover7 create_button w-100"
            >
              Create <i className="bi bi-pencil-fill mx-1"></i>
            </Button>
          </Col>

          <Col xs="12">
            <TableAddress
              data={data}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Col>

          <Col xs="12" className="mt-2">
            <ComponentPagination
              data={data}
              pagination={pagination}
              setPagination={setPagination}
              message={"Empty Address"}
              loading={loading}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
