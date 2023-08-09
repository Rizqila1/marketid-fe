import { Modal, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import ModalImg from "../../assets/images/modal-checkout.png";
import handleErrorMessage from "../../utils/handleErrorMessage";

export default function CartModalComponent(props) {
  const { data } = props;

  const navigate = useNavigate();

  const storeCarts = useSelector((state) => state.carts);
  const dataProduct = storeCarts.carts.map((item) => {
    return {
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      qty: item.qty,
      sub_total: item.sub_total,
    };
  });

  function handlePayment() {
    const total = dataProduct.map((item) => item.sub_total);
    const sumTotal = total.reduce((a, b) => a + b, 0);

    let dataCheckout = {
      cart: dataProduct,
      address: {
        _id: data._id,
        name: data.name,
      },
      total: sumTotal,
    };

    axios
      .post("/checkout/create", dataCheckout)
      .then((response) => {
        const invoice = response.data.data.invoice;
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });

        props.onHide(false);

        navigate(`/marketid/payment/${invoice}`);
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      });
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title className="heading__3 text-center px-2 pt-4">
        Information
      </Modal.Title>
      <Modal.Body className="p-2 pb-4 d-flex flex-column align-items-center">
        <Image src={ModalImg} alt="payment-picture" width={270} height={150} />
        <p className="paragraph__3 m-0 text-center">
          Please make this payment via bank transfer or digital wallet by
          sending valid proof of transfer.
        </p>
      </Modal.Body>
      <div className="d-flex justify-content-around pb-4">
        <Button
          className="subheading__3"
          style={{ width: "10.188rem" }}
          variant="danger"
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="subheading__3"
          style={{ width: "10.188rem" }}
          variant="success"
          onClick={() => handlePayment()}
        >
          Pay Now
        </Button>
      </div>
    </Modal>
  );
}
