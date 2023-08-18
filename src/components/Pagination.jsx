import { useDispatch, useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Row, Form } from "react-bootstrap";

import ProductNotFound from "./Products/Pro_NotFound";
import Loading2 from "./Loading2";

export default function ComponentPagination(props) {
  const {
    setPagination,
    pagination,
    loading,
    data,
    message,
    handleLoad = () => {},
  } = props;
  const storeParams = useSelector((state) => state.params);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch({ type: "ACTION_PER_PAGE", value: event.target.value });
    handleLoad();

    // SET DEFAULT PAGE SO THAT WHEN DOING FILTER ITS AUTOMATICALLY BACK/SET TO PAGE 1
    dispatch({ type: "ACTION_PAGE", value: 1 });
  }

  function handlePagination(page) {
    dispatch({ type: "ACTION_PAGE", value: page });
    setPagination({ ...pagination, page: page });
    handleLoad();
  }

  const customizeLoader = () => {
    if (loading === true) return <Loading2 />;
    if (!data?.length) return <ProductNotFound message={message} />;
  };

  return (
    <>
      {customizeLoader()}

      <Row>
        <div className="d-flex justify-content-end align-items-center">
          <p className="paragraph__3 mb-3">Per Page</p>
          <div className="mb-3 mx-3">
            <Form.Select
              value={storeParams.per_page}
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
              page={props.pagination?.page}
              total={props.pagination?.total}
              limit={props.pagination?.per_page}
              last={true}
              ellipsis={1}
              between={4}
              changePage={handlePagination}
            ></PaginationControl>
          </div>
        </div>
      </Row>
    </>
  );
}
