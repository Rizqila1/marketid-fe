import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance as axios } from "../../config/httpsAxios";
import handleErrorMessage from "../../utils/handleErrorMessage";

import defaultImage from "../../assets/images/default-img-profile.png";
import "../../assets/css/product-page.css";

export default function ProductProfile() {
  const [data, setData] = useState([]);

  // STORES
  const { user } = useSelector((state) => state.auth);
  // Get User Data from store
  const id = user._id;

  useEffect(() => {
    axios
      .get(`/api/users/details/${id}`)
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
          className="d-flex text-capitalize text-decoration-none"
        >
          <button className="button_hover6 subheading__3 card__title">
            <span></span>
            <span></span>
            <span></span>
            <span></span> Profile
          </button>
        </Link>
      </div>
    </>
  );
}
