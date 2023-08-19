import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosInstance as axios } from "../../config/httpsAxios";
import ABreadcrumb from "../../components/ABreadCrumb";
import CartProduct from "../../components/Cart/Cart_Product";
import ProductNotFound from "../../components/Products/Pro_NotFound";
import handleErrorMessage from "../../utils/handleErrorMessage";
import CartCheckout from "../../components/Cart/Cart_Checkout";
import CardInvoice from "../../components/Payment/Pay_CardInvoice";

export default function PaymentPage() {
  const { invoice } = useParams();

  // STORES
  const dispatch = useDispatch();

  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/payment",
      name: "Payment",
      active: true,
    },
  ];

  const [data, setData] = useState({});
  const [carts, setCarts] = useState({});
  const [detailPrice, setDetailPrice] = useState({
    sub_total: 0,
    PPN: 0,
    total: 0,
  });
  const [idAddress, setIdAddress] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    if (isUpdate) {
      dispatch({ type: "SET_LOADING", value: true });

      axios
        .get(`/api/checkout/detail/${invoice}`)
        .then((response) => {
          setData(response.data.data);

          const carts = response.data.data.cart;
          setCarts(carts);

          // PRICE CALCULATIONS
          const dataSubTotal = carts.map((item) => item.sub_total);
          const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
          const PPN = (subTotal * 10) / 100;
          const total = subTotal + PPN;

          setDetailPrice({ sub_total: subTotal, PPN, total });
          setIdAddress(response.data.data.address._id);
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
          setIsUpdate(false);
        });
    }
  }, [isUpdate, invoice, dispatch]);

  function handleConfirmDone() {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .put(`/api/checkout/confirm/${invoice}`, { status: true })
      .then((response) => {
        setIsUpdate(true);
        toast(handleErrorMessage("Payment Success"), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
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
    <>
      <ABreadcrumb options={options} />

      <Row>
        <Col lg="12" xs="12" className="mt-3">
          <CardInvoice invoice={invoice} data={data} />
        </Col>

        <Col lg="8" xs="12">
          {carts.length <= 4 ? (
            carts?.length ? (
              carts.map((data, index) => (
                <CartProduct
                  data={data}
                  key={`item-cart${data.name}`}
                  index={index}
                />
              ))
            ) : (
              <ProductNotFound message={"Your Cart Is Empty"} />
            )
          ) : (
            <div
              style={{ height: "calc(100vh - 15rem)", overflowY: "auto" }}
              className="my-2"
            >
              {carts?.length ? (
                carts.map((data, index) => (
                  <CartProduct
                    data={data}
                    key={`item-cart${data.name}`}
                    index={index}
                  />
                ))
              ) : (
                <ProductNotFound message={"Your Cart Is Empty"} />
              )}
            </div>
          )}
        </Col>

        <Col lg="4" xs="12">
          <CartCheckout
            isCheckout={true}
            detailPrice={detailPrice}
            idAddress={idAddress}
            carts={carts}
            handleConfirmDone={handleConfirmDone}
            isStatus={data.status}
          />
        </Col>
      </Row>
    </>
  );
}
