import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";

import defaultImage from "../../assets/images/default-img-profile.png";
import "../../assets/css/product-page.css";
import { Link } from "react-router-dom";

export default function ProductProfile() {
  const [data, setData] = useState([]);

  // Get User Data from localStorage
  const getUser = localStorage.getItem("user");
  const parsingUser = JSON.parse(getUser);
  const id = parsingUser._id;

  useEffect(() => {
    axios
      .get(`/users/details/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      });
  }, [id]);

  return (
    <>
      <div
        className="card_account mt-3 ms-3"
        style={{
          border: "0.06rem solid #ACB5BD ",
          boxShadow: "0rem 0.3rem 0.3rem 0rem #00000070",
        }}
      >
        <div className="card__img"></div>
        <div className="card__avatar">
          <img src={data?.image?.url || defaultImage} alt="profile" />
        </div>
        <Link
          to="/marketid/profile"
          className="d-flex card__title subheading__3 text-capitalize text-decoration-none"
        >
          <div className="text-end px-3">Profile</div>
        </Link>
      </div>
    </>
  );
}
