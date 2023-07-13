import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <div className="loading-overlay show">
        <h1>
          Loading <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </h1>
      </div>
    </>
  );
}
