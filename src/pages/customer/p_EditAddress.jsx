import { Row, Col } from "react-bootstrap";
import ABreadcrumb from "../../components/ABreadCrumb";
import AListGroup from "../../components/AListGroup";
import FormAddress from "../../components/Address/FormAddress";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";
import { toast } from "react-toastify";

export default function EditAddressPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Breadcrumb's
  const options = [
    {
      href: "/marketid",
      name: "Home",
      active: false,
    },
    {
      href: "/marketid/address",
      name: "Address",
      active: false,
    },
    {
      href: "/marketid/address/edit",
      name: "Edit",
      active: true,
    },
  ];

  // Selector ListGroup Component
  const menus = [
    {
      title: "Profile",
      link: "/marketid/profile",
    },
    {
      title: "Address",
      link: `/marketid/address/edit/${id}`,
    },
    {
      title: "History",
      link: "/marketid/history",
    },
  ];

  const [detail, setDetail] = useState({});
  useEffect(() => {
    if (id) {
      dispatch({ type: "SET_LOADING", value: true });

      axios
        .get(`/api/address/detail/${id}`)
        .then((response) => {
          setDetail(response.data.data);
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
  }, [id, dispatch]);

  return (
    <Row className="mt-4">
      <ABreadcrumb options={options} />

      <Col lg={3} xs={12} className="mb-lg-0 mb-4">
        <AListGroup menus={menus} />
      </Col>
      <Col xs={9}>
        <FormAddress isEdit={true} detail={detail} />
      </Col>
    </Row>
  );
}
