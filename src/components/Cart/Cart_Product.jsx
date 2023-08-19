import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Image } from "react-bootstrap";
import convertFormatCurrency from "../../utils/convertFormatCurrency";
import defaultImage from "../../assets/images/default-image.png";

export default function CartProduct(props) {
  const { data, index, isAction } = props;

  // STORES
  const storeCarts = useSelector((state) => state.carts);
  const dataProduct = storeCarts.carts;
  const dispatch = useDispatch();

  function handleClickMinus(data) {
    dataProduct.forEach((item) => {
      if (item._id === data._id) {
        item.qty -= 1;
        item.sub_total = item.qty * item.price;
      }
      dispatch({ type: "SET_CARTS", value: storeCarts.carts });
    });
  }

  function handleClickPlus(data) {
    dataProduct.forEach((item) => {
      if (item._id === data._id) {
        item.qty += 1;
        item.sub_total = item.qty * item.price;
      }

      dispatch({ type: "SET_CARTS", value: storeCarts.carts });
    });
  }

  function handleDelete(index) {
    dataProduct.splice(index, 1);
    dispatch({ type: "SET_CARTS", value: storeCarts.carts });
  }

  return (
    <Card
      key={`products-${data._id}`}
      className="border_color_brighter mt-3"
      style={{
        boxShadow: "0rem 0.13rem 0.3rem 0rem #00000040",
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            src={data.image?.url || defaultImage}
            alt="product-picture"
            width={120}
            height={100}
            className="display_image_history"
            rounded
          />

          <h5 className="display_invoice subheading__2 m-0 ms-3">
            {data.name || "Product Name"}
          </h5>
        </div>

        {isAction ? (
          <>
            <h5 className="display_price subheading__2 m-0">
              {"Rp. " +
                convertFormatCurrency(
                  data.sub_total === 0 ? data.price : data.sub_total
                )}
            </h5>

            <div className="d-flex justify-content-end align-items-center">
              <Button
                disabled={data.qty < 2}
                className="mx-2"
                variant={data.qty < 2 ? "secondary" : "primary"}
                onClick={() => handleClickMinus(data)}
              >
                -
              </Button>
              <span>{data.qty}</span>
              <Button
                className="mx-2"
                variant="primary"
                onClick={() => handleClickPlus(data)}
              >
                +
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => handleDelete(index)}
              >
                <i className="bi bi-trash-fill text-white"></i>
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="display_price subheading__2">{data.qty}x</span>
            <h5 className="display_price subheading__2 m-0">
              {"Rp. " +
                convertFormatCurrency(
                  data.sub_total === 0 ? data.price : data.sub_total
                )}
            </h5>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
