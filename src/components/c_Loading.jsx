import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <div className="loading-overlay">
        <Spinner animation="grow" />
        <Spinner animation="grow mx-2" />
        <Spinner animation="grow" />
      </div>
    </>
  );
}
