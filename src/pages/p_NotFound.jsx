import { Button } from "react-bootstrap";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="heading__1">404 | Not Found</h1>
      <h1 className="heading__3 mt-3">Into Market Indonesia</h1>
      <Button href="marketid" variant="primary" className="fw-semibold mt-1">
        Click Here
      </Button>
    </div>
  );
}
