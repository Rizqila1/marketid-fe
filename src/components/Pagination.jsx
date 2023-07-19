import { useDispatch, useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Row, Form } from "react-bootstrap";
import ProductNotFound from "./Products/Pro_NotFound";

export default function ComponentPagination(props) {
  const storeParamsProduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch({ type: "ACTION_PER_PAGE", value: event.target.value });
  }

  function handlePagination(page) {
    dispatch({ type: "ACTION_PAGE", value: page });
    props.setPagination({ ...props.pagination, page: page });
  }
  return (
    <>
      {props.data.length ? (
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
                page={props.pagination.page}
                total={props.pagination.total}
                limit={props.pagination.per_page}
                last={true}
                ellipsis={2}
                between={4}
                changePage={handlePagination}
              ></PaginationControl>
            </div>
          </div>
        </Row>
      ) : (
        <ProductNotFound message={props.message} />
      )}
    </>
  );
}
