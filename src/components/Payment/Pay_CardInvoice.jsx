import { Card } from "react-bootstrap";

export default function CardInvoice(props) {
  const { data, invoice } = props;
  return (
    <Card
      className="rounded-0 mb-2"
      style={{
        boxShadow:
          "0.3rem 0.5rem 0.5rem 0rem #0391FC40, 0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      <Card.Body>
        <h2 className="text-primary heading__3 mb-3">Market.ID</h2>
        <div className="d-flex justify-content-between">
          <p className="paragraph__3 text-capitalize">
            Customer Name: {data.user?.full_name || "-"}
          </p>
          <p className="subheading__4">{invoice}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="paragraph__3">
            Customer Email: {data.user?.email || "-"}
          </p>

          {data.status ? (
            <p className="subheading__4 text-success">Status Payment Success</p>
          ) : (
            <p className="subheading__4 text-warning">Status Waiting Payment</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
