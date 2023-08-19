import { Card, Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { axiosInstance as axios } from "../../config/httpsAxios";
import CartModalComponent from "./Cart_Modal";
import Loading3 from "../Loading3";

import handleErrorMessage from "../../utils/handleErrorMessage";
import convertFormatCurrency from "../../utils/convertFormatCurrency";
import convertUppercaseEachWord from "../../utils/convertUppercaseEachWord";

export default function CartCheckout(props) {
  const {
    isCheckout,
    detailPrice = { sub_total: 0, PPN: 0, total: 0 },
    idAddress,
    carts,
    handleConfirmDone,
    isStatus = true,
  } = props;

  // STORES
  const storeCarts = useSelector((state) => state.carts);
  const dataProduct = storeCarts.carts;
  const dispatch = useDispatch();

  // STATES
  const [data, setData] = useState([]);
  const [addressName, setAddressName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [fullAddress, setFullAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Product Price Calculation
  const priceProduct = dataProduct.map((item) => item.sub_total);
  const subTotal = priceProduct.reduce((a, b) => a + b, 0);
  const PPN = (subTotal * 10) / 100;
  const totalPrice = subTotal + PPN;

  // FETCHING API LIST ADDRESS
  useEffect(() => {
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/address/list`)
      .then((response) => {
        setData(response.data.data);
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
  }, [dispatch]);

  // FETCHING DETAIL ADDRESS DATA
  useEffect(() => {
    if (idAddress?.length > 0) {
      setLoading(true);

      axios
        .get(`${process.env.REACT_APP_BASE_URL}/address/detail/${idAddress}`)
        .then((response) => {
          const { province, district, regency, village, passcode, address } =
            response.data.data;
          setFullAddress(
            `${province.name}, ${district.name}, ${regency.name}, ${village.name}, ${passcode}, ${address}`
          );
        })
        .catch((error) => {
          const message = error.response?.data?.message;

          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [idAddress, dispatch]);

  function handleFullAddress() {
    if (!fullAddress.length) {
      return "-";
    } else {
      return fullAddress;
    }
  }

  // FORM SELECT ADDRESS
  function selectAddressById(id) {
    let result = { _id: "", name: "", address: "" };
    let findById = data.find((item) => item._id === id);

    if (findById) {
      result = {
        _id: findById._id,
        name: findById.name,
        address: `
        ${findById.province.name}, 
        ${findById.district.name}, 
        ${findById.regency.name},
        ${findById.village.name}, 
        ${findById.passcode}, 
        ${findById.address}`,
      };
    }
    return result;
  }

  return (
    <Card
      className="border_color_brighter bg-white mt-3"
      style={{
        boxShadow: "0rem 0.3rem 0.3rem 0rem #00000040",
      }}
    >
      {isCheckout ? (
        <Container className="pt-3">
          <h5 className="subheading__4">
            {loading ? (
              <Loading3 />
            ) : (
              convertUppercaseEachWord(handleFullAddress())
            )}
          </h5>

          <section className="d-flex justify-content-between">
            <div>
              <h5 className="subheading__4">Sub Total</h5>
              <h5 className="subheading__4">{"PPN (10%)"}</h5>
              <h5 className="subheading__4">Total</h5>
            </div>

            <div>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(detailPrice.sub_total)}
              </h5>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(detailPrice.PPN)}
              </h5>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(detailPrice.total)}
              </h5>
            </div>
          </section>

          {!isStatus && (
            <Button
              className="button_hover4 w-100 d-flex justify-content-center mt-2 mb-3"
              variant="success"
              disabled={carts.length === 0}
              onClick={handleConfirmDone} // DevNote: if onclick function send from props, it doesn't require () =>
            >
              Confirm Done
            </Button>
          )}
        </Container>
      ) : (
        <Container>
          <Form className="py-2">
            <Form.Group className="mb-3">
              <Form.Label className="subheading__4">Address</Form.Label>
              <Form.Select
                className="border_color text-capitalize"
                value={addressName}
                onChange={(e) => {
                  setAddressName(e.target.value);
                }}
              >
                <option value={""}>Select Your Address</option>
                {data.map((element, i) => (
                  <option
                    key={i}
                    className="text-capitalize"
                    value={element._id}
                  >
                    {`${element.name}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>

          {addressName ? (
            <h5 className="subheading__4">
              {convertUppercaseEachWord(selectAddressById(addressName).address)}
            </h5>
          ) : (
            <h5 className="subheading__4">-</h5>
          )}

          <section className="d-flex justify-content-between">
            <div>
              <h5 className="subheading__4">Sub Total</h5>
              <h5 className="subheading__4">{"PPN (10%)"}</h5>
              <h5 className="subheading__4">Total</h5>
            </div>

            <div>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(subTotal)}
              </h5>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(PPN)}
              </h5>
              <h5 className="subheading__4">
                {"Rp. " + convertFormatCurrency(totalPrice)}
              </h5>
            </div>
          </section>
          <Button
            variant="primary"
            className="button_hover3 w-100 d-flex justify-content-center mt-2 mb-3"
            disabled={addressName === "" || dataProduct.length === 0}
            onClick={() => setModalShow(true)}
          >
            Checkout
          </Button>
          <CartModalComponent
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectAddressById(addressName)}
          />
        </Container>
      )}
    </Card>
  );
}
