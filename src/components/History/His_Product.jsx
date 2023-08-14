import { Card, Image, Button } from "react-bootstrap";
import defaultImage from "../../assets/images/default-image.png";
import convertFormatCurrency from "../../utils/convertFormatCurrency";
import { useNavigate } from "react-router-dom";

export default function HistoryProduct(props) {
  const { item } = props;
  const navigate = useNavigate();

  function handleDetailInvoice(code_invoice) {
    navigate(`/marketid/payment/${code_invoice}`);
  }

  return (
    <Card className="border_color_brighter bg-white mt-2 mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            src={item.cart[0].image.url || defaultImage}
            alt="product-picture"
            width={130}
            height={110}
            className="display_image_history"
            rounded
          />

          <h5 className="display_invoice subheading__3 m-0 ms-3 text-truncate">
            {item.invoice || "Invoice Number"}
          </h5>
        </div>

        <h5 className="display_price subheading__3 m-0 text-truncate">
          {"Rp. " + convertFormatCurrency(item.total)}
        </h5>

        <div className="d-flex justify-content-end align-items-center">
          <Button
            variant="success"
            onClick={() => handleDetailInvoice(item.invoice)}
          >
            <i className="bi bi-eye-fill text-white"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
