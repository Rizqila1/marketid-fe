import { useState, useEffect } from "react";
import { axiosInstance as axios } from "../../config/httpsAxios";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";
import Content from "../../content/eng/pages_product.json";

export default function ProductWelcoming() {
  const [data, setData] = useState([]);

  // Get User Data from localStorage
  const getUser = localStorage.getItem("user");
  const parsingUser = JSON.parse(getUser);
  let id = getUser ? parsingUser._id : "";

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
      <h1 className="display_welcoming heading__1 text-white shadow-lg m-0 mx-3 mt-3 text-capitalize">
        {!getUser
          ? `${Content.welcoming}`
          : `${Content.welcoming}, ${data?.full_name || ""}`}
      </h1>
    </>
  );
}
